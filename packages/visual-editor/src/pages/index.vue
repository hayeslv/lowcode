<template>
  <div>
    <h1>这是个页面内容</h1>
    <VisualEditor />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VisualEditor from "~/components/visual-editor";
import { TestUseModel } from "~/components/visual-editor/hooks/useModel";

</script>

<style lang="scss" scoped>
</style>
