export default defineEventHandler(async (event) => {
  const { alias, duration, snakeLength } = await readBody(event)
  const ranking = await $fetch("/api/ranking")
  if (ranking[alias] && snakeLength > ranking[alias].snakeLength) {
    ranking[alias] = { duration, snakeLength }
    let newRanking = Object.fromEntries(
      [...Object.entries(ranking)].sort((a: any, b: any) => {
        const gameA = a[1],
          gameB = b[1]
        if (gameB.snakeLength === gameA.snakeLength) {
          return gameA.duration - gameB.duration
        } else {
          return gameB.snakeLength - gameA.snakeLength
        }
      })
    )

    console.log("savegamepost::: posting newranking;", newRanking)

    return $fetch("/api/ranking", {
      method: "post",
      body: {
        newRanking,
      },
    })
  }
})
