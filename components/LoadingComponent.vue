<!--
 * @Description: 加载组件
 * @Author: Sunly
 * @Date: 2023-07-10 21:19:32
-->
<template>
  <div class="loading-container">
    <v-progress-circular
      indeterminate
      color="#fc00ff"
      :size="80"
      :width="6"
    ></v-progress-circular>
    <img src="~/assets/images/logo.png" />
  </div>
</template>

<style lang="scss" scoped>
.loading-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  img {
    width: 56px;
    height: 56px;
    position: absolute;
    animation: infinityRotate-cc22637a 0.6s ease-in-out infinite;
  }
}

@keyframes infinityRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
