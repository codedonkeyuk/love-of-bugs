import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Flowers from "./Flowers.vue";

const mocks = await vi.hoisted(async () => {
  const { reactive } = await import("vue");
  return {
    mockGlobalState: reactive({
      bugs: {
        butterfly: false,
      },
    }),
  };
});

vi.mock("../state/globalState.ts", () => ({
  globalState: mocks.mockGlobalState,
}));

describe("Flowers Component", () => {
  beforeEach(() => {
    mocks.mockGlobalState.bugs.butterfly = false;
  });

  it("renders the parent SVG element correctly", () => {
    const wrapper = mount(Flowers, {
      props: { isNear: false },
    });

    const svg = wrapper.find("svg.flowers");
    expect(svg.exists()).toBe(true);
    expect(svg.attributes("viewBox")).toBe("0 0 185.21 264.58");
  });

  it("handles butterfly class visibility based on globalState flags", async () => {
    const wrapper = mount(Flowers, {
      props: { isNear: false },
    });

    const butterflyGroup = wrapper.find(".butterfly");
    expect(butterflyGroup.classes()).not.toContain("show");

    mocks.mockGlobalState.bugs.butterfly = true;
    await wrapper.vm.$nextTick();

    expect(butterflyGroup.classes()).toContain("show");
  });

  it("applies the animation drop style modifier class when isNear is active", async () => {
    const wrapper = mount(Flowers, {
      props: { isNear: false },
    });

    const butterflyGroup = wrapper.find(".butterfly");
    expect(butterflyGroup.classes()).not.toContain("butterfly-drop");

    await wrapper.setProps({ isNear: true });
    expect(butterflyGroup.classes()).toContain("butterfly-drop");
  });
});
