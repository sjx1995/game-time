<!--
 * @Description: 游戏卡片
 * @Author: Sunly
 * @Date: 2023-07-11 03:07:50
-->
<script lang="ts" setup>
defineProps<{
  title: string;
  content: string[];
  appid: number;
}>();

const getGameImageUrl = (appid: number) => {
  return `https://cdn.akamai.steamstatic.com/steam/apps/${appid}/header.jpg?t=${new Date()
    .getTime()
    .toString()
    .slice(0, -3)}`;
};
</script>

<template>
  <div class="game-card">
    <img class="bg-img" :src="getGameImageUrl(appid)" />
    <div class="game-card-main">
      <div class="title">{{ title }}</div>
      <div class="content">
        <span>{{ content[0] }}</span>
        <span>{{ content[1] }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game-card {
  max-width: 950px;
  background: #222;
  color: #fff;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  .game-card-main {
    padding: 16px 24px;
    position: relative;
    background: linear-gradient(132deg, #222 0%, #223 67%, transparent 100%);
    .title {
      font-size: 1.5rem;
      font-weight: 400;
      line-height: 2rem;
    }
    .content {
      margin-top: 8px;
      line-height: 1.5rem;
      span {
        white-space: nowrap;
        margin-right: 16px;
      }
    }
  }
  .bg-img {
    position: absolute;
    top: -8px;
    right: 0;
    height: 170px;
    transition: all 0.3s;
  }
  &:hover {
    .bg-img {
      top: -32px;
      height: 186px;
    }
  }
}
</style>
