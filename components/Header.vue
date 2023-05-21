<!--
 * @Description: header
 * @Author: Sunly
 * @Date: 2023-05-21 14:00:42
-->
<script lang="ts" setup>
const router = useRouter();
const route = useRoute();
</script>

<template>
  <div class="h-16 leading-[4] bg-slate-200 flex justify-between">
    <div class="w-28 text-center">
      <NuxtLink to="/">
        <div>Steam Info</div>
      </NuxtLink>
    </div>
    <div>
      <CommonIButton v-if="route.path !== '/'" @click="() => router.push('/')">
        返回首页
      </CommonIButton>
      <CommonIButton @click="() => router.push('/setting')">
        设置
      </CommonIButton>
    </div>
  </div>
</template>
