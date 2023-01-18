<template>
  <div>
    <Head>
      <Title> 404 </Title>
    </Head>
    <h1>sorry, the route {{ $route.fullPath }} doesn't exist.</h1>
    <NuxtLink to="/">go home</NuxtLink>
  </div>
</template>
