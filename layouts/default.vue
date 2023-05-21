<!--
 * @Description: default layout
 * @Author: Sunly
 * @Date: 2023-05-21 13:59:57
-->
<script lang="ts" setup>
const route = useRoute();

const userApi = ref(useLocalStorage("my-steam-web-api", ""));

const showMainMenu = ref(false);
watch(
  () => route.path,
  () => {
    if (userApi.value !== "") {
      showMainMenu.value = true;
    } else if (route.path === "/setting") {
      showMainMenu.value = true;
    } else {
      showMainMenu.value = false;
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <Header />
  <div v-show="showMainMenu">
    <slot />
  </div>
  <div class="text-center mt-6 text-2xl" v-show="!showMainMenu">
    请先点击右上角【设置】按钮，设置你的 STEAM WEB API
  </div>
</template>
