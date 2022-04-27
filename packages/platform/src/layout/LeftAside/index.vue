<!--
 * @Descripttion: 左侧边栏
-->
<script lang="ts">
export default {
  name: "LeftAside",
};
</script>
<script setup lang="ts">
import components from "./components";

const tabs = Object.keys(components)
  .map(name => {
    const { label, icon, order } = (components as any)[name];
    return { label, icon, name, order, component: (components as any)[name] };
  })
  .sort((a, b) => a.order - b.order);

const activeName = ref(tabs[0].name);
</script>

<template>
  <el-tabs v-model="activeName" tab-position="left" class="left-aside">
    <template v-for="tab in tabs" :key="tab.name">
      <el-tab-pane :name="tab.name" lazy>
        <template #label>
          <div class="tab-item">
            <el-icon :size="26"> <component :is="tab.icon" /> </el-icon>
            {{ tab.label }}
          </div>
        </template>
        <component :is="tab.component" v-bind="$attrs" />
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<style lang="scss" scoped>
.left-aside {
  height: 100%;
  contain: layout;
  > :deep(.el-tabs__header) {
    margin-right: 0;
    .el-tabs__item {
      height: 80px;
      padding: 20px 16px;
      .tab-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }
  > :deep(.el-tabs__content) {
    height: 100%;
    overflow-y: auto;
  }
}
</style>
