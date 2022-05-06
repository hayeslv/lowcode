import { ElButton, ElDialog, ElInput } from "element-plus";
import type { PropType } from "vue";
import { getCurrentInstance, createApp, defineComponent, reactive } from "vue";
import { defer } from "./defer";

enum DialogServiceEditType {
  textarea = "textarea",
  input = "input",
}

interface DialogServiceOption {
  editType: DialogServiceEditType;
  editReadonly?: boolean;
  editValue?: string | null;
  onConfirm: (val?: string | null) => void;
}

const ServiceComponent = defineComponent({
  props: {
    option: { type: Object as PropType<DialogServiceOption>, required: true },
  },
  setup(props) {
    const ctx = getCurrentInstance()!;

    const state = reactive({
      option: props.option,
      editValue: null as null | undefined | string,
      showFlag: false,
    });

    const methods = {
      service: (option: DialogServiceOption) => {
        state.option = option;
        state.editValue = option.editValue;
        methods.show();
      },
      show: () => {
        state.showFlag = true;
      },
      hide: () => state.showFlag = false,
    };

    const handler = {
      onConfirm: () => {
        state.option.onConfirm(state.editValue);
        methods.hide();
      },
      onCancel: () => {
        methods.hide();
      },
    };

    Object.assign(ctx.proxy, methods);

    return () =>
      <ElDialog modelValue={state.showFlag}>
        {{
          default: () => <div>
            {
              state.option.editType === DialogServiceEditType.textarea
                ? <ElInput type="textarea" {...{ rows: 10 }} v-model={state.editValue} />
                : <ElInput v-model={state.editValue} />
            }
          </div>,
          footer: () => <div>
            <ElButton onClick={handler.onCancel}>取消</ElButton>
            <ElButton onClick={handler.onConfirm}>确定</ElButton>
          </div>,
        }}
      </ElDialog>;
  },
});

const DialogService = (() => {
  let ins: any;

  return (option: DialogServiceOption) => {
    if (!ins) {
      const el = document.createElement("div");
      document.body.appendChild(el);
      const app = createApp(ServiceComponent, { option });
      ins = app.mount(el);
    }
    ins.service(option);
  };
})();

export const $$dialog = Object.assign(DialogService, {
  input: (initValue?: string, option?: DialogServiceOption) => {
    const dfd = defer<string | null | undefined>();
    const opt: DialogServiceOption = option || { editType: DialogServiceEditType.input, onConfirm: dfd.resolve };
    DialogService(opt);

    return dfd.promise;
  },
  textarea: (initValue?: string, option?: DialogServiceOption) => {
    const dfd = defer<string | null | undefined>();
    const opt: DialogServiceOption = option || { editType: DialogServiceEditType.textarea, onConfirm: dfd.resolve };
    DialogService(opt);

    return dfd.promise;
  },
});
