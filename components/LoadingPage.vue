<!--
 * @Description: 载入页面
 * @Author: Sunly
 * @Date: 2023-07-10 08:26:25
-->
<script lang="ts" setup>
// const randomChar = () => {
//   const n = ~~(Math.random() * (96 - 33)) + 33;
//   return String.fromCharCode(n);
// };
// const randomArr = new Array(9).fill(0);
// let randomIdx: number[] = [];

// const loadingText = ref("GAME TIME");
// const originText = "GAME TIME";
// const randomText = () => {
//   if (randomIdx.length < 3) {
//     const idx = ~~(Math.random() * 9);
//     if (!randomIdx.includes(idx)) {
//       randomIdx.push(idx);
//     }
//   }
//   const newIdx: number[] = [];
//   for (let i = 0; i < randomIdx.length; i++) {
//     randomArr[randomIdx[i]]++;
//     if (randomArr[randomIdx[i]] < 5) {
//       newIdx.push(randomArr[randomIdx[i]]);
//     }
//   }
//   let newText = "";
//   for (let i = 0; i < 9; i++) {
//     if (randomIdx.includes(i)) {
//       newText += randomChar();
//     } else {
//       newText += originText[i];
//     }
//   }
//   loadingText.value = newText;
//   randomIdx = newIdx;
// };

// const timer = setInterval(randomText, 80);

// onUnmounted(() => {
//   clearInterval(timer);
// });
</script>

<template>
  <div class="loading-page">
    <div class="loading-main">
      <img src="~/assets/images/logo.png" />
      <div class="text">GAME TIME</div>
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
  .loading-main {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      height: 200px;
      display: block;
    }
    .text {
      text-align: center;
      color: #ff39e8;
      font-size: 24px;
      // font-family: Menlo, Monaco, "Courier New", monospace;
    }
  }
}
</style>
