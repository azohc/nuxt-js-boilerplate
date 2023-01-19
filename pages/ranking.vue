<template>
  <div
    class="h-screen flex flex-col justify-center items-center gap-8"
  >
    <Head>
      <Title>leaderboards</Title>
      <Meta
        name="description"
        content="the highest rated and most outstanding players of snake"
      />
    </Head>
    <h1 class="text-5xl font-bold">global ranking</h1>
    <div class="flex justify-center gap-4 max-h-72">
      <TailwindTable
        v-if="rankingTableData"
        :head="rankingTableHead"
        :data="rankingTableData"
      ></TailwindTable>
      <h1 v-else>loading rankings...</h1>
    </div>
    <CardButton secondary :click-callback="() => navigateTo('/')">
      <NuxtLink to="/">home</NuxtLink>
    </CardButton>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: [
    function (to, from) {
      const authStore = useAuthStore()
      if (!authStore.isAuthenticated) {
        return navigateTo("/user")
      }
    },
  ],
})
const rankingTableHead = ["alias", "length", "time"]
const rankingTableData = ref()
const { data: ranking, pending } = await useFetch("/api/ranking")
watch(ranking, setRankingTableData)
setRankingTableData()

function setRankingTableData() {
  if (!pending.value && ranking) {
    rankingTableData.value = Object.keys(ranking.value).map(
      (alias) => [
        alias,
        ranking.value[alias].applesEaten,
        Math.floor(ranking.value[alias].duration / 1000) + " s",
      ]
    )
  }
}
</script>
