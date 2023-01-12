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
    <CanvasGrid
      v-else
      :height="height"
      :width="width"
      @game-over="handleGameOver"
    />
  </div>
</template>

<script setup>
const idle = ref(true)
let width, height

onMounted(() => {
  width = document.documentElement.clientWidth
  while (Math.floor(width / 5) % 2) width -= 1
  height = document.documentElement.clientHeight
  while (Math.floor(height / 5) % 2) height -= 1
  console.log(`${width}x${height}`)
})

function startGame() {
  idle.value = false
}

function handleGameOver(snakeLength) {
  idle.value = true
  console.log("game over with snake length = ", snakeLength)
}
</script>
