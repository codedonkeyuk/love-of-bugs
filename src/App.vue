<template>
  <router-view />
</template>
<style>
.btn {
  display: inline-block;
  box-sizing: border-box;

  appearance: none;
  border: none;
  text-decoration: none;
  background: none;

  font-family: sans-serif;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  line-height: 1;

  background-color: var(--button-background);
  color: var(--button-color);
  padding: 0.75rem 1.5rem;
  border-radius: 6px;

  cursor: pointer;
  user-select: none;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;

  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.btn:hover {
  background-color: var(--button-background-hover);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.btn:active {
  transform: scale(0.98);
  box-shadow: none;
}

.btn:focus-visible {
  outline: 3px solid var(--button-background-focus);
  outline-offset: 2px;
}
</style>
