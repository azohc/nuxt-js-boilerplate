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
})
