<!--
 * @Description: 全局提示
 * @Author: Sunly
 * @Date: 2023-07-12 07:03:17
-->
<script lang="ts" setup>
import { useAppStore } from "~/store/app";

const appStore = useAppStore();
</script>

<template>
  <v-snackbar
    v-model="appStore.snackbar.visible"
    location="top"
    :color="appStore.snackbar.color"
    :timeout="3000"
  >
    {{ appStore.snackbar.message }}
  </v-snackbar>
</template>
