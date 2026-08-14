import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import IntroView from "./IntroView.vue";
import Assistant from "../components/Assistant.vue";
import Flowers from "../components/Flowers.vue";
import DropSpider from "../components/DropSpider.vue";

vi.mock("../components/FlowersMarquee.vue", () => ({
  default: {
    name: "FlowersMarquee",
    template: '<div class="mock-marquee"><slot /></div>',
  },
}));

vi.mock("../components/Assistant.vue", () => ({
  default: {
    name: "Assistant",
    template: '<div class="mock-assistant"></div>',
    props: ["messages"],
  },
}));

vi.mock("../components/Flowers.vue", () => ({
  default: {
    name: "Flowers",
    template: '<div class="mock-flowers"></div>',
    props: ["isNear"],
  },
}));

vi.mock("../components/DropSpider.vue", () => ({
  default: {
    name: "DropSpider",
    template: '<div class="mock-spider"></div>',
    props: ["isNear"],
  },
}));

describe("IntroView.vue", () => {
  it("correctly maps and forwards assistant message arrays to the Assistant component", () => {
    const wrapper = mount(IntroView);
    const assistantComp = wrapper.findComponent(Assistant);

    expect(assistantComp.exists()).toBe(true);

    const passedMessages = assistantComp.props("messages");

    expect(passedMessages).toHaveLength(3);

    expect(passedMessages[0].message).toContain(
      "Hi, I'm Anthony your virtual guide.",
    );
    expect(passedMessages[0].emotion).toBe("happy");

    expect(passedMessages[1].message).toContain(
      "We do not appologise for wasting your time.",
    );
    expect(passedMessages[1].emotion).toBe("happy");

    expect(passedMessages[2].message).toContain("oh thats a furry spider");
    expect(passedMessages[2].emotion).toBe("shocked");
    expect(passedMessages[2].buttons).toEqual([
      { name: "Bug Archive", location: "/bug-archive" },
    ]);
  });

  it("initialises child component coordinates with isNear as false", () => {
    const wrapper = mount(IntroView);
    const flowersComp = wrapper.findComponent(Flowers);
    const spiderComp = wrapper.findComponent(DropSpider);

    expect(flowersComp.props("isNear")).toBe(false);
    expect(spiderComp.props("isNear")).toBe(false);
  });

  it("triggers the reactive isNear change and updates sibling props when running message trigger scripts", async () => {
    const wrapper = mount(IntroView);
    const assistantComp = wrapper.findComponent(Assistant);
    const flowersComp = wrapper.findComponent(Flowers);
    const spiderComp = wrapper.findComponent(DropSpider);

    const passedMessages = assistantComp.props("messages");
    const triggerAction = passedMessages[2].trigger;

    expect(triggerAction).toBeTypeOf("function");

    triggerAction?.();

    await wrapper.vm.$nextTick();

    expect(flowersComp.props("isNear")).toBe(true);
    expect(spiderComp.props("isNear")).toBe(true);
  });
});
