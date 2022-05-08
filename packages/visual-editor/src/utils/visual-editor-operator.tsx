import { ElColorPicker, ElForm, ElFormItem, ElInput, ElInputNumber, ElOption, ElSelect } from "element-plus";
import type { PropType } from "vue";
import { reactive, defineComponent } from "vue";
import type { VisualEditorBlockData } from "~/types";
import type { VisualEditorConfig } from "./visual-editor";
import type { VisualEditorProps } from "./visual-editor.props";
import { VisualEditorPropsType } from "./visual-editor.props";

export const VisualEditorOperator = defineComponent({
  props: {
    block: { type: Object as PropType<VisualEditorBlockData> },
    config: { type: Object as PropType<VisualEditorConfig>, required: true },
  },
  setup(props) {
    const state = reactive({
      editData: "" as any,
    });

    const renderEditor = (propName: string, propConfig: VisualEditorProps) => {
      return {
        [VisualEditorPropsType.input]: () => <ElInput v-model={state.editData} />,
        [VisualEditorPropsType.color]: () => <ElColorPicker v-model={state.editData} />,
        [VisualEditorPropsType.select]: () => <ElSelect v-model={state.editData}>
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
            <ElInputNumber modelValue={1} />
          </ElFormItem>
          <ElFormItem label="容器高度">
            <ElInputNumber modelValue={1} />
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
          <ElForm>
            {content}
          </ElForm>
        </div>
      );
    };
  },
});
