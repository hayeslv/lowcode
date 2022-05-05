import "./index.scss";
import type { PropType } from "vue";
import { ref, computed, defineComponent } from "vue";
import type { VisualEditorBlockData, VisualEditorComponent, VisualEditorModelValue } from "~/types/visual-editor";
import { useModel } from "./hooks/useModel";
import { VisualEditorBlock } from "../visual-editor-block";
import type { VisualEditorConfig } from "~/utils";
import { createNewBlock } from "~/utils";

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<VisualEditorModelValue>,
      required: true,
    },
    config: {
      type: Object as PropType<VisualEditorConfig>,
      required: true,
    },
  },
  emits: {
    "update:modelValue": (val?: VisualEditorModelValue) => true,
  },
  setup(props, { emit }) {
    const dataModel = useModel(() => props.modelValue, val => emit("update:modelValue", val));
    const containerRef = ref({} as HTMLDivElement);

    const containerStyles = computed(() => ({
      width: `${dataModel.value.container.width}px`,
      height: `${dataModel.value.container.height}px`,
    }));

    const methods = {
      clearFocus: (block?: VisualEditorBlockData) => {
        let blocks = dataModel.value.blocks || [];
        if (blocks.length === 0) return;
        if (block) {
          blocks = blocks.filter(item => item !== block);
        }

        blocks.forEach(block => block.focus = false);
      },
    };

    const menuDragger = (() => {
      let component = null as null | VisualEditorComponent;

      const blockHandler = {
        // 处理拖拽菜单组件开始动作
        dragstart: (e: DragEvent, current: VisualEditorComponent) => {
          containerRef.value.addEventListener("dragenter", containerHandler.dragenter);
          containerRef.value.addEventListener("dragover", containerHandler.dragover);
          containerRef.value.addEventListener("dragleave", containerHandler.dragleave);
          containerRef.value.addEventListener("drop", containerHandler.drop);

          component = current;
        },
        // 处理拖拽菜单组件结束动作
        dragend: () => {
          // 拖拽菜单组件，进入容器的时候，设置鼠标的可放置状态
          containerRef.value.removeEventListener("dragenter", containerHandler.dragenter);
          // 拖拽菜单组件，鼠标在容器中移动的时候，禁用默认事件
          containerRef.value.removeEventListener("dragover", containerHandler.dragover);
          // 如果拖拽过程中，鼠标离开了容器，设置鼠标为不可放置的状态
          containerRef.value.removeEventListener("dragleave", containerHandler.dragleave);
          // 在容器中放置的时候，通过事件对象的 offsetX 和 offsetY 添加一条组件数据
          containerRef.value.removeEventListener("drop", containerHandler.drop);
          component = null;
        },
      };
      const containerHandler = {
        // 鼠标进入container的时候
        dragenter: (e: DragEvent) => e.dataTransfer!.dropEffect = "move",
        // 拖拽的过程中离开了，就不允许放置
        dragleave: (e: DragEvent) => e.dataTransfer!.dropEffect = "none",
        dragover: (e: DragEvent) => e.preventDefault(),
        drop: (e: DragEvent) => {
          const blocks = dataModel.value.blocks || [];
          blocks.push(
            createNewBlock({ component: component!, top: e.offsetY, left: e.offsetX }),
          );
          dataModel.value = { ...dataModel.value, blocks };
        },
      };
      return blockHandler;
    })();

    const focusHandler = (() => {
      return {
        container: {
          onMousedown: (e: MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();
            methods.clearFocus();
          },
        },
        block: {
          onMousedown: (e: MouseEvent, block: VisualEditorBlockData) => {
            e.stopPropagation();
            e.preventDefault();
            if (e.shiftKey) {
              block.focus = !block.focus;
            } else {
              block.focus = !block.focus;
              methods.clearFocus(block);
            }
          },
        },
      };
    })();

    return () => <div class="visual-editor">
      <div class="visual-editor-menu">
        {props.config.componentList.map(component => (
          <div class="visual-editor-menu-item"
            draggable
            onDragstart={(e) => menuDragger.dragstart(e, component)}
            onDragend={menuDragger.dragend}
          >
            <span class="visual-editor-menu-item-label">{component.label}</span>
            {component.preview()}
          </div>
        ))}
      </div>
      <div class="visual-editor-head">
      visual-editor-head
      </div>
      <div class="visual-editor-operator">
      visual-editor-operator
      </div>
      <div class="visual-editor-body">
        <div class="visual-editor-content">
          <div class="visual-editor-container"
            style={containerStyles.value}
            ref={containerRef}
            {...focusHandler.container}
          >
            {!!dataModel.value && !!dataModel.value.blocks && (
              dataModel.value.blocks.map((block, index) => (
                <VisualEditorBlock
                  config={props.config}
                  block={block}
                  key={index}
                  {...{
                    onMousedown: (e: MouseEvent) => focusHandler.block.onMousedown(e, block),
                  }}
                />
              ))
            )}
          </div>

        </div>
      </div>
    </div>;
  },
});
