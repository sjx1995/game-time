<!--
 * @Description: 主页卡片
 * @Author: Sunly
 * @Date: 2023-07-10 12:11:30
-->
<script lang="ts" setup>
defineProps<{
  title: string;
  content: string;
  icon: string;
}>();
</script>

<template>
  <div class="home-card">
    <div class="home-card-content">
      <h2>{{ title }}</h2>
      <p>{{ content }}</p>
      <v-icon class="bg-icon">{{ icon }}</v-icon>
    </div>
  </div>
</template>

<style lang="scss">
.home-card {
  background-color: #222;
  padding: 20px;
  margin: 16px 20px;
  display: inline-block;
  width: 260px;
  height: 140px;
  position: relative;
  user-select: none;
  cursor: pointer;
  z-index: 999;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    left: -5px;
    margin: auto;
    width: 270px;
    height: 150px;
    border-radius: 10px;
    background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100%);
    z-index: -10;
    pointer-events: none;
  }
  &:hover::after {
    content: "";
    z-index: -1;
    position: absolute;
    inset: 0;
    background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100%);
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: translate3d(0, 0, 0) scale(0.95);
    filter: blur(20px);
  }
  .home-card-content {
    background-color: #222;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 16px;
    border-radius: 8px;
    background-color: rgba(40, 40, 40, 1);
    overflow: hidden;
  }
  &:hover {
    .bg-icon {
      color: #fc65ff9b;
    }
  }

  h2 {
    font-size: 24px;
    font-weight: 700;
    margin: 0;
  }
  p {
    font-size: 14px;
    margin: 0;
    margin-top: 10px;
    color: rgba(255, 255, 255, 0.8);
  }
  .bg-icon {
    position: absolute;
    right: -54px;
    bottom: -54px;
    font-size: 210px;
    color: rgba(255, 255, 255, 0.3);
    z-index: 1;
  }
}
</style>
