import * as fs from "fs"
export default defineEventHandler(async (event) => {
  const { alias, duration, snakeLength } = await readBody(event)
  const ranking = await $fetch("/api/ranking")
  if (ranking[alias] && snakeLength > ranking[alias].snakeLength) {
    ranking[alias] = { duration, snakeLength }
    let newRanking = [...Object.entries(ranking)].sort(
      (a: any, b: any) => {
        const bl = b[1].snakeLength,
          al = a[1].snakeLength
        if (bl === al) {
          return a[1].duration - b[1].duration
        } else {
          return bl - al
        }
      }
    )

    $fetch("/api/ranking", {
      method: "post",
      body: {
        newRanking,
      },
    })
  }
})
