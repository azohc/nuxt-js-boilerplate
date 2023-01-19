export default defineEventHandler(async (event) => {
  const ranking = await $fetch("/api/ranking")
  const { alias, duration, applesEaten } = await readBody(event)
  const previousRanking = ranking[alias]

  let newRanking = ranking
  const rankingPostRequest = async () =>
    await $fetch("/api/ranking", {
      method: "post",
      body: {
        newRanking,
      },
    })

  if (
    previousRanking &&
    (previousRanking.applesEaten < applesEaten ||
      (previousRanking.applesEaten === applesEaten &&
        previousRanking.duration < duration))
  ) {
    event.node.res.statusCode = 200
    return { response: await rankingPostRequest() }
  }

  newRanking[alias] = {
    applesEaten,
    duration,
  }

  newRanking = Object.fromEntries(
    [...Object.entries(newRanking)].sort((a: any, b: any) => {
      const gameA = a[1],
        gameB = b[1]
      if (gameB.applesEaten === gameA.applesEaten) {
        return gameA.duration - gameB.duration
      } else {
        return gameB.applesEaten - gameA.applesEaten
      }
    })
  )

  return { response: await rankingPostRequest() }
})
