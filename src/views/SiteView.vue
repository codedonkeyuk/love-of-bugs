<script setup>
import PetriDishBugCanvas from "../components/PetriDishBugCanvas.vue";
import Ladybug from "/ladybug.png?url";
import Cockroach from "/cockroach.png?url";
import Midge from "/midge.png?url";
import Fly from "/fly.png?url";
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
      <PetriDishBugCanvas
        size="250px"
        :bugCount="15"
        :bugSvgUrl="Ladybug"
        label="ladybug"
      />
      <PetriDishBugCanvas
        size="250px"
        :bugCount="3"
        :bugSvgUrl="Cockroach"
        label="cockroach"
      />
      <PetriDishBugCanvas
        size="250px"
        :bugCount="500"
        :bugSvgUrl="Midge"
        label="Scottish Midgie"
      />
      <PetriDishBugCanvas
        size="250px"
        :bugCount="100"
        :bugSvgUrl="Fly"
        label="Fly"
      />
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
