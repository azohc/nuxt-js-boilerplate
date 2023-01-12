<template>
  <div
    class="h-screen w-screen flex flex-col justify-center items-center"
  >
    <button
      v-if="idle"
      @click="startGame"
      class="bg-slate-400 py-5 px-12 rounded text-3xl"
    >
      play
    </button>
    <CanvasGrid v-else :height="height" :width="width" />
  </div>
</template>

<script setup>
const idle = ref(true)
let width, height

onMounted(() => {
  width = document.documentElement.clientWidth
  height = document.documentElement.clientHeight
})

function startGame() {
  idle.value = false
}
</script>
