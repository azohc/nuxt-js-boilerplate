<script setup lang="ts">
import { computed } from "vue"
import { useMagicKeys } from "@vueuse/core"
import Key from "./Key.vue"
const {
  w,
  a,
  s,
  d,
  h,
  j,
  k,
  l,
  arrowleft,
  arrowdown,
  arrowright,
  arrowup,
  current,
} = useMagicKeys()
const keys = computed(() => Array.from(current))
</script>

<template>
  <div class="flex flex-col md:flex-row">
    <div>
      <div class="text-end mt-4">
        <div class="flex mt-2 justify-end space-x-1 min-h-1.5em">
          <code v-for="key in keys" :key="key" class="font-mono">
            {{ key }}
          </code>
        </div>
      </div>

      <div class="flex gap-3 justify-center">
        <Key :value="w"> w </Key>
        <Key :value="a"> a </Key>
        <Key :value="s"> s </Key>
        <Key :value="d"> d </Key>
        <div class="mx-1" />
        <Key :value="h"> h </Key>
        <Key :value="j"> j </Key>
        <Key :value="k"> k </Key>
        <Key :value="l"> l </Key>
        <Key :value="arrowleft"> &larr; </Key>
        <Key :value="arrowright"> &rarr; </Key>
        <Key :value="arrowup"> &uarr; </Key>
        <Key :value="arrowdown"> &darr; </Key>
      </div>
    </div>
  </div>
</template>
