<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { globalState, nextMessage } from "../state/globalState.ts";

const isPaused = ref(false);
const isFading = ref(false);
let intervalId = null;
const ROTATION_SPEED = 5000;

const stepToNextMessage = () => {
  isFading.value = true;

  setTimeout(() => {
    nextMessage();
    isFading.value = false;
    if (globalState.finished) {
      stopTimer();
    }
  }, 400);
};

const startTimer = () => {
  if (!intervalId && !globalState.finished) {
    intervalId = setInterval(stepToNextMessage, ROTATION_SPEED);
  }
};

const stopTimer = () => {
  clearInterval(intervalId);
  intervalId = null;
};

const togglePlayPause = () => {
  isPaused.value = !isPaused.value;
  isPaused.value ? stopTimer() : startTimer();
};

onMounted(() => {
  nextMessage();
  startTimer();
});

onUnmounted(() => stopTimer());
</script>

<template>
  <div
    v-if="globalState.message"
    class="marquee"
    role="region"
    aria-label="Timed Announcements Feed"
  >
    <div
      class="marquee-content"
      :class="{ 'fade-out': isFading }"
      aria-live="polite"
      aria-atomic="true"
    >
      <span class="marquee-text">
        {{ globalState.message }}
      </span>
    </div>

    <button
      v-if="!globalState.finished"
      class="btn"
      :aria-pressed="isPaused"
      :aria-label="
        isPaused
          ? 'Resume announcement rotations'
          : 'Pause announcement rotations'
      "
      @click="togglePlayPause"
    >
      {{ isPaused ? "Play" : "Pause" }}
    </button>

    <slot v-if="globalState.finished"></slot>
  </div>
</template>

<style scoped>
.marquee {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1.5rem;
  @media screen and (orientation: landscape) {
    & {
      margin-top: 0;
      width: 50vw;
    }
  }
}
.marquee-content {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  text-shadow:
    0 4px 10px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.08);

  transition: opacity 0.4s ease-in-out;

  will-change: transform;
  transform: translate3d(0, 0, 0);
}
.fade-out {
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .marquee-content {
    transition: none;
  }
}
</style>
