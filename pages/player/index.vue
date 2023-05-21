<!--
 * @Description: 输入要查询的用户id
 * @Author: Sunly
 * @Date: 2023-05-21 14:05:00
-->
<script lang="ts" setup>
const recentSearchIds = useLocalStorage<string[]>("recent-search-ids", []);

const router = useRouter();
const steam64id = ref("");
const handleQuery2WeekGameTime = () => {
  const idx = recentSearchIds.value.findIndex(
    (item) => item === steam64id.value
  );
  if (idx !== -1) {
    recentSearchIds.value.splice(idx, 1);
  }
  recentSearchIds.value.unshift(steam64id.value);
  router.push(`/player/${steam64id.value}/game-time`);
};
</script>

<template>
  <div class="px-10 py-6">
    <CommonIInput label="请输入要查询玩家的64位ID" v-model:value="steam64id" />
    <CommonIButton @click="handleQuery2WeekGameTime" :disabled="!steam64id">
      查询最近2周游戏记录
    </CommonIButton>

    <div class="border rounded-md p-4 mt-4">
      <div class="leading-8 text-lg">如何查看64位steam id ?</div>
      <div>打开steam主页，地址栏中的数字就是64位steam id</div>
      <div>
        如果设置了自定义URL，可以通过
        <a class="text-blue-500 underline" href="https://steamid.io/lookup/"
          >STEAM I/O</a
        >
        查看你的64位steam id:
      </div>
      <div>1. 粘贴要查询玩家的steam主页地址</div>
      <div>2. 点击lookup</div>
      <div>
        3. steamID64就是要查询玩家的64位steam id，粘贴到上面，然后继续！
      </div>
      <img src="~/assets/images/steamid-io-tip.png" />
    </div>

    <div v-if="recentSearchIds.length" class="border rounded-md mt-6">
      <div class="leading-10 border-b pl-4">最近搜索记录 (点击填入) ：</div>
      <div
        class="leading-10 border m-4 rounded-md pl-6 cursor-pointer hover:bg-gray-200"
        v-for="item of recentSearchIds"
        @click="() => (steam64id = item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>
