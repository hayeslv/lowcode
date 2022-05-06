import { onUnmounted, reactive } from "vue";

export interface CommandExecutor {
  undo?: () => void;
  redo: () => void;
}

export interface Command {
  name: string;                                     // 命令唯一标识
  keyboard?: string | string[];                     // 命令监听的快捷键
  execute: (...args: any[]) => CommandExecutor;     // 命令被执行的时候，所做的内容
  followQueue?: boolean;                            // 命令执行完之后，是否需要将命令执行得到的 undo、redo 存入命令队列
  init?: () => (() => void) | undefined;            // 命令初始化函数
  data?: any;                                       // 命令缓存所需要的数据
}

export function useCommander() {
  const state = reactive({
    current: -1,                                                  // 队列中当前的命令
    queue: [] as CommandExecutor[],                               // 命令队列
    commandArray: [] as Command[],                                // 命令队列数组
    commands: {} as Record<string, (...args: any[]) => void>,     // 命令对象，方便通过命令的名称调用命令的execute函数，并且执行额外的命令队列的逻辑
    destoryList: [] as ((() => void) | undefined)[],              // 组件销毁的时候，需要调用的销毁逻辑数组
  });
  //* 注册命令 */
  const registry = (command: Command) => {
    state.commandArray.push(command);
    state.commands[command.name] = (...args) => {
      const { undo, redo } = command.execute(...args);
      redo();
      // 如果命令执行之后，不需要进入命令队列，则直接结束
      if (command.followQueue === false) {
        return;
      }
      // 否则，将命令队列中剩余的命令去除，保留current及其之前的命令
      let { queue, current } = state;
      if (queue.length > 0) {
        queue = queue.slice(0, current + 1);
        state.queue = queue;
      }
      queue.push({ undo, redo });
      state.current = current + 1;
    };
  };
  //* 键盘事件 */
  const keyboardEvent = (() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (document.activeElement !== document.body) return;

      const { key, shiftKey, altKey, ctrlKey, metaKey } = e;

      const keyString: string[] = [];

      if (ctrlKey || metaKey) keyString.push("ctrl");
      if (shiftKey) keyString.push("shift");
      if (altKey) keyString.push("alt");
      keyString.push(key);

      const keyNames = keyString.join("+");
      // 遍历已注册的指令，如果当前按键组合和已注册的指令匹配上了，则触发指令
      state.commandArray.forEach(command => {
        const { keyboard, name } = command;
        if (!keyboard) return;
        const keys = Array.isArray(keyboard) ? keyboard : [keyboard];
        if (keys.indexOf(keyNames) > -1) {
          // 触发指令
          state.commands[name]();
          // 阻止默认事件
          e.preventDefault();
          e.stopPropagation();
        }
      });
    };

    const init = () => {
      window.addEventListener("keydown", onKeydown);
      return () => window.removeEventListener("keydown", onKeydown);
    };

    return init;
  })();

  const init = () => {
    const onKeydown = (e: KeyboardEvent) => {
      // console.log("监听到键盘事件");
    };
    window.addEventListener("keydown", onKeydown);
    state.commandArray.forEach(command => !!command.init && state.destoryList.push(command.init()));
    state.destoryList.push(keyboardEvent());
    state.destoryList.push(() => window.removeEventListener("keydown", onKeydown));
  };

  //* 注册撤回命令 */
  registry({
    name: "undo",
    keyboard: "ctrl+z",
    followQueue: false,
    execute: () => {
      // 命令被执行的时候，要做的事情
      return {
        redo: () => {
          // 重新做一遍要做的事情
          if (state.current === -1) return;
          const queueItem = state.queue[state.current];
          if (queueItem) {
            !!queueItem.undo && queueItem.undo();
            state.current--;
          }
        },
      };
    },
  });
  //* 注册重做命令 */
  registry({
    name: "redo",
    keyboard: ["ctrl+y", "ctrl+shift+z"],
    followQueue: false,
    execute: () => {
      return {
        redo: () => {
          const queueItem = state.queue[state.current + 1];
          if (queueItem) {
            !!queueItem.redo && queueItem.redo();
            state.current++;
          }
        },
      };
    },
  });

  onUnmounted(() => state.destoryList.forEach(fn => !!fn && fn()));

  return {
    state,
    registry,
    init,
  };
}
