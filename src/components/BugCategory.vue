<script setup lang="ts">
import PetriDishBugCanvas from "../components/PetriDishBugCanvas.vue";
import type { Sample } from "../types";

// TODO: Figure out a better fix. Vue does not allow me to use BugCategory type in defiend props!
defineProps<{
  name: string;
  description: string;
  subcategories: {
    name: string;
    description: string;
    samples: Sample[];
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
            <PetriDishBugCanvas
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
