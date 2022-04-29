import "./index.scss";
import type { PropType } from "vue";
import { defineComponent } from "vue";
import type { VisualEditorModelValue } from "./visual-editor";

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<VisualEditorModelValue>,
    },
  },
  emits: {
    "update:modelValue": (val?: VisualEditorModelValue) => true,
  },
  setup() {

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
          <div>visual-editor-content</div>
        </div>

      </div>
    </div>;
  },
});
