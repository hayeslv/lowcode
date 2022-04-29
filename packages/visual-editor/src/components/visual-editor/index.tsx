import "./index.scss";
import type { PropType } from "vue";
import { defineComponent } from "vue";
import type { VisualEditorModelValue } from "~/types/visual-editor";
import { useModel } from "./hooks/useModel";
import { VisualEditorBlock } from "../visual-editor-block";

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<VisualEditorModelValue>,
    },
  },
  emits: {
    "update:modelValue": (val?: VisualEditorModelValue) => true,
  },
  setup(props, { emit }) {
    const dataModel = useModel(() => props.modelValue, val => emit("update:modelValue", val));
    console.log("dataModel:", dataModel);

    return { dataModel };
  },
  render() {
    return <div class="visual-editor">
      <div class="visual-editor-menu">
      visual-editor-menu
      </div>
      <div class="visual-editor-head">
      visual-editor-head
      </div>
      <div class="visual-editor-operator">
      visual-editor-operator
      </div>
      <div class="visual-editor-body">
        <div class="visual-editor-content">
          {!!this.dataModel.value && !!this.dataModel.value.blocks && (
            this.dataModel.value.blocks.map((block, index) => (
              <VisualEditorBlock block={block} key={index} />
            ))
          )}
        </div>
      </div>
    </div>;
  },
});
