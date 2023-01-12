<template>
  <canvas
    ref="canvas"
    class="h-screen w-screen"
    @keydown="onKeyDown"
    autofocus
    tabindex="0"
    :height="props.height"
    :width="props.width"
  ></canvas>
</template>

<script setup>
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
const SNAKE_GREEN = "#4F822B"
const BACKGROUND_GREEN = "#4F822B"
const TICKRATE = 250

// the below "PIXEL" is NxN actual atomic pixels
const PIXEL_SIZE = 5

// the below "SQUARE" is MxM of the above PIXELs
const SQUARE_SIZE = 2

const latestKeydown = ref(null)
const canvas = ref(null)
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

onMounted(() => {
  context = canvas.value.getContext("2d", {
    alpha: false,
  })
  fillBg(BACKGROUND_GREEN)

  playInterval = setInterval(onTick, TICKRATE)

  drawGrid({
    drawFirstLine: true,
    color: `${SNAKE_GREEN}88`,
  })

  drawSnake()
})

function fillBg(color) {
  context.fillStyle = color
  context.fillRect(0, 0, props.width, props.height)
}

function drawGrid(options) {
  const { color, drawFirstLine } = options
  for (
    let x = drawFirstLine ? 0 : 1;
    x <= props.width;
    x += PIXEL_SIZE
  ) {
    context.moveTo(x, 0)
    context.lineTo(x, props.height)
  }
  for (
    let x = drawFirstLine ? 0 : 1;
    x <= props.height;
    x += PIXEL_SIZE
  ) {
    context.moveTo(0, x)
    context.lineTo(props.width, x)
  }
  context.strokeStyle = color
  context.stroke()
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
  drawPixel(x, y, color)
  drawPixel(x, y + 1, color)
  drawPixel(x + 1, y, color)
  drawPixel(x + 1, y + 1, color)
}

function drawSnake() {
  const { coordinates } = snakeState.value
  const head = coordinates[0]

  drawSquare(head.x, head.y)
  coordinates
    .slice(1)
    .forEach((coord) => drawSquare(coord.x, coord.y))
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
  // // POP TAIL // TODO UNLESS ATE APPLE ON THIS TICK
  const tail = snakeState.value.coordinates.pop()
  // TODO avoid reset, just use popped tail to paint as bggreen
  reset()
  drawSnake()
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
            : props.height / PIXEL_SIZE - SQUARE_SIZE,
      })
      break
    case DIRECTION_DOWN:
      snakeState.value.coordinates.unshift({
        x: currentHead.x,
        y:
          currentHead.y + SQUARE_SIZE < props.height / PIXEL_SIZE
            ? currentHead.y + SQUARE_SIZE
            : 0,
      })
      break
    case DIRECTION_LEFT:
      snakeState.value.coordinates.unshift({
        x:
          currentHead.x > 0
            ? currentHead.x - SQUARE_SIZE
            : props.width / PIXEL_SIZE - SQUARE_SIZE,
        y: currentHead.y,
      })
      break
    case DIRECTION_RIGHT:
      snakeState.value.coordinates.unshift({
        x:
          currentHead.x + SQUARE_SIZE < props.width / PIXEL_SIZE
            ? currentHead.x + SQUARE_SIZE
            : 0,
        y: currentHead.y,
      })
      break
  }
}

function onKeyDown(event) {
  if (event.code === "Space") {
    togglepause()
    return
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

const reset = () => {
  context.clearRect(0, 0, props.width, props.height)
  fillBg(SNAKE_GREEN)
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
