<script setup lang="ts">
import CatalogWrapper from "../components/CatalogWrapper.vue";
defineProps<{
  sampleId: string;
}>();
</script>
<template>
  <CatalogWrapper>Hello {{ sampleId }}</CatalogWrapper>
</template>
