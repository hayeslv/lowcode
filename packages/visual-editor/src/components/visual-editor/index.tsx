import "./index.scss";
import type { PropType } from "vue";
import { ref, computed, defineComponent } from "vue";
import type { VisualEditorComponent, VisualEditorModelValue } from "~/types/visual-editor";
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
    const dataModel = useModel(() => props.modelValue, val => emit("update:modelValue", val));
    const containerRef = ref({} as HTMLDivElement);

    const containerStyles = computed(() => ({
      width: `${dataModel.value.container.width}px`,
      height: `${dataModel.value.container.height}px`,
    }));

    const menuDragger = (() => {
      let component = null as null | VisualEditorComponent;

      const blockHandler = {
        dragstart: (e: DragEvent, current: VisualEditorComponent) => {
          containerRef.value.addEventListener("dragenter", containerHandler.dragenter);
          containerRef.value.addEventListener("dragover", containerHandler.dragover);
          containerRef.value.addEventListener("dragleave", containerHandler.dragleave);
          containerRef.value.addEventListener("drop", containerHandler.drop);

          component = current;
        },
        dragend: () => {
          containerRef.value.removeEventListener("dragenter", containerHandler.dragenter);
          containerRef.value.removeEventListener("dragover", containerHandler.dragover);
          containerRef.value.removeEventListener("dragleave", containerHandler.dragleave);
          containerRef.value.removeEventListener("drop", containerHandler.drop);
          component = null;
        },
      };
      const containerHandler = {
        // 鼠标进入container的时候
        dragenter: (e: DragEvent) => e.dataTransfer!.dropEffect = "move",
        // 拖拽的过程中离开了，就不允许放置
        dragleave: (e: DragEvent) => e.dataTransfer!.dropEffect = "none",
        dragover: (e: DragEvent) => e.preventDefault(),
        drop: (e: DragEvent) => {
          const blocks = dataModel.value.blocks || [];
          blocks.push({ top: e.offsetY, left: e.offsetX });
          dataModel.value = { ...dataModel.value, blocks };
        },
      };
      return blockHandler;
    })();

    return () => <div class="visual-editor">
      <div class="visual-editor-menu">
        {props.config.componentList.map(component => (
          <div class="visual-editor-menu-item"
            draggable
            onDragstart={(e) => menuDragger.dragstart(e, component)}
            onDragend={menuDragger.dragend}
          >
            <span class="visual-editor-menu-item-label">{component.label}</span>
            {component.preview()}
          </div>
        ))}
      </div>
      <div class="visual-editor-head">
      visual-editor-head
      </div>
      <div class="visual-editor-operator">
      visual-editor-operator
      </div>
      <div class="visual-editor-body">
        <div class="visual-editor-content">
          <div class="visual-editor-container" style={containerStyles.value} ref={containerRef}>
            {!!dataModel.value && !!dataModel.value.blocks && (
              dataModel.value.blocks.map((block, index) => (
                <VisualEditorBlock block={block} key={index} />
              ))
            )}
          </div>

        </div>
      </div>
    </div>;
  },
});
