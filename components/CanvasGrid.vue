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

let playing
let context
const DIR_UP = "UP"
const DIR_DOWN = "DOWN"
const DIR_LEFT = "LEFT"
const DIR_RIGHT = "RIGHT"

const TICKRATE = 150

// the below "PIXEL" is NxN actual atomic pixels
const PIXEL_SIZE = 5
// the below "SQUARE" is MxM of the above PIXELs
const SQUARE_SIZE = 2
const canvas = ref(null)
const latestKeydown = ref(null)

const spawnPos = {
  x: props.width / PIXEL_SIZE / SQUARE_SIZE,
  y: props.height / PIXEL_SIZE / SQUARE_SIZE,
}

const snakeState = ref({
  coords: [
    spawnPos,
    { ...spawnPos, x: spawnPos.x - SQUARE_SIZE },
    { ...spawnPos, x: spawnPos.x - 2 * SQUARE_SIZE },
    { ...spawnPos, x: spawnPos.x - 3 * SQUARE_SIZE },
  ],
  dir: DIR_RIGHT,
})

const fillBg = (color) => {
  context.fillStyle = color
  context.fillRect(0, 0, props.width, props.height)
}

onMounted(() => {
  context = canvas.value.getContext("2d", {
    alpha: false,
  })
  fillBg("#4F822B")

  const drawGreenPx = (x, y) => {
    context.fillStyle = "#213404"
    context.fillRect(
      x * PIXEL_SIZE,
      y * PIXEL_SIZE,
      PIXEL_SIZE,
      PIXEL_SIZE
    )
  }
  drawGreenPx(5, 5)

  playing = setInterval(onTick, TICKRATE)
  drawGrid({
    drawFirstLine: true,
    color: "#4F822B88",
  })
})

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
function drawSquare(x, y, color) {
  drawPx(x, y, color)
  drawPx(x, y + 1, color)
  drawPx(x + 1, y, color)
  drawPx(x + 1, y + 1, color)
}

function onTick() {
  // consume whatever the latest keydown is
  if (latestKeydown.value) {
    console.log("latestkeydown:", latestKeydown.value)
    latestKeydown.value = null
  }
  // DETERMINE NEW HEAD POSITION
  unshiftNewHeadCoord()
  // // POP TAIL // TODO UNLESS ATE APPLE ON THIS TICK
  const pop = snakeState.value.coords.pop()
  // // TODO DONT RESET, JUST ERASE SNAKE USING COORDS ARRAY
  reset()
  drawSnake()
}

function drawSnake() {
  const X_CELLS = props.width / PIXEL_SIZE
  const Y_CELLS = props.height / PIXEL_SIZE
  const wrapxc = (xc) => {
    if (xc >= X_CELLS) return xc - X_CELLS
    if (xc < 0) return xc + X_CELLS
    return xc
  }
  const wrapyc = (yc) => {
    if (yc >= Y_CELLS) return yc - Y_CELLS
    if (yc < 0) return yc + Y_CELLS
    return yc
  }

  const { coords } = snakeState.value
  const len = coords.length
  const head = coords[0]

  drawSquare(head.x, head.y)
  coords
    .slice(1, len - 1)
    .forEach((coord) => drawSquare(wrapxc(coord.x), wrapyc(coord.y)))
}

function unshiftNewHeadCoord() {
  const head = snakeState.value.coords[0]
  switch (snakeState.value.dir) {
    case DIR_UP:
      snakeState.value.coords.unshift({
        x: head.x,
        y:
          head.y > 0
            ? head.y - SQUARE_SIZE
            : props.height / PIXEL_SIZE - SQUARE_SIZE,
      })
      break
    case DIR_DOWN:
      snakeState.value.coords.unshift({
        x: head.x,
        y:
          head.y + SQUARE_SIZE < props.height / PIXEL_SIZE
            ? head.y + SQUARE_SIZE
            : 0,
      })
      break
    case DIR_LEFT:
      snakeState.value.coords.unshift({
        x:
          head.x > 0
            ? head.x - SQUARE_SIZE
            : props.width / PIXEL_SIZE - SQUARE_SIZE,
        y: head.y,
      })
      break
    case DIR_RIGHT:
      snakeState.value.coords.unshift({
        x:
          head.x + SQUARE_SIZE < props.width / PIXEL_SIZE
            ? head.x + SQUARE_SIZE
            : 0,
        y: head.y,
      })
      break
  }
}
function drawPx(x, y, color) {
  context.fillStyle = color ? color : "#213404"
  context.fillRect(
    x * PIXEL_SIZE,
    y * PIXEL_SIZE,
    PIXEL_SIZE,
    PIXEL_SIZE
  )
}
const reset = () => {
  context.clearRect(0, 0, props.width, props.height)
  fillBg("#4F822B")
}

const togglepause = () => {
  if (playing == null) {
    playing = setInterval(onTick, TICKRATE)
    // TODO add indicator of paused state
  } else {
    playing = clearInterval(playing)
  }
}
const onKeyDown = (event) => {
  if (event.code === "Space") {
    togglepause()
    return
  }
  const ACCEPTED_DIR_KEYCODES = [
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
  const i = ACCEPTED_DIR_KEYCODES.indexOf(event.code)
  switch (i % 4) {
    case 0:
      latestKeydown.value = DIR_UP
      break
    case 1:
      latestKeydown.value = DIR_DOWN
      break
    case 2:
      latestKeydown.value = DIR_LEFT
      break
    case 3:
      latestKeydown.value = DIR_RIGHT
      break
    default:
  }
}
</script>
