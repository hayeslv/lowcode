import deepcopy from "deepcopy";
import { useCommander } from "~/plugins";
import type { VisualEditorBlockData, VisualEditorModelValue } from "~/types";

export function useVisualCommand(
  {
    focusData,
    updateBlocks,
    dataModel,
    dragstart,
    dragend,
  }: {
    focusData: { value: { focus: VisualEditorBlockData[]; unFocus: VisualEditorBlockData[] } };
    updateBlocks: (blocks?: VisualEditorBlockData[]) => void;
    dataModel: { value: VisualEditorModelValue };
    dragstart: { on: (cb: () => void) => void; off: (cb: () => void) => void };
    dragend: { on: (cb: () => void) => void; off: (cb: () => void) => void };
  },
) {
  const commander = useCommander();

  /*
   * 删除命令
   */
  commander.registry({
    name: "delete",
    keyboard: ["backspace", "delete", "ctrl+d"],
    execute: () => {
      // console.log("执行删除命令");
      const data = {
        before: dataModel.value.blocks,
        after: focusData.value.unFocus,
      };
      return {
        redo: () => {
          // console.log("重做删除命令");
          updateBlocks(deepcopy(data.after));
        },
        undo: () => {
          // console.log("撤回删除命令");
          updateBlocks(deepcopy(data.before));
        },
      };
    },
  });

  /*
   * 拖拽命令，适用于三种情况：
   * - 从菜单拖拽组件到容器画布
   * - 在容器中拖拽组件调整位置
   * - 拖拽调整组件的宽度和高度
   */
  commander.registry({
    name: "drag",
    init() {
      this.data = {
        before: null as null | VisualEditorBlockData[],
        after: null as null | VisualEditorBlockData[],
      };
      const handler = {
        dragstart: () => this.data.before = deepcopy(dataModel.value.blocks),
        dragend: () => commander.state.commands.drag(),
      };
      dragstart.on(handler.dragstart);
      dragend.on(handler.dragend);

      return () => {
        dragstart.off(handler.dragstart);
        dragstart.off(handler.dragend);
      };
    },
    execute() {
      const before = this.data.before;
      const after = deepcopy(dataModel.value.blocks);
      return {
        redo: () => {
          updateBlocks(deepcopy(after));
        },
        undo: () => {
          updateBlocks(deepcopy(before));
        },
      };
    },
  });

  /*
   * 清空命令
   */
  commander.registry({
    name: "clear",
    execute: () => {
      const data = {
        before: deepcopy(dataModel.value.blocks),
        after: deepcopy([]),
      };
      return {
        redo: () => {
          updateBlocks(deepcopy(data.after));
        },
        undo: () => {
          updateBlocks(deepcopy(data.before));
        },
      };
    },
  });

  /*
   * 置顶命令
   */
  commander.registry({
    name: "placeTop",
    keyboard: "ctrl+up",
    execute: () => {
      const data = {
        // 从现有的数据中复制一份出来
        before: deepcopy(dataModel.value.blocks),
        after: deepcopy((() => {
          const { focus, unFocus } = focusData.value;
          // 获取未选中元素中，最大的 z-index
          const maxZIndex = unFocus.reduce(
            (prev, block) => Math.max(prev, block.zIndex), -Infinity,
          ) + 1;
          focus.forEach(block => block.zIndex = maxZIndex);
          return deepcopy(dataModel.value.blocks);
        })()),
      };
      return {
        redo: () => {
          updateBlocks(deepcopy(data.after));
        },
        undo: () => {
          updateBlocks(deepcopy(data.before));
        },
      };
    },
  });

  /*
   * 置底命令
   */
  commander.registry({
    name: "placeBottom",
    keyboard: "ctrl+down",
    execute: () => {
      const data = {
        // 从现有的数据中复制一份出来
        before: deepcopy(dataModel.value.blocks),
        after: deepcopy((() => {
          const { focus, unFocus } = focusData.value;
          // 获取未选中元素中，最大的 z-index
          let minZIndex = unFocus.reduce(
            (prev, block) => Math.min(prev, block.zIndex), Infinity,
          ) - 1;
          if (minZIndex < 0) {
            const dur = Math.abs(minZIndex);
            unFocus.forEach(block => block.zIndex += dur);
            minZIndex = 0;
          }
          focus.forEach(block => block.zIndex = minZIndex);
          return deepcopy(dataModel.value.blocks);
        })()),
      };
      return {
        redo: () => {
          updateBlocks(deepcopy(data.after));
        },
        undo: () => {
          updateBlocks(deepcopy(data.before));
        },
      };
    },
  });

  commander.registry({
    name: "updateBlock",
    execute: (newBlock: VisualEditorBlockData, oldBlock: VisualEditorBlockData) => {
      let blocks = deepcopy(dataModel.value.blocks || []);
      const data = {
        before: blocks,
        after: (() => {
          blocks = [...blocks];
          const index = dataModel.value.blocks!.indexOf(oldBlock);
          if (index > -1) {
            blocks.splice(index, 1, newBlock);
          }
          return deepcopy(blocks);
        })(),
      };
      return {
        redo: () => {
          updateBlocks(deepcopy(data.after));
        },
        undo: () => {
          updateBlocks(deepcopy(data.before));
        },
      };
    },
  });

  commander.init();

  return {
    undo: () => commander.state.commands.undo(),
    redo: () => commander.state.commands.redo(),
    delete: () => commander.state.commands.delete(),
    clear: () => commander.state.commands.clear(),
    placeTop: () => commander.state.commands.placeTop(),
    placeBottom: () => commander.state.commands.placeBottom(),
    updateBlock: (newBlock: VisualEditorBlockData, oldBlock: VisualEditorBlockData) => commander.state.commands.updateBlock(newBlock, oldBlock),
  };
}
