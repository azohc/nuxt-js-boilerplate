import * as fs from "fs"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("rankingpost:: writing ", body, "to json")

  fs.writeFileSync(
    "./server/ranking.json",
    JSON.stringify(body.newRanking)
  )
  console.log("rankingpost:: post writing")
})
