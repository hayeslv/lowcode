import { Edit } from "@element-plus/icons-vue";

export default defineComponent({
  name: "BaseComponent",
  label: "基本组件",
  order: 2,
  icon: Edit,
  setup() {},
  render() {
    return <div>base-comp</div>;
  },
});
