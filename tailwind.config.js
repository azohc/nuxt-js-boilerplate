/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["SummerPixel"],
      serif: ["SummerPixel"],
      mono: ["SummerPixel"],
      display: ["SummerPixel"],
      body: ["SummerPixel"],
    },
  },
  plugins: [],
}
