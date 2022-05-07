<template>
  <div>
    <h1>这是个页面内容</h1>
    <VisualEditor v-model="jsonData" :config="visualConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import VisualEditor from "~/components/visual-editor";
import { VisualConfig } from "~/config";
import jsonData from "~/data.json";

const visualConfig = ref(VisualConfig);
export default defineComponent({
  components: { VisualEditor },
  data() {
    return {
      visualConfig,
      jsonData,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
