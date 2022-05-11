import { ElButton, ElTag } from "element-plus";
import type { PropType } from "vue";
import { defineComponent } from "vue";
import type { VisualEditorProps } from "~/utils";
import { useModel } from "../visual-editor/hooks/useModel";
import "./index.scss";
import { $$tablePropEditor } from "./service";

export const TablePropEditor = defineComponent({
  props: {
    modelValue: { type: Array as PropType<any[]> },
    propConfig: { type: Object as PropType<VisualEditorProps>, required: true },
  },
  emits: {
    "update:modelValue": (val?: any[]) => true,
  },
  setup(props, { emit }) {
    const model = useModel(() => props.modelValue, val => emit("update:modelValue", val));

    const onClick = async() => {
      const data = await $$tablePropEditor({
        config: props.propConfig,
        data: props.modelValue || [],
      });
      model.value = data;
    };

    return () => <div>
      {(!model.value || model.value.length === 0) && <ElButton onClick={onClick}>添加</ElButton> }
      {(model.value || []).map(item => <ElTag onClick={onClick}>
        {item[props.propConfig.table!.showKey]}
      </ElTag>)}
    </div>;
  },
});
