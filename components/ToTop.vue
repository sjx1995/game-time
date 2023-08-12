<!--
 * @Description: 
 * @Author: Sunly
 * @Date: 2023-08-12 07:00:20
-->
<script lang="ts" setup>
import { useScroll } from "@vueuse/core";

const showBtn = ref(false);
let posY = ref(0);

onMounted(() => {
  const el = document.body as HTMLBodyElement;
  const { y } = useScroll(el, { behavior: "smooth" });

  posY = y;

  watch(
    () => y.value,
    () => {
      if (y.value > 100) {
        showBtn.value = true;
      } else {
        showBtn.value = false;
      }
    }
  );
});

const handleToTop = () => {
  posY.value = 0;
};
</script>

<template>
  <v-btn
    id="to-top"
    icon="mdi-arrow-up"
    size="x-large"
    v-show="showBtn"
    @click="handleToTop"
  />
</template>

<style lang="scss" scoped>
#to-top {
  position: fixed;
  right: 20px;
  background-color: rgba(255, 0, 242, 0.5);
  bottom: 20px;
  z-index: 999;
}
</style>
