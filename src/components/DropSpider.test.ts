import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import DropSpider from "./DropSpider.vue";

describe("DropSpider Component", () => {
  it("renders the SVG element successfully with its base configuration", () => {
    const wrapper = mount(DropSpider, {
      props: {
        isNear: false,
      },
    });

    const svgElement = wrapper.find("svg.spider");

    expect(svgElement.exists()).toBe(true);
    expect(svgElement.attributes("viewBox")).toBe("0 0 79.374998 79.375");
  });

  it("does not attach the 'spider-drop' animation class when isNear is false", () => {
    const wrapper = mount(DropSpider, {
      props: {
        isNear: false,
      },
    });

    const svgElement = wrapper.find("svg.spider-in-motion");
    expect(svgElement.classes()).not.toContain("spider-drop");
  });

  it("attaches the 'spider-drop' animation class when isNear is true", () => {
    const wrapper = mount(DropSpider, {
      props: {
        isNear: true,
      },
    });

    const svgElement = wrapper.find("svg.spider-in-motion");
    expect(svgElement.classes()).toContain("spider-drop");
  });

  it("reacts dynamically when the isNear prop values change over time", async () => {
    const wrapper = mount(DropSpider, {
      props: {
        isNear: false,
      },
    });

    const svgElement = wrapper.find("svg.spider-in-motion");
    expect(svgElement.classes()).not.toContain("spider-drop");

    await wrapper.setProps({ isNear: true });
    expect(svgElement.classes()).toContain("spider-drop");
  });
});
