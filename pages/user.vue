<template>
  <!-- // TODO refactoro ut this centered flex col cc -->
  <div
    class="text-xl h-screen flex flex-col justify-center items-center"
  >
    <div
      v-if="registered"
      class="flex flex-col justify-center items-center text-center"
    >
      <h1 class="text-3xl">welcome back, {{ user }}</h1>
      <!-- <p>TODO show stats about your best match</p>
      <p>TODO show stats about your total play time</p>
      <p>TODO show graph with scores from last 7 days</p>
      <p>TODO show graph with playtime from last 7 days...</p>
      <p>
        TODO show less ideas, or at least the ones that make sense
      </p> -->
      <CardButton :click-callback="navigateTo('/')"
        >back to playing snake</CardButton
      >
    </div>
    <div v-else class="flex flex-col justify-center items-center">
      <div>
        <label class="px-2" for="user-alias">
          enter an alias to compete in the global ranking
        </label>
        <input
          class="w-44 p-1 bg-purple-100"
          maxlength="11"
          @keyup="onKeyUp"
          v-model="alias"
          placeholder="maxlength11"
        />
      </div>
      <button
        class="py-3 m-2 rounded bg-green-700 text-purple-200 px-5"
        @click="submitAlias"
      >
        submit
      </button>
    </div>
  </div>
</template>

<script setup>
const alias = ref("")
// TODO get scores, match history or whatever that's associated to user to add some clutter on screen
const user = ref(localStorage.getItem("USER_ALIAS"))
const registered = ref(!!user.value)
function submitAlias() {
  console.log("alias", alias.value)
  user.value = alias.value
  localStorage.setItem("USER_ALIAS", user.value)
}
function onKeyUp(event) {
  if (event.code === "Enter") {
    submitAlias()
    registered = true
  }
}
</script>
