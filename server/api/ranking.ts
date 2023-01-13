import * as fs from "fs"

export default defineEventHandler((event) => {
  const ranking = fs.readFileSync("./server/ranking.json", "utf8")
  return JSON.parse(ranking)
})
