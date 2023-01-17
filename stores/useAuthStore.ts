export const useAuthStore = defineStore("AuthStore", () => {
  const alias = ref<string>("")
  const authenticated = ref<boolean>(false)
  const isAuthenticated = computed(() => authenticated.value)
  function login(_alias: string) {
    if (_alias === "")
      throw new Error("can not perform login action without an alias")
    alias.value = _alias
    authenticated.value = true
  }
  function logout() {
    alias.value = ""
    authenticated.value = false
  }
  return { alias, isAuthenticated, login, logout }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useAuthStore, import.meta.hot)
  )
}
