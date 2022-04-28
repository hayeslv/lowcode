import type { CSSProperties } from "vue";

/**
 * 组件属性
 */
export interface VisualEditorBlockData {
  //* 组件id 时间戳，组件唯一标识符 */
  _vid: string
  //* 组件所属的模块（基础组件、容器组件等） */
  moduleName: keyof ComponentModules
}

/**
 * 组件模块
 */
export interface ComponentModules {
  baseComponents: VisualEditorComponent[] // 基础组件
  containerComponents: VisualEditorComponent[] // 容器组件
}

/**
 * 单个组件注册规则
 */
export interface VisualEditorComponent {
  //* 组件名称 */
  key: string
  //* 组件所属模块名称 */
  moduleName: keyof ComponentModules
  //* 组件唯一id */
  _vid?: string
  //* 组件中文名称 */
  label: string
  //* 组件预览函数 */
  preview: () => JSX.Element
  //* 组件渲染函数 */
  render: (data: {
    props: any
    model: any
    styles: CSSProperties
    block: VisualEditorBlockData
    custom: Record<string, any>
  }) => () => JSX.Element
}
