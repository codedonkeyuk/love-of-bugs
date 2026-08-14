import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import FlowersComponent from "./FlowersMarquee.vue";

const mocks = await vi.hoisted(async () => {
  const { reactive } = await import("vue");

  return {
    reactiveState: reactive({
      message: "Initial Announcement",
      finished: false,
    }),
    mockNextMessage: vi.fn(),
  };
});

vi.mock("../state/globalState.ts", () => ({
  globalState: mocks.reactiveState,
  nextMessage: () => mocks.mockNextMessage(),
}));

describe("Marquee Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mocks.reactiveState.message = "Initial Announcement";
    mocks.reactiveState.finished = false;
    mocks.mockNextMessage.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the initial message on mount and calls nextMessage", () => {
    const wrapper = mount(FlowersComponent);
    expect(mocks.mockNextMessage).toHaveBeenCalledTimes(1);
    expect(wrapper.find(".marquee-text").text()).toBe("Initial Announcement");
  });

  it("advances messages on a 5000ms timer cycle with animations", async () => {
    const wrapper = mount(FlowersComponent);
    await vi.advanceTimersByTimeAsync(5000);
    expect(wrapper.find(".marquee-content").classes()).toContain("fade-out");

    await vi.advanceTimersByTimeAsync(400);
    expect(mocks.mockNextMessage).toHaveBeenCalledTimes(2);
    expect(wrapper.find(".marquee-content").classes()).not.toContain(
      "fade-out",
    );
  });

  it("toggles the timer interval and updates text layout on button click", async () => {
    const wrapper = mount(FlowersComponent);
    const button = wrapper.find("button.btn");

    expect(button.text()).toBe("Pause");

    await button.trigger("click");
    expect(button.text()).toBe("Play");
    expect(button.attributes("aria-pressed")).toBe("true");

    await vi.advanceTimersByTimeAsync(5400);
    expect(mocks.mockNextMessage).toHaveBeenCalledTimes(1);

    await button.trigger("click");
    expect(button.text()).toBe("Pause");
  });

  it("stops rotating and unmounts button frame when finished state is reached", async () => {
    const wrapper = mount(FlowersComponent, {
      slots: {
        default: '<div class="slotted-content">Complete!</div>',
      },
    });

    await vi.advanceTimersByTimeAsync(5000);

    mocks.reactiveState.finished = true;
    await wrapper.vm.$nextTick();
    await vi.advanceTimersByTimeAsync(400);

    expect(wrapper.find("button.btn").exists()).toBe(false);
    expect(wrapper.find(".slotted-content").exists()).toBe(true);
  });
});
