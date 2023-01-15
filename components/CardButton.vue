<template>
  <button
    :class="props.secondary ? ccSecondary : ccPrimary"
    @click="clickCallback"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { NavigationFailure } from "vue-router"

const props = defineProps<{
  secondary?: boolean
  clickCallback: (payload?: MouseEvent) => void
}>()

const ccPrimary = computed(
  () => "bg-green-900 p-6 rounded-sm text-violet-100 text-3xl"
)
const ccSecondary = computed(
  () => "bg-green-800 p-3 rounded text-violet-300 text-2xl"
)
</script>
