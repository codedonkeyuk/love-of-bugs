import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import BugCategory from "./BugCategory.vue";
import BugCanvas from "../components/BugCanvas.vue";
import type { Bug } from "../types";

vi.mock("../components/BugCanvas.vue", () => ({
  default: {
    name: "BugCanvas",
    template: '<div class="mock-bug-canvas"></div>',
    props: ["size", "bugCount", "bugSvgUrl", "label"],
  },
}));

describe("CategorySection.vue", () => {
  const mockSamples: Bug[] = [
    {
      bugCount: 5,
      src: "bug1.svg",
      label: "Ant",
      size: "50",
      id: "",
      subcategory: {
        name: "",
        description: "",
        bugCategory: {
          name: "",
          description: "",
        },
      },
    },
    {
      bugCount: 12,
      src: "bug2.svg",
      label: "Beetle",
      size: "0",
      id: "",
      subcategory: {
        name: "",
        description: "",
        bugCategory: {
          name: "",
          description: "",
        },
      },
    },
  ];

  const mockProps = {
    name: "Main Category",
    description: "Main Category Description",
    subcategories: [
      {
        name: "Subcategory A",
        description: "Description A",
        samples: mockSamples,
      },
    ],
  };

  it("renders the main category name and description", () => {
    const wrapper = mount(BugCategory, {
      props: mockProps,
    });

    expect(wrapper.find("h2").text()).toBe("Main Category");
    expect(wrapper.find("p").text()).toBe("Main Category Description");
  });

  it("renders the correct list of subcategories using v-for", () => {
    const wrapper = mount(BugCategory, {
      props: mockProps,
    });

    const h3Elements = wrapper.findAll("h3");

    expect(h3Elements[0].text()).toBe("Subcategories");
    expect(h3Elements[1].text()).toBe("Subcategory A");
    expect(wrapper.find("section > section > p").text()).toBe("Description A");
  });

  it("renders the child BugCanvas components with the correct props", () => {
    const wrapper = mount(BugCategory, {
      props: mockProps,
    });

    const bugCanvases = wrapper.findAllComponents(BugCanvas);

    expect(bugCanvases).toHaveLength(2);

    expect(bugCanvases[0].props()).toEqual({
      size: "50",
      bugCount: 5,
      bugSvgUrl: "bug1.svg",
      label: "Ant",
    });

    expect(bugCanvases[1].props("label")).toBe("Beetle");
  });
});
