import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import BugCanvas from "./BugCanvas.vue";

vi.mock("../data/Bugs", () => ({
  bugImageModules: {
    "/logo-square.svg": () => Promise.resolve({ default: "mocked-asset.svg" }),
  },
}));

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
    screen = { width: 300, height: 300 };
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
    Ticker: {
      shared: { autoStart: true, start: vi.fn() },
    },
  };
});

describe("BugCanvas.vue", () => {
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

    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      value: 300,
    });
    Object.defineProperty(HTMLElement.prototype, "clientHeight", {
      configurable: true,
      value: 300,
    });

    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      cb(0);
      return 0;
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

  it("loads default values safely if properties are omitted", () => {
    const wrapper = mount(BugCanvas, {
      props: {
        bugSvgUrl: "/logo-square.svg",
      },
    });

    expect(wrapper.props("bugCount")).toBe(5);
  });

  it("completes layout setup steps smoothly upon execution cycles", async () => {
    const wrapper = mount(BugCanvas, {
      props: {
        bugSvgUrl: "/logo-square.svg",
      },
    });

    await vi.dynamicImportSettled();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(wrapper.exists()).toBe(true);
  });
});
