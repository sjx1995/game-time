<!--
 * @Description: index 主页
 * @Author: Sunly
 * @Date: 2023-05-15 06:19:50
-->
<script lang="ts" setup>
const router = useRouter();
</script>

<template>
  <HomeCard
    title="玩家信息"
    content="获取玩家游戏时间等"
    icon="mdi-account-outline"
    @click="() => router.push('/player')"
  />
</template>
