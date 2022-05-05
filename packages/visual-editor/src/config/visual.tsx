import { ElButton, ElInput } from "element-plus";
import { createVisualEditorConfig } from "~/utils";

export const VisualConfig = createVisualEditorConfig();

VisualConfig.registry("text", {
  label: "文本",
  preview: () => <span>预览文本</span>,
  render: () => <span>渲染文本</span>,
});
VisualConfig.registry("button", {
  label: "按钮",
  preview: () => <ElButton>按钮</ElButton>,
  render: () => <ElButton>渲染按钮</ElButton>,
});
VisualConfig.registry("input", {
  label: "输入框",
  preview: () => <ElInput />,
  render: () => <ElInput />,
});
