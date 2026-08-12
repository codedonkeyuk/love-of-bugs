<script setup lang="tsx">
import { ref, watch, nextTick } from "vue";
import { RouterLink } from "vue-router";
import AnthonyHappy from "/anthony-happy.png?url";
import AnthonyShocked from "/anthony-shocked.png?url";
import type { AssistantMessage } from "../types";

const avatarEmotions = {
  happy: AnthonyHappy,
  shocked: AnthonyShocked,
};

interface Props {
  messages: AssistantMessage[];
}

let selectedMessage = ref(0);

const { messages } = defineProps<Props>();

const textRef = ref<HTMLElement | null>(null);

watch(selectedMessage, async () => {
  const activeMessage = messages[selectedMessage.value];

  if (activeMessage && typeof activeMessage.trigger === "function") {
    activeMessage.trigger();
  }
  await nextTick();
  if (textRef.value) {
    textRef.value.focus();
  }
});
</script>

<template>
  <div class="assistant" role="region" aria-label="Assistant Dialogue">
    <div class="assistant-content">
      <div class="assistant-avatar" role="presentation">
        <img
          :src="avatarEmotions[messages[selectedMessage].emotion]"
          alt="Anthony the ant avatar"
          class="assistant-avatar"
        />
      </div>
      <div
        ref="textRef"
        class="assistant-text"
        aria-live="polite"
        aria-atomic="true"
        tabindex="-1"
        style="outline: none"
      >
        {{ messages[selectedMessage].message }}
      </div>
    </div>
    <div class="assistant-buttonbar">
      <RouterLink
        v-for="button in messages[selectedMessage].buttons"
        :key="button.name"
        class="assistant__btn"
        :to="button.location"
      >
        {{ button.name }}
      </RouterLink>
      <button
        class="assistant__btn"
        @click="selectedMessage++"
        v-if="selectedMessage < messages.length - 1"
        :aria-label="`Next message. Step ${selectedMessage + 1} of ${messages.length}`"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style>
.assistant {
  background-color: #00000095;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
  bottom: 5vh;
  left: 50%;
  transform: translateX(-50%);
  width: 60vw;
  border-radius: 8px;
  padding: 10px;
  row-gap: 10px;
  z-index: 1000;
}
.assistant-content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
  width: 100%;
}
.assistant-avatar {
  border-radius: 8px;
}
.assistant-text {
  background-color: white;
  padding: 5px;
  border: 1px white solid;
  width: 100%;
  height: 150px;
  margin-left: 10px;
  border-radius: 8px;
  flex-grow: 1;
}
.assistant-buttonbar {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 20px 20px;
}
.assistant__btn {
  display: inline-block;
  box-sizing: border-box;

  appearance: none;
  border: none;
  text-decoration: none;
  background: none;

  font-family: sans-serif;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  line-height: 1;
  margin: 0px 10px 10px 0px;

  background-color: var(--button-background);
  color: var(--button-color);
  padding: 0.75rem 1.5rem;
  border-radius: 6px;

  cursor: pointer;
  user-select: none;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;

  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.assistant__btn:hover {
  background-color: var(--button-background-hover);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.assistant__btn:active {
  transform: scale(0.98);
  box-shadow: none;
}

.assistant__btn:focus-visible {
  outline: 3px solid var(--button-background-focus);
  outline-offset: 2px;
}

@media (max-width: 768px) {
  .assistant {
    left: 5px;
    right: 5px;
    bottom: 5px;
    transform: translateX(0%);
    width: auto;
  }
  .assistant-content {
    width: 100%;
  }
}
</style>
