<script setup>
import BugCategory from "../components/BugCategory.vue";
import bugCategories from "../data/BugCategories.js";
</script>
<template>
  <div class="page-container">
    <section class="card">
      <header>
        <h1>The Bug Archive</h1>
      </header>
      <p>
        This page contains our entire bug archive. This page is split into
        different categories, sub catogries and contains virtual samples of
        various bugs.
      </p>
      <BugCategory
        v-for="bugCategory in bugCategories"
        :name="bugCategory.name"
        :description="bugCategory.description"
        :subcategories="bugCategory.subcategories"
      />
    </section>
  </div>
</template>
<style>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
}
.card {
  padding: 15px;
  max-width: 1200px;
  background-color: var(--card-background);
}
</style>
