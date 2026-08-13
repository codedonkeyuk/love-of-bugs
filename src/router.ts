import { createRouter, createMemoryHistory } from "vue-router";
import IntroView from "./views/IntroView.vue";

const routes = [
  {
    path: "/",
    name: "root",
    component: IntroView,
  },
  {
    path: "/site",
    name: "site",
    component: () => import("./views/SiteView.vue"),
  },
  {
    path: "/catalog-overview",
    name: "CatalogOverview",
    component: () => import("./views/CatalogOverview.vue"),
  },
  {
    path: "/catalog-sample-view/:sampleId",
    name: "CatalogSampleView",
    component: () => import("./views/CatalogSampleView.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
