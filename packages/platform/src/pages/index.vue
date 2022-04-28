<script setup lang="ts">
import PageHeader from "~/layout/page-header/index.vue";
import LeftAside from "../layout/left-aside/index.vue";
import SimulatorEditor from "../layout/simulator-editor/index.vue";
</script>

<template>
  <el-container>
    <el-header height="80px" class="flex item-center shadow-md">
      <page-header />
    </el-header>
    <el-container class="layout-container flex w-full">
      <el-aside width="380px" class="shadow-sm">
        <left-aside />
      </el-aside>
      <main class="main flex-1 min-w-500px">
        <simulator-editor />
      </main>
      <section class="w-250px min-w-250px">右侧属性列表</section>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container{
  height: calc(100vh - 80px);
}
.el-header {
  position: relative; // 确保header的阴影不被下方元素遮挡
  z-index: 99;
  background: #fff;
}
.el-aside{
  background: #fff;
}
.main {
  position: relative;
  background-color: #ddd;
}
</style>
