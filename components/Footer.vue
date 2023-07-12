<!--
 * @Description: 页脚
 * @Author: Sunly
 * @Date: 2023-07-12 15:16:10
-->
<script lang="ts" setup>
import { formatTime } from "~/utils/index";
const config = useRuntimeConfig();
const {
  public: { buildTime },
} = config;
console.log(buildTime, new Date().getTime() - buildTime);
</script>

<template>
  <footer>
    <div>
      Powered by Nuxt 🌈 Sunly
      {{
        "2023" +
        (new Date().getFullYear() <= 2023
          ? ""
          : " - " + new Date().getFullYear())
      }}
    </div>
    <div class="build-time">
      网站构建于
      {{ formatTime(~~(new Date().getTime() - buildTime)) }}
      前
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  height: 80px;
  margin-top: 24px;
  text-align: center;
  line-height: 40px;
  color: #aaa;
  .build-time {
    font-size: 14px;
    line-height: 24px;
  }
}
</style>
