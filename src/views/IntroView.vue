<script setup lang="tsx">
import { ref } from "vue";
import FlowersMarquee from "../components/FlowersMarquee.vue";
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
      "oh thats a furry spider, he is an ugly sod, look at those black eyes! Don't worry we only specialise in bugs not arachnids. So lets go!",
    emotion: "shocked",
    trigger: () => {
      isNear.value = true;
    },
    buttons: [{ name: "Bug Archive", location: "/bug-archive" }],
  },
];
</script>

<template>
  <div class="container">
    <FlowersMarquee>
      <Assistant :messages="assistantMessages" />
    </FlowersMarquee>
    <Flowers :isNear="isNear" />
    <DropSpider :isNear="isNear" />
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (orientation: landscape) {
    & {
      flex-direction: row;
      justify-content: center;
    }
  }
}
.site-page-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #ffffff;
}

.site-page-container:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  z-index: 99;
}

.reveal-page-enter-active:before {
  transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
}

.reveal-page-enter-from:before {
  transform: translateX(0);
}

.reveal-page-enter-to:before {
  transform: translateX(-100%);
}
</style>
