import type { VisualEditorBlockData, VisualEditorComponent } from "~/types";
import type { VisualEditorProps } from "./visual-editor.props";

export function createVisualEditorConfig() {
  const componentList: VisualEditorComponent[] = [];
  const componentMap: Record<string, VisualEditorComponent> = {};

  return {
    componentList,
    componentMap,
    registry: <Props extends Record<string, VisualEditorProps> = {}>(key: string, component: {
      label: string;
      preview: () => JSX.Element;
      render: (data: { props: { [k in keyof Props]: any } }) => JSX.Element;
      props?: Props;
    }) => {
      const comp = { ...component, key };
      componentList.push(comp);
      componentMap[key] = comp;
    },
  };
}

export type VisualEditorConfig = ReturnType<typeof createVisualEditorConfig>;

export interface VisualEditorMarkLines {
  x: { left: number; showLeft: number }[];
  y: { top: number; showTop: number }[];
}

export function createNewBlock(
  {
    component,
    left,
    top,
  }: {
    component: VisualEditorComponent;
    left: number;
    top: number;
  },
): VisualEditorBlockData {
  return {
    top,
    left,
    componentKey: component!.key,
    adjustPosition: true,
    focus: false,
    zIndex: 0,
    width: 0,
    height: 0,
    hasResize: false,
    props: {},
  };
}
