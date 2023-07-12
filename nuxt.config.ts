/*
 * @Description: nuxt config
 * @Author: Sunly
 * @Date: 2023-05-21 13:41:36
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "vuetify/lib/styles/main.sass",
    "~/assets/css/main.scss",
    // "@mdi/font/css/materialdesignicons.min.css",
  ],
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  typescript: {
    shim: false,
  },
  modules: ["nuxt-icons", "@vueuse/nuxt", "@pinia/nuxt"],
  pinia: {
    autoImports: ["appStore"],
  },
  vite: {
    esbuild: {
      drop: ["console", "debugger"],
    },
    define: {
      "process.env.DEBUG": false,
    },
  },
});
