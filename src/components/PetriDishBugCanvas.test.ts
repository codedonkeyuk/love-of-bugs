import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import PetriDishBugCanvas from "./PetriDishBugCanvas.vue";

vi.mock("pixi.js", () => {
  class MockTexture {
    width = 600;
    height = 111;
    source = {};
  }

  class MockRectangle {}

  class MockAnimatedSprite {
    anchor = { set: vi.fn() };
    x = 0;
    y = 0;
    width = 150;
    height = 111;
    rotation = 0;
    eventMode = "none";
    cursor = "auto";
    animationSpeed = 0.15;
    on = vi.fn();
    play = vi.fn();
    stop = vi.fn();
    gotoAndPlay = vi.fn();
    gotoAndStop = vi.fn();
  }

  class MockApplication {
    canvas = document.createElement("canvas");
    stage = {
      addChild: vi.fn(),
      eventMode: "static",
      hitArea: {},
      on: vi.fn(),
    };
    ticker = {
      add: vi.fn(),
      remove: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
    };
    renderer = {
      resize: vi.fn(),
    };
    destroy = vi.fn();
    init = vi.fn().mockResolvedValue(true);
  }

  return {
    Application: MockApplication,
    AnimatedSprite: MockAnimatedSprite,
    Texture: vi.fn().mockImplementation(() => new MockTexture()),
    Rectangle: MockRectangle,
    Assets: {
      load: vi.fn().mockResolvedValue(new MockTexture()),
    },
  };
});

describe("PetriDishBugCanvas.vue", () => {
  let mockRectSpy: any;

  beforeEach(() => {
    mockRectSpy = vi
      .spyOn(Element.prototype, "getBoundingClientRect")
      .mockImplementation(() => {
        return {
          width: 300,
          height: 300,
          top: 0,
          left: 0,
          bottom: 300,
          right: 300,
          x: 0,
          y: 0,
          toJSON: () => {},
        } as DOMRect;
      });

    const mockIntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    vi.stubGlobal("IntersectionObserver", mockIntersectionObserver);
  });

  afterEach(() => {
    vi.clearAllMocks();
    mockRectSpy.mockRestore();
    vi.unstubAllGlobals();
  });

  it("respects custom size properties and renders the container elements properly", () => {
    const wrapper = mount(PetriDishBugCanvas, {
      props: {
        size: "300px",
        bugSvgUrl: "/logo-square.svg",
      },
    });

    const rim = wrapper.find(".petri-dish-rim");
    expect(rim.exists()).toBe(true);
  });

  it("loads default values safely if properties are omitted", () => {
    const wrapper = mount(PetriDishBugCanvas, {
      props: {
        bugSvgUrl: "/logo-square.svg",
      },
    });

    expect(wrapper.props("bugCount")).toBe(5);
  });

  it("completes layout setup steps smoothly upon execution cycles", () => {
    const wrapper = mount(PetriDishBugCanvas, {
      props: {
        bugSvgUrl: "/logo-square.svg",
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it("it outpusts the label name", () => {
    const wrapper = mount(PetriDishBugCanvas, {
      props: {
        bugSvgUrl: "/logo-square.svg",
        label: "I am a label",
      },
    });

    expect(wrapper.find(".sample-label").text()).toBe("I am a label");
  });
});
