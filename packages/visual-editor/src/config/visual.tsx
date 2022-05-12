import { ElButton, ElInput, ElOption, ElSelect } from "element-plus";
import { NumberRange } from "~/components/number-range";
import { createEditorColorProp, createEditorInputProp, createEditorSelectProp, createEditorTableProp, createVisualEditorConfig } from "~/utils";

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
  resize: { width: true, height: true },
  preview: () => <ElButton>按钮</ElButton>,
  render: ({ props, size }) => (
    <ElButton type={props.type} size={props.size} style={{
      width: `${size.width}px`,
      height: `${size.height}px`,
    }}>
      {props.text || "按钮"}
    </ElButton>
  ),
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
VisualConfig.registry("select", {
  label: "下拉框",
  preview: () => <ElSelect />,
  render: ({ props, model }) => (
    <ElSelect {...model.default} key={(props.options || []).map((opt: any) => opt.value).join(",")}>
      {(props.options || []).map((opt: { label: string; value: string }, index: number) => (
        <ElOption label={opt.label} value={opt.value} key={index} />
      ))}
    </ElSelect>
  ),
  props: {
    options: createEditorTableProp("下拉选项", {
      options: [
        { label: "显示值", field: "label" },
        { label: "绑定值", field: "value" },
        { label: "备注", field: "comments" },
      ],
      showKey: "label",
    }),
  },
  model: {
    default: "绑定字段",
  },
});
VisualConfig.registry("input", {
  label: "输入框",
  resize: {
    width: true,
  },
  preview: () => <ElInput />,
  render: ({ model, size }) => <ElInput {...model.default} style={{ height: `${size.width}px` }} />,
  model: {
    default: "绑定字段",
  },
});

VisualConfig.registry("number-range", {
  label: "数字范围输入框",
  resize: {
    width: true,
  },
  preview: () => <NumberRange />,
  render: ({ model, size }) =>  <NumberRange
    style={{ height: `${size.width}px` }}
    {...{
      start: model.start?.value,
      "onUpdate:start": model.start?.onChange,
      end: model.end?.value,
      "onUpdate:end": model.end?.onChange,
    }}
  />,
  model: {
    start: "起始绑定字段",
    end: "截止绑定字段",
  },
});
