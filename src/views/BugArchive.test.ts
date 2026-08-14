import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import BugArchive from "./BugArchive.vue";

const mockPush = vi.fn();

vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock("../data/Bugs.js", () => ({
  default: [
    { id: "bug-101", label: "Stink Bug" },
    { id: "bug-202", label: "Firefly" },
  ],
}));

vi.mock("../components/CatalogInterface.vue", () => ({
  default: {
    name: "CatalogInterface",
    template: '<div class="mock-interface"><slot /></div>',
  },
}));

describe("BugArchive.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders select choices correctly from the data file", () => {
    const wrapper = mount(BugArchive);
    const options = wrapper.findAll("select#sample-select option");

    expect(options).toHaveLength(2);
    expect(options[0].text()).toBe("Stink Bug");
    expect(options[0].attributes("value")).toBe("bug-101");
    expect(options[1].text()).toBe("Firefly");
  });

  it("keeps the load button disabled when no sample is selected", () => {
    const wrapper = mount(BugArchive);
    const button = wrapper.find("button.btn");

    expect(button.attributes()).toHaveProperty("disabled");
  });

  it("enables the button and navigates routes on selection and click", async () => {
    const wrapper = mount(BugArchive);
    const select = wrapper.find("select#sample-select");
    const button = wrapper.find("button.btn");

    await select.setValue("bug-202");

    expect(button.attributes("disabled")).toBeUndefined();

    await button.trigger("click");

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith({
      name: "BugArchiveBugBox",
      params: { sampleId: "bug-202" },
    });
  });
});
