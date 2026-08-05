<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <Transition name="toast-slide">
    <div
      v-if="show"
      class="toast-container"
      role="status"
      :aria-live="show ? 'polite' : 'off'"
    >
      <div class="toast-content">
        <span class="toast-icon" aria-hidden="true">⚠️</span>
        <p class="toast-text">Warning: A creepy spider just ate a butterfly!</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  z-index: 9999;

  background-color: #1a1a1a;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 8px;
  border-left: 4px solid #ffcc00;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toast-text {
  margin: 0;
  font-weight: 500;
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}

.toast-slide-enter-active {
  will-change: transform, opacity;
  transition:
    transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    opacity 0.3s ease;
}

.toast-slide-leave-active {
  will-change: transform, opacity;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
</style>
