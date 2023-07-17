/*
 * @Description: nuxt config
 * @Author: Sunly
 * @Date: 2023-05-21 13:41:36
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "vuetify/lib/styles/main.sass",
    "@chinese-fonts/bxzlzt/dist/标小智龙珠体/result.css",
    "~/assets/css/main.scss",
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
  runtimeConfig: {
    public: {
      buildTime: new Date().getTime(),
    },
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
