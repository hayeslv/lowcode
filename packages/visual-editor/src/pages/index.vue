<template>
  <div class="page">
    <h1>这是个页面内容</h1>
    <VisualEditor
      v-model="jsonData"
      :custom-props="customProps"
      :config="visualConfig"
      :form-data="formData"
    >
      <!-- <template #subBtn>
        <el-button v-if="formData.food === 'dangao'">自定义按钮</el-button>
        <el-tag v-else>自定义标签</el-tag>
      </template> -->
    </VisualEditor>
    <div style="text-align: center;">{{ JSON.stringify(formData) }}</div>
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
      customProps: {
        subBtn: {
          onClick: () => {
            this.$notify({ message: "执行表单数据校验以及提交到服务器的动作" });
          },
        },
        mySelect: {
          onChange: (val: string) => {
            this.$notify({ message: `食物发生变化：${val}` });
            this.formData.acctType = null;
          },
        },
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.page{
  padding-bottom: 300px;
}
</style>
