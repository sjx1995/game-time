/*
 * @Description: app store
 * @Author: Sunly
 * @Date: 2023-07-12 05:08:07
 */
import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "appStore",
  state: () => ({
    snackbar: {
      visible: false,
      color: "",
      message: "",
    },
    isShackBody: false,
  }),
  actions: {
    // 显示snackbar
    showSnackbar(msg: string, color = "error") {
      if (this.snackbar.visible) {
        return;
      }
      this.snackbar.message = msg;
      this.snackbar.color = color;
      this.snackbar.visible = true;
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
