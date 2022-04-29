import type { PropType } from "vue";
import { defineComponent } from "vue";
import type { VisualEditorBlockData } from "~/types/visual-editor";

export const VisualEditorBlock = defineComponent({
  props: {
    block: {
      type: Object as PropType<VisualEditorBlockData>,
      required: true,
    },
  },
  setup() {},
  render() {
    return <div class="visual-editor-block">
      这是一个block
    </div>;
  },
});
