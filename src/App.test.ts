import { describe, it, expect, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import App from "./App.vue";

vi.mock("vue-router", () => ({
  RouterView: {
    name: "RouterView",
    template: '<div class="mocked-router-view">Mock Content</div>',
  },
}));

describe("Router Container Component", () => {
  it("renders the router-view successfully", () => {
    const wrapper = shallowMount(App, {
      global: {
        stubs: {
          "router-view": true,
        },
      },
    });

    const routerView = wrapper.findComponent({ name: "RouterView" });
    expect(routerView.exists()).toBe(true);
  });

  it("matches the snapshot structure", () => {
    const wrapper = shallowMount(App);

    expect(wrapper.html()).toMatchInlineSnapshot(
      `"<router-view-stub></router-view-stub>"`,
    );
  });
});
