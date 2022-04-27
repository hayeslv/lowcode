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
    <el-container class="layout-container">
      <el-aside width="380px" class="shadow-sm">
        <left-aside />
      </el-aside>
      <el-main>
        <simulator-editor />
        <div>右侧属性面板</div>
      </el-main>
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
.el-main {
  position: relative;
  padding: 12px;
  background-color: #f5f5f5;
  @media(min-width: 1100px) {
    overflow-x: hidden;
  }
}
</style>
