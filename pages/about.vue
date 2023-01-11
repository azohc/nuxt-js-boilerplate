<template>
  <div>
    <Head>
      <Title>about juan</Title>
      <Meta
        name="description"
        content="some more information about juan"
      />
    </Head>
    <h1 class="text-3xl font-bold underline">about</h1>
    <AboutText></AboutText>
    <hr />
    <div class="flex justify-center gap-4">
      <NuxtLink to="/about/me">me</NuxtLink>
      <NuxtLink to="/about/pet">my pet</NuxtLink>
    </div>
    <NuxtPage />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "no-footer",
})
</script>
