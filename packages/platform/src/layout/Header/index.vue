<script setup lang="ts">
import { VideoPlay } from "@element-plus/icons-vue";
import { useTools } from "./useTools";

const tools = useTools();
</script>

<template>
  <el-row type="flex" class="w-full">
    <!-- 左侧：logo -->
    <el-col :span="6" class="flex items-center">
      <h3 class="font-semibold">H5低代码</h3>
    </el-col>
    <!-- 中间：工具栏 -->
    <el-col class="flex items-center" :span="12">
      <template v-for="(tool, index) in tools" :key="index">
        <div class="w-50px">
          <div class="tool-item flex flex-col items-center cursor-pointer" @click="tool.onClick">
            <el-icon>
              <component :is="tool.icon" />
            </el-icon>
            <div class="mt-4px text-sm">{{ tool.title }}</div>
          </div>
        </div>
      </template>
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
