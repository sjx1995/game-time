<!--
 * @Description: card组件封装
 * @Author: Sunly
 * @Date: 2023-05-21 14:57:23
-->
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title?: string;
  }>(),
  {
    title: "",
  }
);
</script>
<template>
  <div
    class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <h5
      v-if="props.title"
      class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      {{ props.title }}
    </h5>
    <slot></slot>
  </div>
</template>
