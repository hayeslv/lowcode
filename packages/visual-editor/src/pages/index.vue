<template>
  <div>
    <h1>这是个页面内容</h1>
    <VisualEditor v-model="jsonData" :config="visualConfig" :form-data="formData" />
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
      formData: {
        username: "admin",
      },
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
