<!--
 * @Description: default layout
 * @Author: Sunly
 * @Date: 2023-05-21 13:59:57
-->
<script lang="ts" setup>
import { useAppStore } from "~/store/app";
import ToTop from "~/components/ToTop.vue";

const appStore = useAppStore();
const route = useRoute();

useSeoMeta({
  title: "GAME TIME",
  description: "查看Steam游戏信息",
});

watch(
  () => route.meta?.title,
  () => {
    useHead({
      title: `${route.meta.title ? route.meta.title + "丨" : ""}GAME TIME`,
    });
  },
  {
    immediate: true,
  }
);

const showLoading = ref(true);
onMounted(() => {
  nextTick(() => {
    showLoading.value = false;
  });
});
</script>

<template>
  <LoadingPage v-if="showLoading" />
  <TopSnackbar />
  <v-app :class="{ shake: appStore.isShackBody }">
    <ClientOnly>
      <Header />
    </ClientOnly>
    <main class="mt-16 pt-6">
      <slot />
      <ToTop />
    </main>
    <Footer />
  </v-app>
</template>

<style lang="scss" scoped>
main {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding-left: 40px;
  padding-right: 40px;
  min-height: calc(100vh - 64px - 80px - 60px);
}
@media screen and (max-width: 600px) {
  main {
    padding-left: 24px;
    padding-right: 24px;
  }
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
