<!--
 * @Description: 载入页面
 * @Author: Sunly
 * @Date: 2023-07-10 08:26:25
-->

<template>
  <div class="loading-page">
    <div class="loading-main">
      <img src="~/assets/images/logo.png" />
      加载中 ^_^
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-page {
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(var(--v-theme-background));
  img {
    width: 300px;
    height: 300px;
    display: block;
  }
  .loading-main {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
}
</style>
