/*
 * @Description: app store
 * @Author: Sunly
 * @Date: 2023-07-12 05:08:07
 */
import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "appStore",
  state: () => ({
    isShowSnackbar: false,
    isShackBody: false,
  }),
  actions: {
    // 显示snackbar
    showSnackbar() {
      this.$state.isShowSnackbar = true;
    },
    // 错误晃动body
    shackBody() {
      if (this.$state.isShackBody) return;
      this.$state.isShackBody = true;
      setTimeout(() => {
        this.$state.isShackBody = false;
      }, 800);
    },
  },
});
