import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: () => {
      return `/orders`;
    },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
