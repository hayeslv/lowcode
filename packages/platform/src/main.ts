import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

import { setupElementPlus } from "./plugins/element-plus";
import { setupVant } from "./plugins/vant";

import "virtual:windi.css";
import "virtual:windi-devtools";

const app = createApp(App);

// 使用element-plus插件
setupElementPlus(app);
// 使用vant插件
setupVant(app);

app.use(router);
// 路由准备完毕再挂载
router.isReady().then(() => app.mount("#app"));
