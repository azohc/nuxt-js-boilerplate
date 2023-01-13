<template>
  <div
    ref="container"
    tabindex="2"
    class="h-screen w-screen flex flex-col justify-center items-center"
    @keyup="onKeyUp"
  >
    <CardButton v-if="state === 'idle'" :click-callback="startGame">
      play
    </CardButton>
    <CanvasGrid
      v-else-if="state === 'playing'"
      :height="height"
      :width="width"
      @game-over="handleGameOver"
    />
    <div
      v-else-if="state === 'dead'"
      class="p-6 text-center flex flex-col items-center gap-3"
    >
      <h2 class="text-5xl">game over</h2>
      <p>you ate {{ lastGameScore }} apples</p>

      <CardButton :click-callback="startGame">
        play again
      </CardButton>

      <CardButton secondary :click-callback="navigateToRankings">
        <NuxtLink to="/ranking">ranking</NuxtLink>
      </CardButton>
    </div>
  </div>
</template>

<script setup lang="ts">
type State = "idle" | "playing" | "dead"
const state = ref<State>("idle")
const lastSnakeLength = ref()
const lastGameScore = computed<number>(
  () => lastSnakeLength.value - 4
)
const container = ref()
let width: number, height: number
let coolingDown = true

function navigateToRankings() {
  return navigateTo({
    path: "/ranking",
  })
}

onMounted(() => {
  width = document.documentElement.clientWidth
  while (width % 5) width -= 1
  height = document.documentElement.clientHeight
  while (height % 5) height -= 1
  container.value.focus()
})

function onKeyUp(event: KeyboardEvent) {
  if (coolingDown) return
  const DIRECTION_KEYCODES = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "KeyW",
    "KeyS",
    "KeyA",
    "KeyD",
    "KeyK",
    "KeyJ",
    "KeyH",
    "KeyL",
  ]
  if (DIRECTION_KEYCODES.concat("Space").includes(event.code)) {
    startGame()
  } else if (event.code === "Esc") {
    state.value = "idle"
  }
}

function startGame() {
  state.value = "playing"
}

function setTimeoutGameOverOrWelcome() {
  coolingDown = true
  setTimeout(() => (coolingDown = false), 1100)
}

function handleGameOver(snakeLength: number) {
  state.value = "dead"
  lastSnakeLength.value = snakeLength
  // store in ranking if above 11 apples TODO
  container.value.focus()
  setTimeoutGameOverOrWelcome()
}
setTimeoutGameOverOrWelcome()
</script>
