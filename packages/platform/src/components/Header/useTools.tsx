/*
 * @Descripttion: 头部工具栏
 */

import { ChatLineSquare, RefreshLeft, RefreshRight } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

export const useTools = () => {
  return [
    {
      title: "撤销",
      icon: RefreshLeft,
      onClick: () => {
        ElMessage({
          showClose: true,
          type: "info",
          duration: 2000,
          message: "敬请期待~",
        });
      },
    },
    {
      title: "恢复",
      icon: RefreshRight,
      onClick: () => {
        ElMessage({
          showClose: true,
          type: "info",
          duration: 2000,
          message: "敬请期待~",
        });
      },
    },
    {
      title: "反馈",
      icon: ChatLineSquare,
      onClick: () => {
        window.open("https://github.com/hayeslv/lowcode-h5/issues/new");
      },
    },
  ];
};
