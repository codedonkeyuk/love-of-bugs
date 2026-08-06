import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import IntroView from "./IntroView.vue";

vi.mock("../components/AccessibleMarquee.vue", () => ({
  default: { template: "<div><slot /></div>" },
}));
vi.mock("../components/SpiderToast.vue", () => ({
  default: { template: "<div class='mocked-toast'></div>", props: ["show"] },
}));
vi.mock("../components/DropSpider.vue", () => ({
  default: { template: "<div class='mocked-spider'></div>", props: ["isNear"] },
}));
vi.mock("../components/Flowers.vue", () => ({
  default: {
    template: "<div class='mocked-flowers'></div>",
    props: ["isNear"],
  },
}));

const mockPush = vi.fn();
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Scare Layout Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockPush.mockClear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders child components with accurate initial property bindings", () => {
    const wrapper = mount(IntroView);

    expect(wrapper.vm.isNear).toBe(false);
    expect(wrapper.vm.spiderTriggered).toBe(false);
  });

  it("intercepts the first click, blocks navigation, and drops the spider", async () => {
    const wrapper = mount(IntroView);
    const link = wrapper.find(".btn");

    const clickEvent = {
      preventDefault: vi.fn(),
    } as unknown as MouseEvent;

    await link.trigger("click", clickEvent);

    expect(clickEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.isNear).toBe(true);
    expect(wrapper.vm.spiderTriggered).toBe(true);
  });

  it("does not block navigation on the second click after the spider has dropped and time-lock clears", async () => {
    const wrapper = mount(IntroView);
    const link = wrapper.find(".btn");

    await link.trigger("click");
    expect(wrapper.vm.spiderTriggered).toBe(true);

    vi.advanceTimersByTime(800);

    const secondClickEvent = {
      preventDefault: vi.fn(),
    } as unknown as MouseEvent;

    await link.trigger("click", secondClickEvent);

    expect(secondClickEvent.preventDefault).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/site");
  });

  it("triggers the jump scare when the mouse moves inside the geometric proximity threshold", async () => {
    const wrapper = mount(IntroView);

    const mockElement = wrapper.find(".btn").element;
    mockElement.getBoundingClientRect = vi.fn().mockReturnValue({
      left: 100,
      top: 100,
      width: 50,
      height: 20,
    });

    expect(wrapper.vm.spiderTriggered).toBe(false);

    const mouseMoveEvent = new MouseEvent("mousemove", {
      clientX: 130,
      clientY: 115,
    });
    window.dispatchEvent(mouseMoveEvent);

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isNear).toBe(true);
    expect(wrapper.vm.spiderTriggered).toBe(true);
  });

  it("cleans up event listeners when the container unmounts from the DOM", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const wrapper = mount(IntroView);

    wrapper.unmount();

    expect(removeSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
  });
});
