<!--
 * @Description: 修改个人信息
 * @Author: Sunly
 * @Date: 2023-05-21 14:22:10
-->
<script lang="ts" setup>
import { StorageNames } from "~/utils/enums";

const mySteamWebApi = useLocalStorage(StorageNames.WEB_API_KEY, "");

const router = useRouter();

const showSnackbar = ref(false);
const handleToHome = () => {
  if (mySteamWebApi.value === "") {
    showSnackbar.value = true;
    return;
  }
  router.push("/");
};
</script>

<template>
  <v-snackbar v-model="showSnackbar" location="top" color="error">
    请填写 Steam Web API
  </v-snackbar>

  <div>
    <v-btn
      class="mb-8"
      prepend-icon="mdi-arrow-left"
      variant="tonal"
      @click="handleToHome"
    >
      返回首页
    </v-btn>

    <v-alert
      class="mb-8"
      icon="mdi-lock-check"
      title="放心！"
      text="这些数据只会保存在你的本地！"
      type="success"
      variant="outlined"
    ></v-alert>

    <v-text-field
      class="mb-8"
      label="Steam WEB API"
      v-model:model-value="mySteamWebApi"
    ></v-text-field>

    <v-expansion-panels>
      <v-expansion-panel title="如何找到你的Steam Web API ?">
        <v-expansion-panel-text>
          在
          <a
            class="text-blue-500 underline"
            href="https://steamcommunity.com/dev/apikey"
          >
            这里
          </a>
          查看你的Steam Web API密钥，将网页中的【密钥】输入在上面
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
