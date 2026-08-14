import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import CatalogWrapper from "./CatalogWrapper.vue";
import CatalogInterface from "../components/CatalogInterface.vue";

let routeLeaveCallback: Function | null = null;

vi.mock("vue-router", () => ({
  onBeforeRouteLeave: (callback: Function) => {
    routeLeaveCallback = callback;
  },
}));

vi.mock("../components/CatalogInterface.vue", () => ({
  default: {
    name: "CatalogInterface",
    template: '<div class="mock-catalog-interface"><slot /></div>',
  },
}));

describe("CatalogWrapper.vue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    routeLeaveCallback = null;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("renders correctly with default slot content", () => {
    const wrapper = mount(CatalogWrapper, {
      slots: {
        default: '<div class="slotted-content">Page Data</div>',
      },
    });

    expect(wrapper.find(".catalog-container").exists()).toBe(true);

    expect(wrapper.findComponent(CatalogInterface).exists()).toBe(true);
    expect(wrapper.find(".slotted-content").text()).toBe("Page Data");
  });

  it("initially does not have the slide-on-exit class", () => {
    const wrapper = mount(CatalogWrapper);
    const catalogInterface = wrapper.findComponent(CatalogInterface);

    expect(catalogInterface.classes()).not.toContain("slide-on-exit");
  });

  it("triggers animation state and delays navigation when leaving route", async () => {
    const nextMock = vi.fn();
    const wrapper = mount(CatalogWrapper);

    const catalogInterface = wrapper.findComponent(CatalogInterface);

    expect(routeLeaveCallback).toBeTypeOf("function");

    routeLeaveCallback!({}, {}, nextMock);

    await wrapper.vm.$nextTick();

    expect(catalogInterface.classes()).toContain("slide-on-exit");

    expect(nextMock).not.toHaveBeenCalled();

    vi.advanceTimersByTime(4000);

    expect(nextMock).toHaveBeenCalledTimes(1);
  });
});
