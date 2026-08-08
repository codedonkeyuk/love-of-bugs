import { config } from "@vue/test-utils";

if (typeof window !== "undefined") {
  HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation(() => {
    return {
      fillRect: vi.fn(),
      clearRect: vi.fn(),
      getImageData: vi.fn(() => ({ data: new Uint8ClampedArray() })),
      putImageData: vi.fn(),
      createImageData: vi.fn(),
      setTransform: vi.fn(),
      drawImage: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
    };
  }) as any;
}

vi.stubGlobal("/logo-square.svg?url", "/logo-square.svg");

vi.mock("*.svg?url", () => ({
  default: "/logo-square.svg",
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

config.global.stubs = {
  "router-link": true,
  "router-view": true,
};
