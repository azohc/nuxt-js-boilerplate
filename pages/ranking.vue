<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <Head>
      <Title>leaderboards</Title>
      <Meta
        name="description"
        content="the highest rated and most outstanding players of snake"
      />
    </Head>
    <h1 class="text-3xl font-bold">global ranking</h1>
    <div class="flex justify-center gap-4">
      <TailwindTable
        v-if="rankingTableData"
        :head="rankingTableHead"
        :data="rankingTableData"
      ></TailwindTable>
      <h1 v-else>loading rankings...</h1>
    </div>
    <NuxtPage />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "ranking",
})
const {
  data: ranking,
  pending,
  error,
  refresh,
} = await useFetch("/api/ranking")
const rankingMatrix = Object.keys(ranking.value).map((alias) => [
  alias,
  ranking.value[alias].snakeLength,
  Math.floor(ranking.value[alias].duration / 1000) + "s",
])
const rankingTableHead = ["alias", "length", "time"]
const rankingTableData = ref(rankingMatrix)
</script>
