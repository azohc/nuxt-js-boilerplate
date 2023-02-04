<template>
  <div
    ref="container"
    tabindex="2"
    class="h-full w-screen flex flex-col justify-center items-center"
    @keyup="onKeyUp"
  >
    <Head> <Title> sneyk </Title> </Head>
    <div
      v-if="modalVisible"
      class="fixed z-10 h-screen w-screen flex flex-col items-center justify-center bg-green-900 bg-opacity-75"
    >
      <div
        ref="modalRef"
        class="w-9/12 p-2 bg-green-600 border-4 border-green-900"
      >
        <p class="text-3xl">parameters</p>
        <div class="grid grid-cols-2">
          <span>show score</span>
          <OnOffSwitch
            :value="tempShowScorePref"
            @switched="tempShowScorePref = !tempShowScorePref"
          />
          <span>show key press sensor</span>
          <OnOffSwitch
            :value="tempShowKeyPressesPref"
            @switched="
              tempShowKeyPressesPref = !tempShowKeyPressesPref
            "
          />
        </div>
        <div class="flex justify-end">
          <CardButton secondary :click-callback="savePreferences"
            >save</CardButton
          >
        </div>
      </div>
    </div>
    <KeysDemo
      v-if="prefs.showKeyPresses"
      class="absolute bottom-1 right-3 text-xl"
    ></KeysDemo>
    <div
      v-if="state === 'idle'"
      class="flex flex-col gap-4 items-center"
    >
      <h1 class="text-8xl">sneyk</h1>
      <CardButton :click-callback="startGame"> play </CardButton>
      <div
        v-if="authStore.isAuthenticated"
        class="flex flex-col gap-4"
      >
        <CardButton :click-callback="navigateToRankings" secondary>
          <NuxtLink to="/ranking">ranking</NuxtLink>
        </CardButton>
        <span class="flex gap-2 items-baseline">
          logged in as
          <span class="text-violet-800 text-3xl">
            <NuxtLink to="/user">
              {{ authStore.alias }}
            </NuxtLink>
          </span>
        </span>
      </div>
      <CardButton v-else :click-callback="navigateToUser" secondary
        >set alias</CardButton
      >
    </div>
    <SnakeCanvas
      v-else-if="state === 'playing'"
      ref="canvas"
      :height="height"
      :width="width"
      @game-over="handleGameOver"
    />
    <div
      v-else-if="state === 'dead'"
      class="p-6 text-center flex flex-col items-center gap-3"
    >
      <h2 class="text-5xl">game over</h2>
      <p>you ate {{ latestApplesEaten }} apples</p>

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
import {
  onClickOutside,
  useResizeObserver,
  useStorage,
} from "@vueuse/core"

const authStore = useAuthStore()
type GameState = "idle" | "playing" | "dead"
const state = ref<GameState>("idle")
const latestApplesEaten = ref()
const container = ref()
const width = ref<number>(NaN)
const height = ref<number>(NaN)
let coolingDown = true
const prefs = useStorage("preferences", {
  showScore: false,
  showKeyPresses: false,
})
const tempShowScorePref = ref(prefs.value.showScore)
const tempShowKeyPressesPref = ref(prefs.value.showKeyPresses)

const modalVisible = ref(false)
const modalRef = ref(null)
onClickOutside(modalRef, () => {
  modalVisible.value = false
})

function savePreferences() {
  prefs.value = {
    showScore: tempShowScorePref.value,
    showKeyPresses: tempShowKeyPressesPref.value,
  }
  modalVisible.value = false
}

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

function calculateDimensions() {
  width.value = document.documentElement.clientWidth
  while (width.value % 5) width.value -= 1
  height.value = document.documentElement.clientHeight
  while (height.value % 5) height.value -= 1
  container.value.focus()
}

useResizeObserver(container, calculateDimensions)

onMounted(() => {
  calculateDimensions()
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
    modalVisible.value = false
    state.value = "idle"
  } else if (event.code === "KeyP") {
    modalVisible.value = true
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
  applesEaten,
  duration,
}: {
  applesEaten: number
  duration: Date
}) {
  state.value = "dead"
  latestApplesEaten.value = applesEaten
  // store in ranking if above 11 apples TODO
  container.value.focus()
  startPlayCooldown()
  const alias = authStore.alias

  if (alias && applesEaten) {
    await $fetch("/api/savegame", {
      method: "post",
      body: {
        alias,
        duration,
        applesEaten,
      },
    })
  }
}
startPlayCooldown()
</script>
