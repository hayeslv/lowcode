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
  render: ({ props, size, custom }) => (
    <ElButton
      {...custom}
      type={props.type}
      size={props.size}
      style={{
        width: size.width ? `${size.width}px` : null,
        height: size.height ? `${size.height}px` : null,
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
  render: ({ props, model, custom }) => (
    <ElSelect
      {...custom}
      {...model.default}
      key={(props.options || []).map((opt: any) => opt.value).join(",")}>
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
  render: ({ model, size, custom }) => <ElInput
    {...custom}
    {...model.default}
    style={{ width: size.width ? `${size.width}px` : null }}
  />,
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
    style={{ width: size.width ? `${size.width}px` : null }}
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

VisualConfig.registry("image", {
  label: "图片",
  resize: {
    width: true,
    height: true,
  },
  render: ({ props, size }) => {
    return (
      <div style={{ height: `${size.height || 100}px`, width: `${size.width || 100}px` }} class="visual-block-image">
        <img
          style="object-fit: fill; display: block; width: 100%; height: 100%"
          src={props.url || "https://cn.vuejs.org/images/logo.png"}
        />
      </div>
    );
  },
  preview: () => (
    <div style="text-align: center;">
      <div style="font-size:20px;background-color:#f2f2f2;color:#ccc;display:inline-flex;width:100px;height:50px;align-items:center;justify-content:center">
        <i class="el-icon-picture"></i>
      </div>
    </div>
  ),
  props: {
    url: createEditorInputProp("地址"),
  },
});
