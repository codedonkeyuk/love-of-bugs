<script setup lang="tsx">
import { ref } from "vue";
import { useRouter } from "vue-router";
import CatalogInterface from "../components/CatalogInterface.vue";
import Bugs from "../data/Bugs.js";

const router = useRouter();

const loadSample = () => {
  if (selectSample.value) {
    router.push({
      name: "CatalogSampleView",
      params: { sampleId: selectSample.value },
    });
  }
};

const selectSample = ref(null);
</script>
<template>
  <CatalogInterface>
    <div class="sample-form-container">
      <label for="sample-select" class="select-label">Select sample:</label>

      <select
        id="sample-select"
        v-model="selectSample"
        size="5"
        class="sample-select-list"
      >
        <option v-for="bug in Bugs" :value="bug.id">
          {{ bug.label }}
        </option>
      </select>
      <button class="btn" @click="loadSample" :disabled="selectSample === null">
        Load Sample
      </button>
    </div>
  </CatalogInterface>
</template>
<style scoped>
.sample-form-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 320px;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
}

.select-label {
  font-size: 14px;
  font-weight: 600;
  color: #334155;
}

.sample-select-list {
  width: 100%;
  padding: 6px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background-color: #ffffff;
  color: #1e293b;
  font-size: 14px;
  outline: none;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.sample-select-list:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.sample-select-list optgroup {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #64748b;
  margin-top: 10px;
  margin-bottom: 4px;
}

.sample-select-list optgroup:first-of-type {
  margin-top: 4px;
}

.sample-select-list option {
  padding: 8px 12px;
  margin-top: 2px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  color: #334155;
  cursor: pointer;
}
</style>
