/*
 * @Descripttion: 物料
 */

// 分类
export interface ICategoty {
  name: string
}

export interface IMaterialData {
  //* 物料版本 */
  version: string
  //* 物料源（地址） */
  source: string
}

export interface IMaterial extends IMaterialData {
  id: number
  //* 类型（物料拥有类型：组件、模块、模板） */
  type: string
  //* 类目（物料分类：基础组件、业务组件、高级组件、普通模板、数据模块） */
  category: ICategoty
  //* 数据 */
  data: IMaterialData[]
}

export interface MaterialLoader {
  //* 针对不同的物料，会用不同的 loader 来处理 */
  type: string
  //* 加载物料 */
  loader(material: IMaterial): Promise<any>
}
