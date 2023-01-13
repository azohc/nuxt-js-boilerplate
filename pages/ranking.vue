<template>
  <div>
    <Head>
      <Title>leaderboards</Title>
      <Meta
        name="description"
        content="the highest rated and most outstanding players of snake"
      />
    </Head>
    <h1 class="text-3xl font-bold underline">leaderboards</h1>
    <div class="flex justify-center gap-4">
      <!-- TODO: add ranking view of leaderboard by time -->
      <!-- <NuxtLink to="/projects/wat-do">wat do</NuxtLink> -->
    </div>
    <NuxtPage />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "ranking",
})
</script>
