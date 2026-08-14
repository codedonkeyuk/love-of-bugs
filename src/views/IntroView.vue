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
    buttons: [{ name: "Catalog", location: "/catalog-overview" }],
  },
];
</script>

<template>
  <div class="container">
    <AccessibleMarquee>
      <Assistant :messages="assistantMessages" />
    </AccessibleMarquee>
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
/* Ensure the page wrapper covers the viewport and clips the curtain */
.site-page-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #ffffff; /* Your page background color */
}

/* THE CURTAIN: A solid black box built directly onto the page wrapper */
.site-page-container:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000; /* Choose your curtain color */
  z-index: 99;
}

/* ==========================================
   THE SLIDE-AWAY TRANSITION
   ========================================== */

/* Triggers when the page appears on screen */
.reveal-page-enter-active:before {
  transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
}

/* Starting State: The black box is fully covering the text */
.reveal-page-enter-from:before {
  transform: translateX(0);
}

/* Ending State: The black box slides completely off-screen to the left */
.reveal-page-enter-to:before {
  transform: translateX(-100%);
}
</style>
