<template>
  <div
    ref="container"
    tabindex="2"
    class="h-screen w-screen flex flex-col justify-center items-center"
    @keyup="onKeyUp"
  >
    <Head> <Title> snake </Title> </Head>
    <div
      class="flex flex-col gap-4 items-center"
      v-if="state === 'idle'"
    >
      <h1 class="text-8xl">snake</h1>
      <CardButton :click-callback="startGame"> play </CardButton>
      <CardButton
        v-if="authStore.isAuthenticated"
        :click-callback="navigateToUser"
        secondary
        >{{ authStore.alias }}</CardButton
      >
      <CardButton v-else :click-callback="navigateToUser" secondary
        >set alias</CardButton
      >
    </div>
    <SnakeCanvas
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
const authStore = useAuthStore()
type GameState = "idle" | "playing" | "dead"
const state = ref<GameState>("idle")
const lastSnakeLength = ref()
const lastGameScore = computed<number>(
  () => lastSnakeLength.value - 4
)
const container = ref()
let width: number, height: number
let coolingDown = true

function navigateToUser() {
  return navigateTo({
    path: "/user",
  })
}
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
  if (
    DIRECTION_KEYCODES.concat("Space", "KeyF", "KeyG").includes(
      event.code
    )
  ) {
    startGame()
  } else if (event.code === "Esc") {
    state.value = "idle"
  }
}

function startGame() {
  state.value = "playing"
}

function startPlayCooldown() {
  coolingDown = true
  setTimeout(() => (coolingDown = false), 1100)
}

async function handleGameOver({
  snakeLength,
  duration,
}: {
  snakeLength: number
  duration: Date
}) {
  state.value = "dead"
  lastSnakeLength.value = snakeLength
  // store in ranking if above 11 apples TODO
  container.value.focus()
  startPlayCooldown()
  const alias = authStore.alias

  if (alias && lastGameScore.value) {
    await $fetch("/api/savegame", {
      method: "post",
      body: {
        alias,
        duration,
        snakeLength: lastGameScore.value,
      },
    })
  }
}
startPlayCooldown()
</script>
