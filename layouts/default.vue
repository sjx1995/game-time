<!--
 * @Description: default layout
 * @Author: Sunly
 * @Date: 2023-05-21 13:59:57
-->
<script lang="ts" setup>
import { StorageNames } from "~/utils/enums";
import { useAppStore } from "~/store/app";

const router = useRouter();
const route = useRoute();
const appStore = useAppStore();

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
  <TopSnackbar />
  <v-app :class="{ shake: appStore.isShackBody }">
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
    <Footer />
  </v-app>
</template>

<style lang="scss" scoped>
main {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  min-height: calc(100vh - 64px - 80px - 24px);
}
.shake {
  animation: shake-animation 0.62s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  animation-iteration-count: 1;
}

@keyframes shake-animation {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
