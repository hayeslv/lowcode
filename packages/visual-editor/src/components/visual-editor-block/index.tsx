import type { PropType } from "vue";
import { computed, defineComponent } from "vue";
import type { VisualEditorBlockData } from "~/types/visual-editor";

export const VisualEditorBlock = defineComponent({
  props: {
    block: {
      type: Object as PropType<VisualEditorBlockData>,
      required: true,
    },
  },
  setup(props) {
    const styles = computed(() => ({
      top: `${props.block.top}px`,
      left: `${props.block.left}px`,
    }));

    return { styles };
  },
  render() {
    return <div class="visual-editor-block" style={this.styles}>
      这是一个block
    </div>;
  },
});
