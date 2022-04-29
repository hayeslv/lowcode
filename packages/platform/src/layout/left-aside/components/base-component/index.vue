<script lang="ts">
import { Edit } from "@element-plus/icons-vue";

export default defineComponent({
  name: "BaseComponent",
  label: "基本组件",
  order: 0,
  icon: Edit,
});
</script>
<script lang="ts" setup>
import componentList from "./component-list";

const handleDragStart = (e) => {
  e.dataTransfer.setData("index", e.target.dataset.index); // 拖拽元素携带的数据
};
</script>

<template>
  <div class="component-list flex flex-wrap justify-between p-10px" @dragstart="handleDragStart">
    <div
      v-for="(comp, index) in componentList"
      :key="index"
      class="list"
      draggable="true"
      :data-index="index"
    >
      <el-icon v-if="comp.iconComp" :size="20" class="mr-4px"> <component :is="comp.iconComp" /> </el-icon>
      <span class="text-18px">{{ comp.label }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.component-list{
  .list {
    width: 45%;
    border: 1px solid #ddd;
    cursor: grab;
    margin-bottom: 10px;
    text-align: center;
    color: #333;
    padding: 2px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:active{
      cursor: grabbing;
    }
  }
}
</style>
