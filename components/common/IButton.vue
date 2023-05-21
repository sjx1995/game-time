<!--
 * @Description: button组件
 * @Author: Sunly
 * @Date: 2023-05-21 15:33:09
-->
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);

defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <button
    type="button"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    :class="
      props.disabled
        ? 'opacity-50 cursor-not-allowed'
        : 'opacity-100 cursor-pointer'
    "
    :disabled="props.disabled"
    @click="(e) => $emit('click', e)"
  >
    <slot></slot>
  </button>
</template>
