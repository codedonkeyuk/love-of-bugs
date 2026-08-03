import { describe, it, expect } from "vitest";
import { createRouter, createMemoryHistory, type Router } from "vue-router";
import IntroView from "./views/IntroView.vue";
import SiteView from "./views/SiteView.vue";

describe("Vue Router Configuration", () => {
  const routes = [
    { path: "/", component: IntroView },
    { path: "/site", component: SiteView },
  ];

  describe("Test Routes", () => {
    let router: Router;

    beforeAll(() => {
      router = createRouter({
        history: createMemoryHistory(),
        routes,
      });
    });

    it("resolves / to IntroView", async () => {
      const resolved = router.resolve("/");
      expect(resolved.matched[0]?.components?.default).toBe(IntroView);
    });

    it("resolves /site to SiteView", async () => {
      const resolved = router.resolve("/site");
      expect(resolved.matched[0]?.components?.default).toBe(SiteView);
    });
  });
});
