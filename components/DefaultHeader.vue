<template>
  <nav>
    <NuxtLink to="/">home</NuxtLink>
    <NuxtLink to="/user">login</NuxtLink>
    <NuxtLink to="/ranking"
      >ranking
      <!-- include several sortings on rank to maek it rankings -->
      <!--s-->
    </NuxtLink>
  </nav>
</template>

<style scoped>
nav {
  margin-top: 1rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 1rem;
}
</style>
