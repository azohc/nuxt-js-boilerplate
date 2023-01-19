<script setup lang="ts">
defineProps<{
  value: boolean
}>()
const emit = defineEmits(["switched"])
</script>

<template>
  <button @click="emit('switched')">
    {{ value ? "on" : "off" }}
  </button>
</template>
