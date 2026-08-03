import { createRouter, createWebHistory } from "vue-router";
import IntroView from "./views/IntroView.vue";

const routes = [
  {
    path: "/",
    name: "intro",
    component: IntroView,
  },
  {
    path: "/site",
    name: "site",
    component: () => import("./views/SiteView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
