<!--
 * @Description: default layout
 * @Author: Sunly
 * @Date: 2023-05-21 13:59:57
-->
<script lang="ts" setup>
import { useAppStore } from "~/store/app";

const appStore = useAppStore();

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
    <Header />
    <main class="mt-16 px-10 pt-6">
      <slot />
    </main>
    <Footer />
  </v-app>
</template>

<style lang="scss" scoped>
main {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  min-height: calc(100vh - 64px - 80px - 60px);
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
