import "./index.scss";
import type { PropType } from "vue";
import { computed, defineComponent } from "vue";
import type { VisualEditorModelValue } from "~/types/visual-editor";
import { useModel } from "./hooks/useModel";
import { VisualEditorBlock } from "../visual-editor-block";
import type { VisualEditorConfig } from "~/utils";

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<VisualEditorModelValue>,
      required: true,
    },
    config: {
      type: Object as PropType<VisualEditorConfig>,
      required: true,
    },
  },
  emits: {
    "update:modelValue": (val?: VisualEditorModelValue) => true,
  },
  setup(props, { emit }) {
    console.log("config:", props.config);
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
        {this.config.componentList.map(component => <div class="visual-editor-menu-item">
          <span class="visual-editor-menu-item-label">{component.label}</span>
          {component.preview()}
        </div>)}
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
