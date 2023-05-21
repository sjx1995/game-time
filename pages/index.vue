<!--
 * @Description: index 主页
 * @Author: Sunly
 * @Date: 2023-05-15 06:19:50
-->
<script lang="ts" setup>
const router = useRouter();
</script>

<template>
  <div class="px-10 py-6">
    <CommonIButton @click="() => router.push('/player')">
      查看玩家信息
    </CommonIButton>
  </div>
</template>
