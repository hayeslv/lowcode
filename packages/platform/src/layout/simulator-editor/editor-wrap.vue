<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({
      drag: false,
    });
    const handleDrop = (e) => {
      // drag：拖拽期间在被拖拽元素上连续触发
      console.log("drop");
    };
    const handleDragOver = (e) => {
      // dragover：拖拽时鼠标在目标元素上移动时触发.监听器通过阻止浏览器默认行为设置元素为可拖放元素.
      console.log("handleDragOver");
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
