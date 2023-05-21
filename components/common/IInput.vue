<!--
 * @Description: 封装input组件 
 * @Author: Sunly
 * @Date: 2023-05-21 14:46:29
-->
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    value: string;
  }>(),
  {
    label: "",
    placeholder: "Please input",
  }
);

const emit = defineEmits<{
  (e: "update:value", value: string): void;
}>();

const inputVal = computed({
  get() {
    console.log("get", props.value);
    return props.value;
  },
  set(val) {
    console.log("set", val);
    emit("update:value", val);
  },
});
</script>

<template>
  <div>
    <label
      v-if="label"
      for="first_name"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {{ props.label }}
    </label>
    <input
      type="text"
      id="first_name"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :placeholder="placeholder"
      v-model="inputVal"
    />
  </div>
</template>
