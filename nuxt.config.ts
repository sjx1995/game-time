/*
 * @Description: nuxt config
 * @Author: Sunly
 * @Date: 2023-05-21 13:41:36
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  typescript: {
    shim: false,
  },
  modules: ["nuxt-icons", "@vueuse/nuxt"],
  vite: {
    esbuild: {
      drop: ["console", "debugger"],
    },
  },
});
