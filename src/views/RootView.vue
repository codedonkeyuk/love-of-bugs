<script setup lang="tsx">
import Assistant from "../components/Assistant.vue";
import type { AssistantMessage } from "../types.js";

const assistantMessages: AssistantMessage[] = [
  {
    message:
      "Hi there, I'm Anthony the digital assistant. I'll be guiding you through our digital catalog of bugs.",
    emotion: "happy",
  },
  {
    message:
      "Before we begin, we will waste you time by showing you a pointless animation. ",
    emotion: "happy",
    buttons: [{ name: "Load Animmation", location: "/intro" }],
  },
];
</script>
<template>
  <div class="container">
    <div class="site-title">
      <p>
        <span class="welcome">Welcome to the </span>
        <span class="title">Love Of Bugs</span>
      </p>
    </div>
  </div>
  <Assistant :messages="assistantMessages" />
</template>
<style>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}
.site-title {
  max-width: 80vw;
  margin-top: 10vh;
  font-size: 100px;
  text-align: center;
}
.welcome {
  display: inline-block;
  width: 100%;
}

.title {
  display: inline-block;
  color: white;
}
</style>
