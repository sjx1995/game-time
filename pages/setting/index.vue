<!--
 * @Description: 修改个人信息
 * @Author: Sunly
 * @Date: 2023-05-21 14:22:10
-->
<script lang="ts" setup>
const mySteamWebApi = useLocalStorage("my-steam-web-api", "");
console.log(mySteamWebApi.value);

const router = useRouter();
const handleToHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="px-10 py-8">
    <div>
      <CommonIInput
        label="请输入 STEAM WEB API"
        v-model:value="mySteamWebApi"
      />
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        @click="handleToHome"
      >
        确定并返回首页
      </button>
    </div>

    <div class="border rounded-md p-4 mt-4">
      <div class="leading-8 text-lg">如何找到你的Steam Web API ?</div>
      <div>
        在
        <a
          class="text-blue-500 underline"
          href="https://steamcommunity.com/dev/apikey"
        >
          这里
        </a>
        查看你的Steam Web API密钥，将网页中的【密钥】输入在上面
      </div>
      <div class="font-bold">放心！这些数据只会保存在你的本地！</div>
    </div>
  </div>
</template>
