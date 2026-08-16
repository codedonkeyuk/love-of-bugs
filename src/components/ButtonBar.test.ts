import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ButtonBar from "./ButtonBar.vue";

describe("ButtonBar.vue", () => {
  it("renders with default left alignment class", () => {
    const wrapper = mount(ButtonBar);

    expect(wrapper.classes()).toContain("button-bar");
    expect(wrapper.classes()).toContain("align-left");
  });

  it("renders with align-right class when align prop is set to right", () => {
    const wrapper = mount(ButtonBar, {
      props: {
        align: "right",
      },
    });

    expect(wrapper.classes()).toContain("align-right");
    expect(wrapper.classes()).not.toContain("align-left");
  });

  it("renders slot content correctly", () => {
    const wrapper = mount(ButtonBar, {
      slots: {
        default: '<button class="test-btn">Click me</button>',
      },
    });

    const button = wrapper.find(".test-btn");
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("Click me");
  });

  it("validates the align prop values correctly", () => {
    const validator = ButtonBar.props.align.validator;

    expect(validator("left")).toBe(true);
    expect(validator("right")).toBe(true);
    expect(validator("center")).toBe(false);
  });
});
