<template>
  <canvas
    ref="canvas"
    @keydown="onKeyDown"
    tabindex="1"
    :height="props.height"
    :width="props.width"
  ></canvas>
</template>

<script setup>
const emit = defineEmits(["gameOver"])
const props = defineProps({
  height: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
})
const DIRECTION_UP = "UP"
const DIRECTION_DOWN = "DOWN"
const DIRECTION_LEFT = "LEFT"
const DIRECTION_RIGHT = "RIGHT"
const SNAKE_GREEN = "#14532D"
const BACKGROUND_GREEN = "#16A349"
const TICKRATE = 100

// the below "PIXEL" is NxN actual atomic pixels
const PIXEL_SIZE = 5

// the below "SQUARE" is MxM of the above PIXELs
const SQUARE_SIZE = 2

const latestKeydown = ref()
const canvas = ref()
let context, playInterval

const spawnPos = {
  x: Math.floor(props.width / PIXEL_SIZE / SQUARE_SIZE),
  y: Math.floor(props.height / PIXEL_SIZE / SQUARE_SIZE),
}

if (spawnPos.x % 2) {
  spawnPos.x -= 1
}
if (spawnPos.y % 2) {
  spawnPos.y -= 1
}

const snakeState = ref({
  coordinates: [
    spawnPos,
    { ...spawnPos, x: spawnPos.x - SQUARE_SIZE },
    { ...spawnPos, x: spawnPos.x - 2 * SQUARE_SIZE },
    { ...spawnPos, x: spawnPos.x - 3 * SQUARE_SIZE },
  ],
  direction: DIRECTION_RIGHT,
})

function getNewAppleCoordinates() {
  const randomIntBoundedBy = (max) =>
    Math.floor((Math.random() * max) / PIXEL_SIZE)
  let x = randomIntBoundedBy(props.width)
  if (x % 2) x -= 1
  let y = randomIntBoundedBy(props.height)
  if (y % 2) y -= 1
  while (snakeState.value.coordinates.map((c) => c.x).includes(x)) {
    x = randomIntBoundedBy(props.width)
    if (x % 2) x -= 1
  }
  while (snakeState.value.coordinates.map((c) => c.y).includes(y)) {
    y = randomIntBoundedBy(props.height)
    if (y % 2) y -= 1
  }
  return { x, y }
}

let apple = getNewAppleCoordinates()
let timeGameStarted

onMounted(() => {
  context = canvas.value.getContext("2d", {
    alpha: false,
  })
  fillBg(BACKGROUND_GREEN)

  playInterval = setInterval(onTick, TICKRATE)
  canvas.value.focus()
  timeGameStarted = new Date()
})

function fillBg(color) {
  context.fillStyle = color
  context.fillRect(0, 0, props.width, props.height)
}

function drawPixel(x, y, color) {
  context.fillStyle = color ? color : "#213404"
  context.fillRect(
    x * PIXEL_SIZE,
    y * PIXEL_SIZE,
    PIXEL_SIZE,
    PIXEL_SIZE
  )
}

function drawSquare(x, y, color) {
  drawPixel(x, y, color || SNAKE_GREEN)
  drawPixel(x, y + 1, color || SNAKE_GREEN)
  drawPixel(x + 1, y, color || SNAKE_GREEN)
  drawPixel(x + 1, y + 1, color || SNAKE_GREEN)
}

function onTick() {
  // consume whatever the latest keydown is
  if (latestKeydown.value) {
    const currentDirection = snakeState.value.direction
    if (
      (latestKeydown.value === DIRECTION_UP &&
        currentDirection !== DIRECTION_DOWN) ||
      (latestKeydown.value === DIRECTION_DOWN &&
        currentDirection !== DIRECTION_UP) ||
      (latestKeydown.value === DIRECTION_RIGHT &&
        currentDirection !== DIRECTION_LEFT) ||
      (latestKeydown.value === DIRECTION_LEFT &&
        currentDirection !== DIRECTION_RIGHT)
    ) {
      snakeState.value.direction = latestKeydown.value
    }
    latestKeydown.value = null
  }
  setNextHeadCoordinates()
  const head = snakeState.value.coordinates[0]
  if (
    snakeState.value.coordinates
      .slice(1)
      .some((c) => c.x === head.x && c.y === head.y)
  ) {
    endGame()
  }
  if (head.x === apple.x && head.y === apple.y) {
    apple = getNewAppleCoordinates()
  } else {
    snakeState.value.coordinates.pop()
  }
  // TODO avoid reset, just use popped tail to paint as bggreen
  reset()
  drawSnake()
  drawSquare(apple.x, apple.y, "red")
}

function drawSnake() {
  const { coordinates } = snakeState.value
  const head = coordinates[0]

  drawSquare(head.x, head.y)
  coordinates
    .slice(1)
    .forEach((coord) => drawSquare(coord.x, coord.y))
}

function setNextHeadCoordinates() {
  const currentHead = snakeState.value.coordinates[0]
  switch (snakeState.value.direction) {
    case DIRECTION_UP:
      snakeState.value.coordinates.unshift({
        x: currentHead.x,
        y:
          currentHead.y > 0
            ? currentHead.y - SQUARE_SIZE
            : Math.floor(props.height / PIXEL_SIZE) - SQUARE_SIZE,
      })
      break
    case DIRECTION_DOWN:
      snakeState.value.coordinates.unshift({
        x: currentHead.x,
        y:
          currentHead.y + SQUARE_SIZE <
          Math.floor(props.height / PIXEL_SIZE)
            ? currentHead.y + SQUARE_SIZE
            : 0,
      })
      break
    case DIRECTION_LEFT:
      snakeState.value.coordinates.unshift({
        x:
          currentHead.x > 0
            ? currentHead.x - SQUARE_SIZE
            : Math.floor(props.width / PIXEL_SIZE) - SQUARE_SIZE,
        y: currentHead.y,
      })
      break
    case DIRECTION_RIGHT:
      snakeState.value.coordinates.unshift({
        x:
          currentHead.x + SQUARE_SIZE <
          Math.floor(props.width / PIXEL_SIZE)
            ? currentHead.x + SQUARE_SIZE
            : 0,
        y: currentHead.y,
      })
      break
  }
}

function onKeyDown(event) {
  // TODO implement keyDown BUFFER and consume+reset on tick
  // use the 1st keypress only
  if (event.code === "Space") {
    togglepause()
    return
  } else if (event.code === "Tab") {
    event.preventDefault()
    return
  } else if (event.code === "Escape") {
    endGame()
  }
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
  const i = DIRECTION_KEYCODES.indexOf(event.code)
  switch (i % 4) {
    case 0:
      latestKeydown.value = DIRECTION_UP
      break
    case 1:
      latestKeydown.value = DIRECTION_DOWN
      break
    case 2:
      latestKeydown.value = DIRECTION_LEFT
      break
    case 3:
      latestKeydown.value = DIRECTION_RIGHT
      break
    default:
  }
}

async function endGame() {
  clearInterval(playInterval)
  emit("gameOver", {
    snakeLength: snakeState.value.coordinates.length,
    duration: new Date() - timeGameStarted,
  })
}

const reset = () => {
  context.clearRect(0, 0, props.width, props.height)
  fillBg(BACKGROUND_GREEN)
}

const togglepause = () => {
  if (playInterval == null) {
    playInterval = setInterval(onTick, TICKRATE)
    // TODO add indicator of paused state
  } else {
    playInterval = clearInterval(playInterval)
  }
}
</script>
