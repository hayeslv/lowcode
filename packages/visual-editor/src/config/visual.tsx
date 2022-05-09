import { ElButton, ElInput } from "element-plus";
import { createEditorColorProp, createEditorInputProp, createEditorSelectProp, createVisualEditorConfig } from "~/utils";

export const VisualConfig = createVisualEditorConfig();

VisualConfig.registry("text", {
  label: "文本",
  preview: () => <span>预览文本</span>,
  render: ({ props }) => <span style={{ color: props.color, fontSize: props.size }}>{props.text || "默认文本"}</span>,
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
  render: ({ props }) => <ElButton type={props.type} size={props.size}>{props.text || "按钮"}</ElButton>,
  props: {
    text: createEditorInputProp("显示文本"),
    type: createEditorSelectProp("按钮类型", [
      { label: "基础", val: "primary" },
      { label: "成功", val: "success" },
      { label: "警告", val: "warning" },
      { label: "危险", val: "danger" },
      { label: "提示", val: "info" },
      { label: "文本", val: "text" },
    ]),
    size: createEditorSelectProp("按钮大小", [
      { label: "默认", val: "default" },
      { label: "大", val: "large" },
      { label: "小", val: "small" },
    ]),
  },
});
VisualConfig.registry("input", {
  label: "输入框",
  preview: () => <ElInput />,
  render: () => <ElInput />,
});
