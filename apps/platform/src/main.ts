import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

import { sum } from "@hayeslc/shared";
console.log(sum(1, 2));

const app = createApp(App);
app.use(router);
app.mount("#app");
