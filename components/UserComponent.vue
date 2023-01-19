<template>
  <div
    v-if="authStore.isAuthenticated"
    class="flex flex-col justify-center items-center text-center gap-4"
  >
    <h1 class="text-5xl">welcome back, {{ authStore.alias }}</h1>
    <!-- <p>TODO show stats about your best match</p>
      <p>TODO show stats about your total play time</p>
      <p>TODO show graph with scores from last 7 days</p>
      <p>TODO show graph with playtime from last 7 days...</p>
      <p>
        TODO show less ideas, or at least the ones that make sense
      </p> -->
    <CardButton secondary :click-callback="() => navigateTo('/')"
      >home</CardButton
    >
    <CardButton secondary :click-callback="handleLogoutClick"
      >log out</CardButton
    >
  </div>
  <div v-else class="flex flex-col justify-center items-center gap-4">
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
    <button
      class="py-3 m-2 rounded bg-green-700 text-purple-200 px-5"
      :disabled="aliasInput === ''"
      @click="submitAlias"
    >
      submit
    </button>
  </div>
</template>

<script setup>
const aliasInput = ref("")
// TODO get scores, match history or whatever that's associated to user to add some clutter on screen
const authStore = useAuthStore()

function submitAlias() {
  authStore.login(aliasInput.value)
}

function onKeyUp(event) {
  if (event.code === "Enter") {
    submitAlias()
  }
}

function handleLogoutClick() {
  authStore.logout()
}
</script>
