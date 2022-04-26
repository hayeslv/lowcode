/*
 * @Descripttion: 项目
 */

import { uuid } from "../utils";

export interface IProject {
  //* 项目名称 */
  name: string
  //* 项目描述 */
  description: string
  //* 项目中的页面 */
  pages: IPage[]
}

// 页面
export interface IPage {
  //* 名称 */
  name: string
  //* 描述 */
  description: string
  //* 元素 */
  elements: IElement[]
}

// 页面元素
export interface IElement {
  id: string
  //* 名称 */
  name: string
  //* 关联物料ID */
  mId: number
  //* 物料应用的版本 */
  mVersion: string
}

export class Project implements IProject {
  static create(p?: IProject) {
    const project = new Project();
    if (p) {
      project.name = p.name;
      project.description = p.description;
      project.pages = p.pages.map(page => Page.create(page));
    }
    else {
      const page = Page.create();
      project.addPage(page);
    }

    return project;
  }

  name = "New Project";
  description = "New Project Description";
  pages: Page[] = [];

  constructor() {
  }

  addPage(page: Page) {
    this.pages.push(page);
  }

  removePage(page: Page) {
    const index = this.pages.indexOf(page);
    if (index >= 0) {
      this.pages.splice(index, 1);
    }
  }

  insertPage(index: number, page: Page) {
    this.pages.splice(index, 0, page);
  }

  getJson() {
    return {
      name: this.name,
      description: this.description,
      pages: this.pages.map(page => page.getJson()),
    };
  }
}

export class Page implements IPage {
  static create(p?: IPage) {
    const page = new Page();
    if (p) {
      page.name = p.name;
      page.description = p.description;
      page.elements = p.elements.map(element => PageElement.create(element));
    }

    return page;
  }

  name = "New Page";
  description = "New Page Description";
  elements: PageElement[] = [];

  constructor() {}

  addElement(element: PageElement) {
    this.elements.push(element);
  }

  removeElement(element: PageElement) {
    const index = this.elements.indexOf(element);
    if (index >= 0) {
      this.elements.splice(index, 1);
    }
  }

  insertElement(index: number, element: PageElement) {
    this.elements.splice(index, 0, element);
  }

  getJson() {
    return {
      name: this.name,
      description: this.description,
      elements: this.elements.map(element => element.getJson()),
    };
  }
}

export class PageElement implements IElement {
  static create(e?: IElement) {
    // 创建一个元素，这个元素对应某个物料的某个版本
    const element = new PageElement();
    if (e) {
      element.id = e.id;
      element.name = e.name;
      element.mId = e.mId;
      element.mVersion = e.mVersion;
    }
    return element;
  }

  id: string = uuid();
  name: string = "New Element";
  mId: number = 0;
  mVersion: string = "";

  constructor() {}

  //* 数据库中最终存的是JSON */
  getJson() {
    return {
      id: this.id,
      name: this.name,
      mId: this.mId,
      mVersion: this.mVersion,
    };
  }
}
