import { createRouter, createMemoryHistory } from "vue-router";
import IntroView from "./views/IntroView.vue";

const routes = [
  {
    path: "/",
    name: "root",
    component: IntroView,
  },
  {
    path: "/bug-archive",
    name: "BugArchive",
    component: () => import("./views/BugArchive.vue"),
  },
  {
    path: "/bug-archive/:sampleId",
    name: "BugArchiveBugBox",
    component: () => import("./views/BugBox.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
