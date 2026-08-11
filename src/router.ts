import { createRouter, createMemoryHistory } from "vue-router";
import RootView from "./views/RootView.vue";

const routes = [
  {
    path: "/",
    name: "root",
    component: RootView,
  },
  {
    path: "/intro",
    name: "intro",
    component: () => import("./views/IntroView.vue"),
  },
  {
    path: "/site",
    name: "site",
    component: () => import("./views/SiteView.vue"),
  },
];

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
