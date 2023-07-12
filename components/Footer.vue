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
const buildTimeText = ref("");
const computedBuildTime = () => {
  buildTimeText.value = formatTime(~~(new Date().getTime() - buildTime));
};
computedBuildTime();
const timer = setInterval(computedBuildTime, 60 * 1000);
onUnmounted(() => {
  clearInterval(timer);
});
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
      构建于
      {{ buildTimeText === "0分钟" ? "刚刚" : `${buildTimeText} 前` }}
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
