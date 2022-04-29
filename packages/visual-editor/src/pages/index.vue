<template>
  <div>
    <h1>这是个页面内容</h1>
    <VisualEditor v-model="jsonData" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VisualEditor from "~/components/visual-editor";

const jsonData = ref({
  container: {
    height: 800,
    width: 500,
  },
  blocks: [
    {
      top: 100,
      left: 100,
    },
    {
      top: 100,
      left: 200,
    },
  ],
});
</script>

<style lang="scss" scoped>
</style>
