<script setup lang="ts">
import { VideoPlay } from "@element-plus/icons-vue";
</script>

<template>
  <el-row type="flex" class="w-full">
    <!-- 左侧：logo -->
    <el-col :span="6" class="flex items-center">
      <h3 class="font-semibold">H5低代码</h3>
    </el-col>
    <!-- 中间：工具栏 -->
    <el-col class="flex items-center" :span="12">
      <div>工具1</div>
      <div>工具2</div>
      <div>工具3</div>
      <div>工具4</div>
      <div>工具5</div>
      <div>工具6</div>
    </el-col>
    <!-- 右侧：操作 -->
    <el-col :span="6" class="flex justify-end items-center">
      <el-tooltip class="item" effect="dark" content="运行" placement="bottom">
        <el-button type="primary" :icon="VideoPlay" size="large" circle class="!text-22 flex-shrink-0 !p-6px" />
      </el-tooltip>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
</style>
