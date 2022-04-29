import "./index.scss";
import type { PropType } from "vue";
import { computed, defineComponent } from "vue";
import type { VisualEditorModelValue } from "~/types/visual-editor";
import { useModel } from "./hooks/useModel";
import { VisualEditorBlock } from "../visual-editor-block";

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<VisualEditorModelValue>,
      required: true,
    },
  },
  emits: {
    "update:modelValue": (val?: VisualEditorModelValue) => true,
  },
  setup(props, { emit }) {
    const dataModel = useModel(() => props.modelValue, val => emit("update:modelValue", val));

    const containerStyles = computed(() => ({
      width: `${dataModel.value.container.width}px`,
      height: `${dataModel.value.container.height}px`,
    }));

    return { dataModel, containerStyles };
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
          <div class="visual-editor-container" style={this.containerStyles}>
            {!!this.dataModel.value && !!this.dataModel.value.blocks && (
              this.dataModel.value.blocks.map((block, index) => (
                <VisualEditorBlock block={block} key={index} />
              ))
            )}
          </div>

        </div>
      </div>
    </div>;
  },
});
