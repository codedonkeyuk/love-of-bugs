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
      "Thank goodness thats over, oh the HR manager is giving me daggers. I hope you enjoyed our unessessary corperate brain washing (wink, wink). I'm sure you apprcieated not being able to skip. Your time costs us nothing!",
    emotion: "happy",
    buttons: [],
  },
  {
    message:
      "oh thats a furry spider, that should not be there. Don't worry we only specialiase in bugs not arachnids. Hes broke in for a snack. Select view catalog to continue.",
    emotion: "shocked",
    trigger: () => {
      isNear.value = true;
    },
    buttons: [{ name: "View Catalog", location: "/site" }],
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
  width: 100%;
  height: 100vh;
  @media screen and (orientation: landscape) {
    & {
      flex-direction: row;
      justify-content: center;
    }
  }
}
</style>
