import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import BugBox from "./BugBox.vue";
import BugCanvas from "../components/BugCanvas.vue";

vi.mock("../data/Bugs.js", () => ({
  default: [
    {
      id: "mock-ant",
      label: "Fire Ant",
      size: 45,
      bugCount: 15,
      src: "ant.svg",
      subcategory: {
        name: "Formicidae",
        description: "Stinging social insects.",
        bugCategory: {
          name: "Hymenoptera",
          description: "Membrane-winged insect family.",
        },
      },
    },
  ],
}));

vi.mock("../components/CatalogWrapper.vue", () => ({
  default: {
    name: "CatalogWrapper",
    template: '<div class="mock-wrapper"><slot /></div>',
  },
}));

vi.mock("../components/BugCanvas.vue", () => ({
  default: {
    name: "BugCanvas",
    template: '<div class="mock-canvas"></div>',
    props: ["size", "bugCount", "bugSvgUrl", "label"],
  },
}));

vi.mock("vue-router", () => ({
  RouterLink: {
    name: "RouterLink",
    template: '<a :href="to"><slot /></a>',
    props: ["to"],
  },
}));

describe("BugBox.vue", () => {
  it("renders bug details, nested properties, and nav links with a valid sampleId", () => {
    const wrapper = mount(BugBox, {
      props: {
        sampleId: "mock-ant",
      },
    });

    expect(wrapper.find("h1").text()).toBe("Fire Ant");

    const paragraphs = wrapper.findAll("p");
    expect(paragraphs[0].text()).toContain(
      "Fire Ant belongs to the Formicidae, Stinging social insects.",
    );
    expect(paragraphs[1].text()).toContain(
      "Formicidae belongs to Hymenoptera. Membrane-winged insect family.",
    );

    const returnLink = wrapper.findComponent({ name: "RouterLink" });
    expect(returnLink.exists()).toBe(true);
    expect(returnLink.props("to")).toBe("/bug-archive");
  });

  it("passes mapped bug object configurations successfully to BugCanvas", () => {
    const wrapper = mount(BugBox, {
      props: {
        sampleId: "mock-ant",
      },
    });

    const canvasComponent = wrapper.findComponent(BugCanvas);
    expect(canvasComponent.exists()).toBe(true);

    expect(canvasComponent.props()).toEqual({
      size: 45,
      bugCount: 15,
      bugSvgUrl: "ant.svg",
      label: "Fire Ant",
    });
  });

  it("throws a critical runtime script setup configuration error if bug ID is invalid", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const renderInvalidComponent = () => {
      mount(BugBox, {
        props: {
          sampleId: "unknown-id-parameter",
        },
      });
    };

    expect(renderInvalidComponent).toThrowError(
      'Critical Error: Bug with ID "unknown-id-parameter" does not exist.',
    );

    consoleSpy.mockRestore();
  });
});
