import { ElButton, ElInput } from "element-plus";
import { createEditorColorProp, createEditorInputProp, createEditorSelectProp, createVisualEditorConfig } from "~/utils";

export const VisualConfig = createVisualEditorConfig();

VisualConfig.registry("text", {
  label: "文本",
  preview: () => <span>预览文本</span>,
  render: () => <span>渲染文本</span>,
  props: {
    text: createEditorInputProp("显示文本"),
    color: createEditorColorProp("字体颜色"),
    size: createEditorSelectProp("字体大小", [
      { label: "14px", val: "14px" },
      { label: "18px", val: "18px" },
      { label: "24px", val: "24px" },
    ]),
  },
});
VisualConfig.registry("button", {
  label: "按钮",
  preview: () => <ElButton>按钮</ElButton>,
  render: () => <ElButton>渲染按钮</ElButton>,
  props: {
    text: createEditorInputProp("显示文本"),
    type: createEditorSelectProp("按钮类型", [
      { label: "primary", val: "基础" },
      { label: "success", val: "成功" },
      { label: "warning", val: "警告" },
      { label: "danger", val: "危险" },
      { label: "info", val: "提示" },
      { label: "text", val: "文本" },
    ]),
    size: createEditorSelectProp("按钮大小", [
      { label: "默认", val: "" },
      { label: "中等", val: "medium" },
      { label: "小", val: "small" },
      { label: "极小", val: "mini" },
    ]),
  },
});
VisualConfig.registry("input", {
  label: "输入框",
  preview: () => <ElInput />,
  render: () => <ElInput />,
});
