<template>
  <div class="catalog-interface-container">
    <div class="catalog-interface-container-terminal">
      <h1>Bug Box</h1>
      <slot>Loading...</slot>
    </div>
  </div>
</template>
<style>
.catalog-interface-container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 100vh;
  width: 98vw;
  position: fixed;
  background-color: var(--main-background);
  border-right: 2vw solid white;
  color: #ffffff;
  top: 0;
  left: 0;
  z-index: 99999;
}

.catalog-interface-container-terminal {
  border: 1px solid #000000;
  color: var(--main-color);
  border-radius: 10px;
  padding: 15px;
  width: 300px;
  background-color: var(--card-background);
}
</style>
