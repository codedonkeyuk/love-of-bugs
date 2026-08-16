<template>
  <div class="button-bar">
    <slot></slot>
  </div>
</template>
<style>
.button-bar {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

@media (max-width: 768px) {
  .button-bar {
    flex-flow: column nowrap;
    justify-content: center;
  }
}
</style>
