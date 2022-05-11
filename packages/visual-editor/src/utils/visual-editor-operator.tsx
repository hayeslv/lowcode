import deepcopy from "deepcopy";
import { ElButton, ElColorPicker, ElForm, ElFormItem, ElInput, ElInputNumber, ElOption, ElSelect } from "element-plus";
import type { PropType } from "vue";
import { watch, reactive, defineComponent } from "vue";
import { TablePropEditor } from "~/components/table-prop-editor";
import type { VisualEditorBlockData, VisualEditorModelValue } from "~/types";
import type { VisualEditorConfig } from "./visual-editor";
import type { VisualEditorProps } from "./visual-editor.props";
import { VisualEditorPropsType } from "./visual-editor.props";

export const VisualEditorOperator = defineComponent({
  props: {
    block: { type: Object as PropType<VisualEditorBlockData> },
    config: { type: Object as PropType<VisualEditorConfig>, required: true },
    dataModel: { type: Object as PropType<{ value: VisualEditorModelValue }>, required: true },
    updateBlock: { type: Function as PropType<(newBlock: VisualEditorBlockData, oldBlock: VisualEditorBlockData) => void>, required: true },
    updateModelValue: { type: Function as PropType<(val: VisualEditorModelValue) => void>, required: true },
  },
  setup(props) {
    const state = reactive({
      editData: {} as any,
    });
    const methods = {
      apply: () => {
        if (!props.block) {
          // 当前编辑容器属性
          props.updateModelValue({
            ...props.dataModel.value,
            container: state.editData,
          });
        } else {
          // 当前编辑block数据的属性
          const newBlock = {
            ...props.block,
            props: state.editData,
          };
          props.updateBlock(newBlock, props.block);
        }
      },
      reset: () => {
        if (!props.block) {
          // 如果当前没有选中block，那么就让用户编辑容器的属性
          state.editData = deepcopy(props.dataModel.value.container);
        } else {
          // 否则编辑选中组件（block）的属性
          state.editData = deepcopy(props.block.props || {});
        }
      },
    };

    watch(() => props.block, () => {
      methods.reset();
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
        [VisualEditorPropsType.table]: () => (
          <TablePropEditor v-model={state.editData[propName]} propConfig={propConfig} />
        ),
      }[propConfig.type]();
    };

    return () => {
      let content: JSX.Element | null = null;

      if (!props.block) {
        content = <>
          <ElFormItem label="容器宽度">
            <ElInputNumber v-model={state.editData.width} step={100} />
          </ElFormItem>
          <ElFormItem label="容器高度">
            <ElInputNumber v-model={state.editData.height} step={100} />
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
            <ElFormItem>
              <ElButton type="primary" {...{ onClick: methods.apply }}>应用</ElButton>
              <ElButton {...{ onClick: methods.reset }}>重置</ElButton>
            </ElFormItem>
          </ElForm>
        </div>
      );
    };
  },
});
