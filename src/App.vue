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

  background-color: #0076ff;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;

  cursor: pointer;
  user-select: none;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
}

.btn:hover {
  background-color: #005cd6;
}

.btn:active {
  transform: scale(0.98);
}

.btn:focus-visible {
  outline: 3px solid #94c5ff;
  outline-offset: 2px;
}
</style>
