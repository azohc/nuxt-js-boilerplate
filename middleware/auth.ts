export default defineNuxtRouteMiddleware(async (to, from) => {
  const userCookie = useCookie("userAlias")
  if (!userCookie.value) {
    navigateTo("/user")
  }
})
