import * as fs from "fs"

export default defineEventHandler((event) => {
  const ranking = fs.readFileSync("./server/ranking.json", "utf8")
  const json = JSON.parse(ranking)

  console.log("isranked", event)

  // TODO check if user is in ranking and return true/false

  // return false
  return true
})
