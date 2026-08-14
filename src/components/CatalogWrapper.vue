<script setup lang="ts">
import { ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import CatalogInterface from "../components/CatalogInterface.vue";

const isExiting = ref(false);

onBeforeRouteLeave((_to, _from, next) => {
  isExiting.value = true;

  setTimeout(() => {
    next();
  }, 4000);
});
</script>

<template>
  <div class="catalog-container">
    <CatalogInterface
      class="catalog-sheet"
      :class="{ 'slide-on-exit': isExiting }"
    />
    <slot />
  </div>
</template>

<style scoped>
.catalog-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.catalog-sheet {
  pointer-events: none;
  animation: slideOff 4s cubic-bezier(0.77, 0, 0.175, 1) forwards;
}
.catalog-sheet.slide-on-exit {
  animation: slideOn 4s cubic-bezier(0.77, 0, 0.175, 1) forwards;
}

@keyframes slideOff {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes slideOn {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
