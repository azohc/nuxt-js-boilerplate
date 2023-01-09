<template>
  <h1>counter</h1>
  <h2>
    {{ count }}
  </h2>
  <button @click="count++">+</button>

  <button @click="count--">-</button>
</template>

<script setup lang="ts">
const count = ref(0);
</script>
