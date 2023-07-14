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
    title="游戏推荐"
    content="新游 特惠 热销"
    icon="mdi-controller"
    @click="() => router.push('/game/recommend')"
  />
  <HomeCard
    title="玩家信息"
    content="玩家信息 游戏时间"
    icon="mdi-account-outline"
    @click="() => router.push('/player')"
  />
</template>
