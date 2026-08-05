import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SpiderToast from "./SpiderToast.vue";

describe("SpiderToast Component", () => {
  it("hides the layout entirely when show prop is false", () => {
    const wrapper = mount(SpiderToast, {
      props: { show: false },
      global: {
        stubs: {
          Transition: false,
        },
      },
    });

    expect(wrapper.find(".toast-container").exists()).toBe(false);
  });

  it("renders the notification window and static text correctly when show prop is true", () => {
    const wrapper = mount(SpiderToast, {
      props: { show: true },
      global: {
        stubs: { Transition: false },
      },
    });

    const container = wrapper.find(".toast-container");
    expect(container.exists()).toBe(true);

    expect(container.attributes("role")).toBe("status");
    expect(container.attributes("aria-live")).toBe("polite");

    expect(wrapper.find(".toast-text").text()).toBe(
      "Warning: A creepy spider just ate a butterfly!",
    );
  });

  it("handles reactive changes to the show state dynamically", async () => {
    const wrapper = mount(SpiderToast, {
      props: { show: false },
      global: {
        stubs: { Transition: false },
      },
    });

    expect(wrapper.find(".toast-container").exists()).toBe(false);

    await wrapper.setProps({ show: true });
    expect(wrapper.find(".toast-container").exists()).toBe(true);
    expect(wrapper.find(".toast-container").attributes("aria-live")).toBe(
      "polite",
    );

    await wrapper.setProps({ show: false });
    expect(wrapper.find(".toast-container").exists()).toBe(false);
  });
});
