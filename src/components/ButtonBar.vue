<template>
  <div :class="['button-bar', `align-${align}`]">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  align: {
    type: String,
    default: "left",
    validator: (value) => ["left", "right"].includes(value),
  },
});
</script>

<style scoped>
.button-bar {
  width: 100%;
  display: flex;
  flex-flow: row-reverse nowrap;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

.button-bar.align-right {
  flex-flow: row nowrap;
}

@media (max-width: 768px) {
  .button-bar,
  .button-bar.align-right {
    flex-flow: column nowrap;
    justify-content: center;
  }
}
</style>
