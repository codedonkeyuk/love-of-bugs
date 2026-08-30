import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import CatalogInterface from "./CatalogInterface.vue";

describe("CatalogInterface.vue", () => {
  it("renders the core container and static heading", () => {
    const wrapper = mount(CatalogInterface);

    expect(wrapper.find(".catalog-interface-container").exists()).toBe(true);
    expect(wrapper.find(".catalog-interface-container-terminal").exists()).toBe(
      true,
    );

    expect(wrapper.find("h1").text()).toBe("Bug Box");
  });

  it('displays the fallback slot content ("Loading...") when no slot is provided', () => {
    const wrapper = mount(CatalogInterface);

    expect(wrapper.text()).toContain("Loading...");
  });

  it("renders custom HTML inside the default slot", () => {
    const customContent = '<div class="custom-item">Bug List Loaded!</div>';

    const wrapper = mount(CatalogInterface, {
      slots: {
        default: customContent,
      },
    });

    expect(wrapper.text()).not.toContain("Loading...");

    expect(wrapper.find(".custom-item").exists()).toBe(true);
    expect(wrapper.find(".custom-item").text()).toBe("Bug List Loaded!");
  });
});
