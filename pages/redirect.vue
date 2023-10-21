<!--
 * @Description: 重定向
 * @Author: Sunly
 * @Date: 2023-10-11 02:20:54
-->
<script setup lang="ts">
import { StorageNames } from "~/utils/enums";

definePageMeta({
  title: "跳转中",
});

const route = useRoute();
const router = useRouter();

onMounted(() => {
  const steamId = route.query[StorageNames.SESSION_STEAM_ID];
  const steamName = route.query[StorageNames.SESSION_STEAM_NAME];
  const steamImg = route.query[StorageNames.SESSION_STEAM_IMG];

  if (
    typeof steamId === "string" &&
    typeof steamName === "string" &&
    typeof steamImg === "string"
  ) {
    sessionStorage.setItem(StorageNames.SESSION_STEAM_ID, steamId);
    sessionStorage.setItem(StorageNames.SESSION_STEAM_NAME, steamName);
    sessionStorage.setItem(StorageNames.SESSION_STEAM_IMG, steamImg);
  }

  router.replace({ path: "/" });
});
</script>

<template></template>
