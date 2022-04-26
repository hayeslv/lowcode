import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    // redirect: "/login",
    component: () => import("~/pages/index.vue"),
  },
  // {
  //   path: "/",
  //   name: "login",
  //   component: () => import("~/pages/login.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
