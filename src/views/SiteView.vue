<script setup>
import PetriDishBugCanvas from "../components/PetriDishBugCanvas.vue";
import BugIcon from "/logo-square.svg?url";
</script>
<template>
  <div class="page-container">
    <div class="card">
      <h1>Site Does not exist, but it is coming soon</h1>
      <p>
        It took 3 days to build the intro page, mainly because I chose to draw
        all the assets. I'll be rolling this out piece by piece over the next
        few days.
      </p>
      <p>
        <strong>Coming Soon: A SASS bug based nightmare.</strong>
      </p>
      <PetriDishBugCanvas size="250px" :bugCount="1" :bugSvgUrl="BugIcon" />
      <PetriDishBugCanvas size="250px" :bugSvgUrl="BugIcon" />
      <PetriDishBugCanvas size="250px" :bugSvgUrl="BugIcon" />
      <PetriDishBugCanvas size="250px" :bugSvgUrl="BugIcon" />
    </div>
  </div>
</template>
<style>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: auto;
}
.card {
  padding: 15px;
  max-width: 800px;
}
</style>
