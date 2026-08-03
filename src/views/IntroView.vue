<template>
  <div class="container">
    <div class="flower-frame">
      <div class="flower-icon-right" />
      <div class="flower-icon-left" />
      <div class="bug-leaf" />
    </div>
  </div>
  <router-link to="/site">Go to Site</router-link>
</template>
<style>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100vh;
  background: #348c31;
  @media (max-width: 1000px) {
    align-items: center;
  }
}

.flower-frame {
  position: relative;
  width: 70vw;
  height: 90vw;

  max-width: 700px;
  max-height: 900px;
  border: 1px solid palegreen;

  @media (min-width: 1000px) {
    margin-top: 13vh;
  }
}

.flower-icon-right {
  position: absolute;
  width: 50%;
  height: 50%;
  left: 70%;
  top: 40%;
  transform: translate(-50%, -50%) rotate(0deg);
  transform-origin: center;
  background-image: url("./flower-head.svg");
  background-repeat: no-repeat;
  background-size: contain;
}

.flower-icon-left {
  position: absolute;
  width: 60%;
  height: 60%;
  left: 40%;
  top: 75%;
  transform: translate(-50%, -50%) rotate(-35deg);
  transform-origin: center;
  background-image: url("./flower-head.svg");
  background-repeat: no-repeat;
  background-size: contain;
}

.bug-leaf {
  position: absolute;
  width: 30%;
  height: 30%;
  left: 80%;
  top: 90%;
  transform: translate(-50%, -50%) rotate(-25deg);
  transform-origin: center;
  background-image: url("./leaf.svg");
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
