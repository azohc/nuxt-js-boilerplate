<template>
  <div class="text-center">
    <h1 class="text-xl text-center">
      number {{ $route.params.rank }}
    </h1>
    <AlertBox
      type="success"
      class="text-center"
      if="route.params.rank === 1"
    >
      you are the highest rated player at snake! <br />
      congratulations
    </AlertBox>
    <em>link to user with the longest record</em>
    <em> date of match </em>
    <em> score... a matter of time? in s could be good </em>
  </div>
</template>
