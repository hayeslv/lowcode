import deepcopy from "deepcopy";
import { ElColorPicker, ElForm, ElFormItem, ElInput, ElInputNumber, ElOption, ElSelect } from "element-plus";
import type { PropType } from "vue";
import { watch, reactive, defineComponent } from "vue";
import type { VisualEditorBlockData, VisualEditorModelValue } from "~/types";
import type { VisualEditorConfig } from "./visual-editor";
import type { VisualEditorProps } from "./visual-editor.props";
import { VisualEditorPropsType } from "./visual-editor.props";

export const VisualEditorOperator = defineComponent({
  props: {
    block: { type: Object as PropType<VisualEditorBlockData> },
    config: { type: Object as PropType<VisualEditorConfig>, required: true },
    dataModel: { type: Object as PropType<{ value: VisualEditorModelValue }>, required: true },
  },
  setup(props) {
    const state = reactive({
      editData: {} as any,
    });

    watch(() => props.block, (val) => {
      if (!val) {
        // 如果val不存在，说明当前没有选中block，那么就让用户编辑容器的属性
        state.editData = deepcopy(props.dataModel.value.container);
      } else {
        // 否则编辑选中组件（block）的属性
        state.editData = deepcopy(val.props || {});
      }
    }, { immediate: true });

    const renderEditor = (propName: string, propConfig: VisualEditorProps) => {
      return {
        [VisualEditorPropsType.input]: () => <ElInput v-model={state.editData[propName]} />,
        [VisualEditorPropsType.color]: () => <ElColorPicker v-model={state.editData[propName]} />,
        [VisualEditorPropsType.select]: () => <ElSelect v-model={state.editData[propName]}>
          {(() => (
            propConfig.options!.map(opt => <ElOption label={opt.label} value={opt.val}></ElOption>)
          ))()}
        </ElSelect>,
      }[propConfig.type]();
    };

    return () => {
      let content: JSX.Element | null = null;

      if (!props.block) {
        content = <>
          <ElFormItem label="容器宽度">
            <ElInputNumber v-model={state.editData.width} />
          </ElFormItem>
          <ElFormItem label="容器高度">
            <ElInputNumber v-model={state.editData.height} />
          </ElFormItem>
        </>;
      } else {
        const { componentKey } = props.block;
        const component = props.config.componentMap[componentKey];
        if (!!component && !!component.props) {
          content = <>
            {
              Object.entries(component.props || {}).map(([propName, propConfig]) => {
                return <ElFormItem label={propConfig.label}>
                  { renderEditor(propName, propConfig) }
                </ElFormItem>;
              })
            }
          </>;
        }
      }

      return (
        <div class="visual-editor-operator">
          <ElForm labelPosition="top">
            {content}
          </ElForm>
        </div>
      );
    };
  },
});
