export default defineNuxtRouteMiddleware(async (to, from) => {
  const alias = localStorage.getItem("USER_ALIAS")
  if (!alias) {
    return navigateTo("/user")
  }
})
