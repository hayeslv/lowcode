<template>
  <div>
    <h1>这是个页面内容</h1>
    <VisualEditor v-model="jsonData" :config="visualConfig" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VisualEditor from "~/components/visual-editor";
import { VisualConfig } from "~/config";

const visualConfig = ref(VisualConfig);

const jsonData = ref({
  container: {
    height: 500,
    width: 800,
  },
  blocks: [
    {
      top: 100,
      left: 100,
      componentKey: "button",
    },
    {
      top: 200,
      left: 200,
      componentKey: "input",
    },
  ],
});
</script>

<style lang="scss" scoped>
</style>
