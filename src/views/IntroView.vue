<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import AccessibleMarquee from "../components/AccessibleMarquee.vue";
import SpiderToast from "../components/SpiderToast.vue";
import DropSpider from "../components/DropSpider.vue";
import Flowers from "../components/Flowers.vue";

const siteLink = ref(null);
const proximityThreshold = 60;

const isNear = ref(false);
const spiderTriggered = ref(false);

const checkProximity = (event) => {
  if (!siteLink.value || spiderTriggered.value) return;

  const element = siteLink.value.$el || siteLink.value;
  if (typeof element.getBoundingClientRect !== "function") return;

  const rect = element.getBoundingClientRect();
  const linkX = rect.left + rect.width / 2;
  const linkY = rect.top + rect.height / 2;

  const distanceX = event.clientX - linkX;
  const distanceY = event.clientY - linkY;
  const totalDistance = Math.sqrt(
    distanceX * distanceX + distanceY * distanceY,
  );

  if (totalDistance <= proximityThreshold) {
    triggerSpider();
  }
};

const handleLinkClick = (event) => {
  if (!spiderTriggered.value) {
    event.preventDefault();
    triggerSpider();
  }
};

const triggerSpider = () => {
  isNear.value = true;
  spiderTriggered.value = true;

  window.removeEventListener("mousemove", checkProximity);
};

onMounted(() => {
  window.addEventListener("mousemove", checkProximity);

  if (siteLink.value) {
    const element = siteLink.value.$el || siteLink.value;
    element.addEventListener("click", handleLinkClick);
  }
});

onUnmounted(() => {
  window.removeEventListener("mousemove", checkProximity);
  if (siteLink.value) {
    const element = siteLink.value.$el || siteLink.value;
    element.removeEventListener("click", handleLinkClick);
  }
});
</script>
<template>
  <div class="container">
    <AccessibleMarquee>
      <router-link ref="siteLink" class="btn" to="/site"
        >Go to Site</router-link
      >
    </AccessibleMarquee>
    <Flowers :isNear="isNear" />
  </div>
  <DropSpider :isNear="isNear" />
  <SpiderToast :show="isNear" />
</template>
<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 5vw;
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
