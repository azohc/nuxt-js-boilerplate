export default defineEventHandler(async (event) => {
  const { alias, duration, snakeLength } = await readBody(event)
  const ranking = await $fetch("/api/ranking")

  let newRanking = {
    ...ranking,
    [alias]: {
      snakeLength,
      duration,
    },
  }

  newRanking = Object.fromEntries(
    [...Object.entries(newRanking)].sort((a: any, b: any) => {
      const gameA = a[1],
        gameB = b[1]
      if (gameB.snakeLength === gameA.snakeLength) {
        return gameA.duration - gameB.duration
      } else {
        return gameB.snakeLength - gameA.snakeLength
      }
    })
  )

  const response = await $fetch("/api/ranking", {
    method: "post",
    body: {
      newRanking,
    },
  })
  return { response }
})
