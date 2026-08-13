<script setup lang="tsx">
import CatalogInterface from "../components/CatalogInterface.vue";
</script>
<template>
  <div class="catalog-container">
    <CatalogInterface class="catalog-sheet" />
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

@keyframes slideOff {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
