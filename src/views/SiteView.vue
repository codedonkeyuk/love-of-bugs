<script setup>
import PetriDishBugCanvas from "../components/PetriDishBugCanvas.vue";
import Ladybug from "/ladybug-anim.png?url";
import Cockroach from "/cockroach-anim.png?url";
import Midge from "/midge.png?url";
import Fly from "/fly.png?url";
</script>
<template>
  <div class="page-container">
    <section class="card">
      <header>
        <h1>The Bug Archive</h1>
      </header>
      <p>
        This page contains our entire bug archive. This page is split into
        different categories and contains virtual samples of various bugs.
      </p>
      <article>
        <h2>Cockroach</h2>
        <p>There are about 30 different spiecies of Cockroach</p>
        <div class="samples">
          <PetriDishBugCanvas
            size="250px"
            :bugCount="1"
            :bugSvgUrl="Cockroach"
            label="cockroach"
          />
        </div>
      </article>
      <article>
        <h2>Beatles</h2>
        <p>
          It took 3 days to build the intro page, mainly because I chose to draw
          all the assets. I'll be rolling this out piece by piece over the next
          few days.
        </p>
        <div class="samples">
          <PetriDishBugCanvas
            size="250px"
            :bugCount="10"
            :bugSvgUrl="Ladybug"
            label="cockroach"
          />
        </div>
      </article>
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
  max-width: 800px;
  background-color: var(--card-background);
}

.samples {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
}
</style>
