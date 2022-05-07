import type { PropType } from "vue";
import { onMounted, ref, computed, defineComponent } from "vue";
import type { VisualEditorBlockData } from "~/types/visual-editor";
import type { VisualEditorConfig } from "~/utils";

export const VisualEditorBlock = defineComponent({
  props: {
    block: { type: Object as PropType<VisualEditorBlockData>, required: true },
    config: { type: Object as PropType<VisualEditorConfig>, required: true },
  },
  setup(props) {
    const el = ref({} as HTMLDivElement);

    const classes = computed(() => [
      "visual-editor-block",
      {
        "visual-editor-block-focus": props.block.focus,
      },
    ]);

    const styles = computed(() => ({
      top: `${props.block.top}px`,
      left: `${props.block.left}px`,
      zIndex: props.block.zIndex,
    }));

    onMounted(() => {
      // 添加组件的时候自动调整位置：上下左右居中
      const block = props.block;
      if (block.adjustPosition) {
        const { offsetWidth, offsetHeight } = el.value;
        block.left = block.left - offsetWidth / 2;
        block.top = block.top - offsetHeight / 2;
        block.width = offsetWidth;
        block.height = offsetHeight;
        block.adjustPosition = false;
      }
    });

    return () => {
      const component = props.config.componentMap[props.block.componentKey];
      const Render = component.render();
      return (
        <div class={classes.value} style={styles.value} ref={el}>
          { Render }
        </div>
      );
    };
  },
});
