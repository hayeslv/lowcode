<script lang="ts" setup>
import { defineComponent } from "vue";
import { getComponentData } from "~/hooks/useComponentData";
import { initEditor } from "~/hooks/useEditor";
import EditorWrap from "./editor-wrap.vue";
import Grid from "./Grid.vue";
import Shape from "./shape.vue";

const props = defineProps({
  isEdit: { type: Boolean, default: true },
});

const componentData = getComponentData();

onMounted(() => {
  initEditor("#editor");
});

watch(() => componentData, () => {
  console.log(123);
});
</script>

<template>
  <EditorWrap>
    <div id="editor" class="editor" :class="{ edit: isEdit }">
      <!-- 网格线 -->
      <Grid />
      <!--页面组件列表展示-->
      <Shape
        v-for="(item, index) in componentData"
        :key="item.id"
        :index="index"
      >
        <component :is="item.component" />
      </Shape>
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
