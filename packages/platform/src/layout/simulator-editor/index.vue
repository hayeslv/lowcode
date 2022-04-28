<script lang="ts">
import { defineComponent } from "vue";
import EditorWrap from "./editor-wrap.vue";
import Grid from "./Grid.vue";
export default defineComponent({
  components: { EditorWrap, Grid },
  props: {
    isEdit: { type: Boolean, default: true },
  },
  setup() {
  },
});
</script>

<template>
  <EditorWrap>
    <div class="editor" :class="{ edit: isEdit }">
      <!-- 网格线 -->
      <Grid />
    </div>
  </EditorWrap>
</template>

<style lang="scss" scoped>
.editor{
  position: relative;
  background-color: #fff;
  margin: auto;
}
.edit {
  width: 100%;
  height: 100%;
  .component {
    outline: none;
    width: 100%;
    height: 100%;
  }
}
</style>
