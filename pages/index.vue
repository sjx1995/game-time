<!--
 * @Description: index 主页
 * @Author: Sunly
 * @Date: 2023-05-15 06:19:50
-->
<script lang="ts" setup>
const router = useRouter();
</script>

<template>
  <div class="main-card-container">
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
  </div>
</template>

<style lang="scss" scoped>
.main-card-container {
  width: 1200px;
  margin: 0 auto;
}
@media screen and (max-width: 1279px) {
  .main-card-container {
    width: 900px;
  }
}
@media screen and (max-width: 979px) {
  .main-card-container {
    width: 600px;
  }
}
@media screen and (max-width: 679px) {
  .main-card-container {
    width: 300px;
  }
}
</style>
