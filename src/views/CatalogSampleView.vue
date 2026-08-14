<script setup lang="ts">
import { RouterLink } from "vue-router";
import CatalogWrapper from "../components/CatalogWrapper.vue";
import BugCanvas from "../components/BugCanvas.vue";
import Bugs from "../data/Bugs.js";

const props = defineProps<{
  sampleId: string;
}>();

const targetBug = Bugs.find((bug) => bug.id === props.sampleId);

if (!targetBug) {
  throw new Error(
    `Critical Error: Bug with ID "${props.sampleId}" does not exist.`,
  );
}
</script>
<template>
  <CatalogWrapper>
    <div class="bug-container">
      <div class="bug-details-container">
        <div class="bug-details">
          <h1>{{ targetBug.label }}</h1>
          <p>
            The {{ targetBug.label }} belongs to the
            {{ targetBug.subcategory.name }},
            {{ targetBug.subcategory.description }}
          </p>
          <p>
            {{ targetBug.subcategory.name }} belongs to
            {{ targetBug.subcategory.bugCategory.name }}.
            {{ targetBug.subcategory.bugCategory.description }}
          </p>
          <RouterLink class="btn return-button" to="/catalog-overview">
            Return to Menu
          </RouterLink>
        </div>
      </div>
      <BugCanvas
        :size="targetBug.size"
        :bugCount="targetBug.bugCount"
        :bugSvgUrl="targetBug.src"
        :label="targetBug.label"
      />
    </div>
  </CatalogWrapper>
</template>
<style>
.bug-container {
  width: 100vw;
  height: 100vh;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  border-width: 72px 56px 55px 32px;
  border-style: solid;
  border-image-source: url("../assets/bug-background.svg");
  border-image-slice: 6.8% 5% 2.5% 2.8% fill;
  border-image-repeat: stretch;
}

.bug-details-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.bug-details {
  background-color: white;
  padding: 10px;
  width: 70vw;
}

.return-button {
  position: fixed;
  z-index: 1001;
  bottom: 5px;
  right: 31px;
}
</style>
