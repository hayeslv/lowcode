<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {},
});
</script>

<template>
  <div class="shape">
    <slot name="default" />
  </div>
</template>

<style lang="scss" scoped>
.shape{
  position: absolute;
  &:hover{
    cursor: move;
  }
}
</style>
