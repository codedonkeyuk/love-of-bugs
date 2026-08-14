<script setup lang="tsx">
import { ref, watch, nextTick } from "vue";
import { RouterLink } from "vue-router";
import AnthonyHappy from "../assets/anthony-happy.png";
import AnthonyShocked from "../assets/anthony-shocked.png";
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
const assistantRef = ref<HTMLElement | null>(null);
const showMessage = ref<boolean>(true);

watch(selectedMessage, async () => {
  if (!showMessage.value) {
    showMessage.value = true;
  }
  const activeMessage = messages[selectedMessage.value];

  if (activeMessage && typeof activeMessage.trigger === "function") {
    activeMessage.trigger();
  }
  await nextTick();
  if (textRef.value) {
    textRef.value.focus();
  }
});

// Fix: Retain focus safely inside the container when a user closes the bubble
const handleClose = () => {
  showMessage.value = false;
  nextTick(() => {
    if (assistantRef.value) {
      assistantRef.value.focus();
    }
  });
};
</script>

<template>
  <!-- Fix: Added tabindex="-1" to catch focus, and aria-owns to fix reading order -->
  <div
    ref="assistantRef"
    class="assistant"
    role="region"
    aria-label="Assistant Dialogue"
    aria-owns="bubble-msg avatar-block"
    tabindex="-1"
  >
    <!-- Your Original HTML Layout Order Remains Completely Untouched -->
    <div
      id="bubble-msg"
      ref="textRef"
      class="assistant-bubble"
      v-if="showMessage"
      tabindex="-1"
      style="outline: none"
    >
      <button
        class="close-bubble"
        @click="handleClose"
        aria-label="Close message bubble"
      >
        <span aria-hidden="true">&times;</span>
      </button>

      <!-- Fix: Enable keyboard scrolling for users if text content overflows -->
      <div
        class="assistant-text"
        :tabindex="
          messages[selectedMessage].message.length > 200 ? '0' : undefined
        "
        role="document"
        aria-label="Message content"
      >
        {{ messages[selectedMessage].message }}
      </div>
    </div>

    <div id="avatar-block" class="assistant-avatar" role="presentation">
      <img
        :src="avatarEmotions[messages[selectedMessage].emotion]"
        alt="Anthony the ant avatar"
        class="assistant-avatar-image"
      />
      <!-- Fix: Added role="group" to bundle related navigation button controls together -->
      <div
        class="assistant-buttonbar"
        role="group"
        aria-label="Assistant actions"
      >
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
  </div>
</template>

<style>
/* YOUR ORIGINAL CSS BLOCKS LEFT 100% UNTOUCHED */
.assistant {
  position: fixed;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: flex-start;
  align-content: center;
  top: 0px;
  left: 0px;
  width: 80vw;
  border-radius: 8px;
  padding: 10px;
  gap: 10px;
  z-index: 1000;
}

.assistant-avatar {
  border-radius: 8px;
}

.assistant-avatar-image {
  width: 160px;
  height: auto;
}

.assistant-bubble:before {
  content: "";
  position: absolute;
  right: -24px;
  top: 15px;

  border-width: 12px 0 12px 24px;
  border-style: solid;
  border-color: transparent transparent transparent transparent;
  display: block;
  width: 0;
  height: 0;
  z-index: 1;
}

.assistant-bubble {
  position: relative;
  text-align: left;
  background-color: white;
  padding: 5px;

  width: 100%;
  height: auto;

  margin-left: 25px;
  margin-right: 10px;

  border-radius: 8px;
  flex-grow: 1;
}

.assistant-bubble:before {
  content: "";
  position: absolute;
  left: -24px;

  /* CENTERING FORMULA */
  top: 50%; /* Puts the top edge of the arrow at exactly 50% height */
  transform: translateY(
    -50%
  ); /* Pulls the arrow up by exactly half its own height */

  border-width: 12px 24px 12px 0;
  border-style: solid;
  border-color: transparent transparent transparent transparent;
  display: block;
  width: 0;
  height: 0;
  z-index: 1;
}

/* 2. Inner White Triangle (Centered Vertically) */
.assistant-bubble:after {
  content: "";
  position: absolute;
  left: -19px;

  /* CENTERING FORMULA */
  top: 50%; /* Puts the top edge of the arrow at exactly 50% height */
  transform: translateY(
    -50%
  ); /* Pulls the arrow up by exactly half its own height */

  border-width: 12px 20px 12px 0;
  border-style: solid;
  border-color: transparent #ffffff transparent transparent;
  display: block;
  width: 0;
  height: 0;
  z-index: 2;
}

.assistant-text {
  text-align: left;
  margin: 10px 30px 10px 10px;
  max-height: 150px;
  overflow-y: auto;
}

/* Fix: Ensure a clear focus indicator shows up if a keyboard user focuses on a long text block */
.assistant-text:focus-visible {
  outline: 2px dashed #3b82f6;
  outline-offset: 2px;
}

.close-bubble {
  position: absolute;
  top: 8px;
  right: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;

  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 50%;

  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  cursor: pointer;
  line-height: 1;

  transition:
    background-color 0.15s ease,
    transform 0.1s ease;
  z-index: 10;
}

.close-bubble:hover {
  background-color: #ff4d4d;
  color: #ffffff;
}

.close-bubble:active {
  transform: scale(0.92);
}

.close-bubble:focus-visible {
  outline: 3px solid #3b82f6;
  outline-offset: 2px;
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
  width: 100%;

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
    top: auto;
    left: 5px;
    right: 5px;
    bottom: 5px;
    transform: translateX(0%);
    width: auto;
    align-items: flex-end;
  }
  .assistant-content {
    width: 100%;
  }
  .assistant-avatar {
    width: 100px;
  }
  .assistant-avatar-image {
    width: 100px;
  }
  .assistant-bubble {
    text-align: left;
    margin-left: 25px;
    margin-right: 10px;
  }

  .assistant-avatar-image {
    width: 100px;
  }
}
@media screen and (orientation: landscape) and (max-height: 480px) {
  .assistant {
    top: auto;
    bottom: 0px;
    left: 0px;
    transform: translateX(0%);
    width: 60vw;
    flex-direction: row-reverse;
    align-items: flex-end;
  }

  .assistant-bubble {
    text-align: left;
    margin-left: 25px;
    margin-right: 10px;
  }

  .assistant-avatar {
    width: 100px;
  }

  .assistant-avatar-image {
    width: 100px;
  }
}
</style>
