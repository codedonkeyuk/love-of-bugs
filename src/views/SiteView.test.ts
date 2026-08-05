import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import SiteView from "./SiteView.vue";

describe("Coming Soon Landing Page", () => {
  it("renders the parent page container frame successfully", () => {
    const wrapper = shallowMount(SiteView);

    expect(wrapper.find(".page-container").exists()).toBe(true);
    expect(wrapper.find(".card").exists()).toBe(true);
  });

  it("displays the accurate headline message text", () => {
    const wrapper = shallowMount(SiteView);

    const heading = wrapper.find("h1");
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe("Site Does not exist, but it is coming soon");
  });

  it("contains the correct asset development text content blocks", () => {
    const wrapper = shallowMount(SiteView);

    const paragraphs = wrapper.findAll("p");
    expect(paragraphs.length).toBe(2);

    expect(paragraphs[0].text()).toContain(
      "It took 3 days to build the intro page",
    );
    expect(paragraphs[1].find("strong").text()).toBe(
      "Coming Soon: A SASS bug based nightmare.",
    );
  });

  it("matches the inline structural snapshot layout", () => {
    const wrapper = shallowMount(SiteView);

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class="page-container">
        <div class="card">
          <h1>Site Does not exist, but it is coming soon</h1>
          <p> It took 3 days to build the intro page, mainly because I chose to draw all the assets. I'l be rolling this out piece by piece over the next few days. </p>
          <p><strong>Coming Soon: A SASS bug based nightmare.</strong></p>
        </div>
      </div>"
    `);
  });
});
