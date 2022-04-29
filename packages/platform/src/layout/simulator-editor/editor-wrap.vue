<script lang="ts">
import { defineComponent } from "vue";
import _ from "lodash-es";
import componentList from "~/layout/left-aside/components/base-component/component-list";
import { getEditor } from "~/hooks/useEditor";
import { getGenerateID } from "~/hooks/useId";
import { addComponent, getComponentData } from "~/hooks/useComponentData";

export default defineComponent({
  setup() {
    const state = reactive({
      drag: false,
    });
    const handleDrop = (e: DragEvent) => {
      // drag：拖拽期间释放时触发
      e.preventDefault();
      e.stopPropagation();
      const index = e.dataTransfer!.getData("index");
      const editor = getEditor();
      const rectInfo = editor.value!.getBoundingClientRect();
      if (index) {
        const component = _.cloneDeep(componentList[index]);
        component.style.top = e.clientY - rectInfo.y;
        component.style.left = e.clientX - rectInfo.x;
        component.id = getGenerateID();
        addComponent(component);
      }
    };
    const handleDragOver = (e) => {
      // dragover：拖拽期间在被拖拽元素上连续触发
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    };
    const handleMouseDown = (e) => {
      // 鼠标点击
      console.log("handleMouseDown");
    };
    const handleMouseUp = (e) => {
      // 鼠标抬起
      console.log("handleMouseUp");
    };

    return {
      ...toRefs(state),
      handleDrop,
      handleDragOver,
      handleMouseDown,
      handleMouseUp,
    };
  },
});
</script>

<template>
  <div
    class="w-full h-full"
    @drop="handleDrop"
    @dragover="handleDragOver"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <slot name="default" />
  </div>
</template>

<style lang="scss" scoped>
</style>
