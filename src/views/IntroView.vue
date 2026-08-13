<script setup lang="tsx">
import { ref } from "vue";
import AccessibleMarquee from "../components/AccessibleMarquee.vue";
import DropSpider from "../components/DropSpider.vue";
import Flowers from "../components/Flowers.vue";
import Assistant from "../components/Assistant.vue";
import type { AssistantMessage } from "../types.js";

let isNear = ref(false);

const assistantMessages: AssistantMessage[] = [
  {
    message:
      "Hi, I'm Anthony your virtual guide. I hope you enjoyed our intoduction.",
    emotion: "happy",
    buttons: [],
  },
  {
    message:
      "We do not appologise for wasting your time. This is a free service and as such your time costs us nothing!",
    emotion: "happy",
    buttons: [],
  },
  {
    message:
      "oh thats a furry spider, hes an ugly bugger look at those eyes! Don't worry we only specialiase in bugs not arachnids. Hes broke in for a snack. Select view catalog to continue.",
    emotion: "shocked",
    trigger: () => {
      isNear.value = true;
    },
    buttons: [{ name: "Catalog", location: "/site" }],
  },
];
</script>

<template>
  <div class="container">
    <AccessibleMarquee>
      <Assistant :messages="assistantMessages" />
    </AccessibleMarquee>
    <Flowers :isNear="isNear" />
  </div>
  <DropSpider :isNear="isNear" />
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media screen and (orientation: landscape) {
    & {
      flex-direction: row;
      justify-content: center;
    }
  }
}
</style>
