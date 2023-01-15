import * as fs from "fs"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  fs.writeFileSync(
    "./server/ranking.json",
    JSON.stringify(body.newRanking)
  )
})
