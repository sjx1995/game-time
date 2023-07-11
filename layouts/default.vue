<!--
 * @Description: default layout
 * @Author: Sunly
 * @Date: 2023-05-21 13:59:57
-->
<script lang="ts" setup>
import { StorageNames } from "~/utils/enums";
const router = useRouter();
const route = useRoute();

const userApi = useLocalStorage(StorageNames.WEB_API_KEY, "");
const showLoading = ref(true);

onMounted(() => {
  if (userApi.value === "") {
    if (route.path !== "/setting") {
      router.push("/setting");
    }
  }
  nextTick(() => {
    showLoading.value = false;
  });
});

router.beforeEach((to, from, next) => {
  const hasToken = userApi.value !== "";
  console.log(hasToken, to.path);
  if (!hasToken && to.path !== "/setting") {
    next("/setting");
  } else {
    next();
  }
});
</script>

<template>
  <LoadingPage v-if="showLoading" />
  <v-app>
    <Header />
    <main class="mt-16 px-10 pt-6">
      <v-alert
        v-if="userApi === '' && route.path === '/'"
        text="请先点击右上角 [设置] 你的 Steam Web API"
        type="warning"
        variant="outlined"
      ></v-alert>
      <slot />
    </main>
    <footer>
      Powered by Nuxt 🌈 Sunly
      {{
        "2023" +
        (new Date().getFullYear() > 2023
          ? ""
          : " - " + new Date().getFullYear())
      }}
    </footer>
  </v-app>
</template>

<style lang="scss" scoped>
main {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  min-height: calc(100vh - 64px - 24px - 40px);
}
footer {
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #aaa;
}
</style>
