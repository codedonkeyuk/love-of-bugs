<script setup lang="tsx">
import { ref, watch, nextTick } from "vue";
import { RouterLink } from "vue-router";
import AnthonyHappy from "../assets/anthony-happy.png";
import AnthonyShocked from "../assets/anthony-shocked.png";
import type { AssistantMessage } from "../types";
import ButtonBar from "./ButtonBar.vue";

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
  <div
    ref="assistantRef"
    class="assistant"
    role="region"
    aria-label="Assistant Dialogue"
    aria-owns="bubble-msg avatar-block"
    tabindex="-1"
  >
    <div class="assistant-cartoon">
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
      </div>
    </div>
    <ButtonBar>
      <RouterLink
        v-for="button in messages[selectedMessage].buttons"
        :key="button.name"
        class="btn assitantBtn"
        :to="button.location"
      >
        {{ button.name }}
      </RouterLink>
      <button
        class="btn assitantBtn"
        @click="selectedMessage++"
        v-if="selectedMessage < messages.length - 1"
        :aria-label="`Next message. Step ${selectedMessage + 1} of ${messages.length}`"
      >
        Next
      </button>
    </ButtonBar>
  </div>
</template>

<style>
.assistant {
  position: fixed;
  display: flex;
  flex-direction: column;
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

.assistant-cartoon {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: flex-start;
  align-content: center;
}

.assitantBtn {
  min-width: 160px;
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
  top: 50%;
  transform: translateY(-50%);

  border-width: 12px 24px 12px 0;
  border-style: solid;
  border-color: transparent transparent transparent transparent;
  display: block;
  width: 0;
  height: 0;
  z-index: 1;
}

.assistant-bubble:after {
  content: "";
  position: absolute;
  left: -19px;
  top: 50%;
  transform: translateY(-50%);
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

  .assistant-cartoon {
    align-items: flex-end;
  }
}
@media screen and (orientation: landscape) and (max-height: 480px) {
  .assistant-avatar-image {
    width: 100px;
  }
  .assitantBtn {
    min-width: 100px;
  }
}
</style>
