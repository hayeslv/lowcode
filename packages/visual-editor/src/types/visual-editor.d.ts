import type { VisualEditorProps } from "~/utils";

// block数据
export interface VisualEditorBlockData {
  componentKey: string;             // 映射 VisualEditorConfig 中 componentMap 的 component 对象
  top: number;                      // 组件的 top 定位
  left: number;                     // 组件的 left 定位
  adjustPosition?: boolean;         // 是否需要调整位置
  focus?: boolean;                  // 是否为选中状态
  zIndex: number;                   // z-index 值
  width: number;                    // 组件宽度
  height: number;                   // 组件高度
  hasResize: boolean;               // 是否调整过宽高
  props: Record<string, any>;       // 组件的设计属性
  model: Record<string, string>;    // 绑定的字段
  slotName?: string;                // 组件唯一标识
}

// 传入editor的数据
export interface VisualEditorModelValue {
  container: {
    width: number;
    height: number;
  };
  blocks?: VisualEditorBlockData[];
}
// 组件
export interface VisualEditorComponent {
  key: string;
  label: string;
  preview: () => JSX.Element;
  render: (data: {
    props: any;
    model: any;
    size: { width?: number; height?: number };
  }) => JSX.Element;
  props?: Record<string, VisualEditorProps>;
  model?: Record<string, string>;
  resize?: { width?: boolean; height?: boolean };
}
