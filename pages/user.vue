<template>
  <div
    class="text-xl h-screen flex flex-col justify-center items-center"
  >
    <div
      v-if="registered"
      class="flex flex-col justify-center items-center text-center gap-4"
    >
      <h1 class="text-5xl">welcome back, {{ userCookie }}</h1>
      <!-- <p>TODO show stats about your best match</p>
      <p>TODO show stats about your total play time</p>
      <p>TODO show graph with scores from last 7 days</p>
      <p>TODO show graph with playtime from last 7 days...</p>
      <p>
        TODO show less ideas, or at least the ones that make sense
      </p> -->
      <CardButton secondary :click-callback="() => navigateTo('/')"
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
          v-model="aliasInput"
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
const aliasInput = ref("")
// TODO get scores, match history or whatever that's associated to user to add some clutter on screen
const userCookie = useCookie("userAlias", {
  expires: new Date("12/12/2023"),
})
const registered = ref(!!userCookie.value)
function submitAlias() {
  userCookie.value = aliasInput.value
  registered.value = !!userCookie.value
}
function onKeyUp(event) {
  if (event.code === "Enter") {
    submitAlias()
    registered = true
  }
}
</script>
