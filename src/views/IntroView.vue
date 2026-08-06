<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import AccessibleMarquee from "../components/AccessibleMarquee.vue";
import SpiderToast from "../components/SpiderToast.vue";
import DropSpider from "../components/DropSpider.vue";
import Flowers from "../components/Flowers.vue";

const router = useRouter();
const siteLink = ref(null);
const proximityThreshold = 60;

const isNear = ref(false);
const spiderTriggered = ref(false);
const canNavigate = ref(false);

const checkProximity = (event) => {
  if (!siteLink.value || spiderTriggered.value) return;

  const element = siteLink.value?.$el || siteLink.value;
  if (!element || typeof element.getBoundingClientRect !== "function") return;

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
  event.preventDefault();

  if (!spiderTriggered.value) {
    triggerSpider();
  } else if (canNavigate.value) {
    router.push("/site");
  }
};

const triggerSpider = () => {
  isNear.value = true;
  spiderTriggered.value = true;
  window.removeEventListener("mousemove", checkProximity);

  setTimeout(() => {
    canNavigate.value = true;
  }, 800);
};

onMounted(() => {
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
  if (!isTouchDevice) {
    window.addEventListener("mousemove", checkProximity);
  }
});

onUnmounted(() => {
  window.removeEventListener("mousemove", checkProximity);
});
</script>

<template>
  <div class="container">
    <AccessibleMarquee>
      <a ref="siteLink" class="btn" href="/site" @click="handleLinkClick">
        Go to Site
      </a>
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
