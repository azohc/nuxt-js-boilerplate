<template>
  <div>
    <Head>
      <Title>{{ user }}</Title>
      <Meta name="description" content="user settings page" />
    </Head>
    <!-- TODO add no robot rule for this page? -->
    <h1 class="text-3xl font-bold underline">your game history</h1>
    <!-- TODO add game history not lorem ipsum -->
    <AboutText></AboutText>
  </div>
</template>

<script setup>
const user = "todo add user"
</script>
