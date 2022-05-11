import deepcopy from "deepcopy";
import { ElButton, ElDialog, ElInput, ElTable, ElTableColumn } from "element-plus";
import type { PropType } from "vue";
import { createApp, getCurrentInstance, onMounted, defineComponent, reactive } from "vue";
import type { VisualEditorProps } from "~/utils";
import { defer } from "~/utils";

export interface TablePropEditorServiceOption {
  data: any[];
  config: VisualEditorProps;
  onConfirm: (val: any[]) => void;
}

const ServiceComponent = defineComponent({
  props: {
    option: { type: Object as PropType<TablePropEditorServiceOption>, required: true },
  },
  setup(props) {
    const ctx = getCurrentInstance()!;

    const state = reactive({
      option: props.option,
      showFlag: false,
      mounted: (() => {
        const dfd = defer();
        onMounted(() => setTimeout(() => dfd.resolve(), 0));
        return dfd.promise;
      })(),
      editData: [] as any[],
    });

    const methods = {
      service: (option: TablePropEditorServiceOption) => {
        state.option = option;
        state.editData = deepcopy(option.data || []);
        methods.show();
      },
      show: async() => {
        await state.mounted;
        state.showFlag = true;
      },
      hide: () => {
        state.showFlag = false;
      },
      add: () => {
        state.editData.push({});
      },
      reset: () => {
        state.editData = deepcopy(state.option.data);
      },
    };

    const handler = {
      onConfirm: () => {
        state.option.onConfirm(state.editData);
        methods.hide();
      },
      onCancel: () => {
        methods.hide();
      },
    };

    Object.assign(ctx.proxy!, methods);
    // @ts-ignore
    return () => <ElDialog v-model={state.showFlag}>
      {{
        default: () => <div>
          <div>
            <ElButton onClick={methods.add}>添加</ElButton>
            <ElButton onClick={methods.reset}>重置</ElButton>
          </div>
          <ElTable data={state.editData}>
            <ElTableColumn type="index"></ElTableColumn>
            {state.option.config.table!.options.map((item, index) => (
              <ElTableColumn label={item.label}>
                {{
                  default: ({ row }: { row: any }) => <ElInput v-model={row[item.field]} />,
                }}
              </ElTableColumn>
            ))}
            <ElTableColumn label="操作">
              <ElButton type="danger">删除</ElButton>
            </ElTableColumn>
          </ElTable>
        </div>,
        footer: () => <>
          <ElButton onClick={handler.onCancel}>取消</ElButton>
          <ElButton type="primary" onClick={handler.onConfirm}>确定</ElButton>
        </>,
      }}
    </ElDialog>;
  },
});

export const $$tablePropEditor = (() => {
  let ins: any;
  return (option: Omit<TablePropEditorServiceOption, "onConfirm">) => {
    if (!ins) {
      const el = document.createElement("div");
      document.body.appendChild(el);
      const app = createApp(ServiceComponent, { option });
      ins = app.mount(el);
    }
    const dfd = defer<any[]>();

    ins.service({
      ...option,
      onConfirm: dfd.resolve,
    });

    return dfd.promise;
  };
})();
