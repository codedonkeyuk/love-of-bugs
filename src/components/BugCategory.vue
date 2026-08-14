<script setup lang="ts">
import BugCanvas from "../components/BugCanvas.vue";
import type { Bug } from "../types";

defineProps<{
  name: string;
  description: string;
  subcategories: {
    name: string;
    description: string;
    samples: Bug[];
  }[];
}>();
</script>
<template>
  <section>
    <h2>{{ name }}</h2>
    <p>{{ description }}</p>
    <section>
      <h3>Subcategories</h3>
      <section v-for="subcategory in subcategories">
        <h3>{{ subcategory.name }}</h3>
        <p>{{ subcategory.description }}</p>
        <div class="samples">
          <article v-for="sample in subcategory.samples">
            <BugCanvas
              :size="sample.size"
              :bugCount="sample.bugCount"
              :bugSvgUrl="sample.src"
              :label="sample.label"
            />
          </article>
        </div>
      </section>
    </section>
  </section>
</template>
<style>
.samples {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
}
</style>
