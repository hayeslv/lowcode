// block数据
export interface VisualEditorBlockData {
  top: number;
  left: number;
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
