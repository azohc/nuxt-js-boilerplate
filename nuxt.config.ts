export default defineNuxtConfig({
  nitro: {
    preset: "vercel-edge",
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["@/assets/css/main.css"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "page", mode: "out-in" },
    head: {
      title: "sneyk",
      meta: [
        {
          name: "viewport",
          content:
            "height=device-height, width=device-width, initial-scale=1, maximum-scale=1",
        },
        {
          name: "description",
          content:
            "compete at the classic snake game using wasd, hjkl, or the arrow keys. press f/g to increase/decrease the snake's speed",
        },
      ],
    },
  },
  routeRules: {
    "/": { ssr: false },
    "/user": { ssr: false },
  },
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
  ],
  imports: {
    dirs: ["stores"],
  },
})
