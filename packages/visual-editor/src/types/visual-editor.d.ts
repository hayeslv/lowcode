// block数据
export interface VisualEditorBlockData {
  componentKey: string;             // 映射 VisualEditorConfig 中 componentMap 的 component 对象
  top: number;                      // 组件的 top 定位
  left: number;                     // 组件的 left 定位
  adjustPosition?: boolean;          // 是否需要调整位置
  focus?: boolean;                   // 是否为选中状态
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
  render: () => JSX.Element;
}
