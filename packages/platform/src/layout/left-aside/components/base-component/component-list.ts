import { IconComp } from "./../../../../icon/component-icon";
// 公共样式
export const commonStyle = {
  rotate: 0,
  opacity: 1,
};
// 公共属性
export const commonAttr = {
  animations: [],
  events: {},
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false, // 是否锁定组件
};

const list = [
  {
    component: "v-text",
    label: "文本",
    propValue: "双击编辑文字",
    icon: "text",
    iconComp: null,
    style: {
      width: 200,
      height: 22,
      fontSize: 14,
      lineHeight: "",
      letterSpacing: 0,
      textAlign: "",
      color: "",
    },
  },
];

for (let i = 0; i < list.length; i++) {
  const item = list[i];
  item.style = { ...commonStyle, ...item.style };
  list[i] = { ...commonAttr, ...item, iconComp: IconComp[item.icon] };
}

export default list;
