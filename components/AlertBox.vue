<template>
  <div :class="cc">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
type SeverityType = "info" | "success" | "warning" | "error"

const props = defineProps<{
  type: SeverityType
}>()

const cc = computed(() => {
  switch (props.type) {
    case "info":
      return "blue-border blue-bg"
    case "success":
      return "green-border green-bg"
    case "warning":
      return "orange-border orange-bg"
    case "error":
      return "red-border red-bg"
  }
})
</script>

<style scoped>
div {
  display: inline-block;
  border: 2px solid;
  border-left-width: 8px;
  border-radius: 8px;
  padding: 0.5rem;
  margin: 1rem;
}
.blue-border {
  border-color: rgb(66, 66, 255);
}

.green-border {
  border-color: rgb(66, 255, 66);
}

.orange-border {
  border-color: rgb(255, 111, 66);
}

.red-border {
  border-color: rgb(255, 66, 66);
}

.blue-bg {
  background: rgba(66, 66, 255, 0.05);
}

.green-bg {
  background: rgba(66, 255, 66, 0.05);
}

.orange-bg {
  background: rgba(255, 111, 66, 0.05);
}

.red-bg {
  background: rgba(255, 66, 66, 0.05);
}
</style>
