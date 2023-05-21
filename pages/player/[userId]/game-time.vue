<!--
 * @Description: 查看用户最近游戏时长
 * @Author: Sunly
 * @Date: 2023-05-21 14:05:15
-->
<script lang="ts" setup>
const route = useRoute();
const router = useRouter();

const steam64Id = route.params.userId.toString();
const gameTimeData = reactive<{
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: string;
  data: {
    totalTime: number;
    perDayTime: number;
    games: {
      name: string;
      recentTime: number;
      allTime: number;
    }[];
  };
}>({
  isLoading: true,
  isSuccess: false,
  errorMessage: "",
  data: {
    perDayTime: 0,
    totalTime: 0,
    games: [],
  },
});
onMounted(async () => {
  gameTimeData.isLoading = true;
  const key = localStorage.getItem("my-steam-web-api");
  if (!key) {
    return;
  }
  try {
    const data = await useFetch("/api/game-time/recent", {
      params: {
        key,
        steamid: steam64Id,
      },
    });
    console.log(data.data.value);
    if (data.data.value?.success) {
      let totalTime = 0;
      const games = data.data.value.data.games.map(
        ({ name, playtime_2weeks, playtime_forever }) => {
          totalTime += playtime_2weeks;
          return {
            name,
            recentTime: playtime_2weeks,
            allTime: playtime_forever,
          };
        }
      );
      gameTimeData.data = {
        totalTime,
        perDayTime: Math.round(totalTime / 14),
        games,
      };
      gameTimeData.isSuccess = true;
    } else {
      gameTimeData.isSuccess = false;
      gameTimeData.errorMessage = "请求失败";
      console.log("err", gameTimeData);
    }
  } catch (error: any) {
    gameTimeData.isSuccess = false;
    gameTimeData.errorMessage = error.message;
  } finally {
    gameTimeData.isLoading = false;
  }
});
</script>

<template>
  <div class="px-10 py-8">
    <CommonIButton @click="() => router.push('/player')">返回</CommonIButton>
    <CommonICard
      v-if="!gameTimeData.isLoading && gameTimeData.isSuccess"
      :title="`${route.params.userId} 的近两周游戏时长: ${gameTimeData.data.totalTime} 分钟`"
    >
      <div>
        <div class="text-lg">
          <span v-if="gameTimeData.data.totalTime > 60">
            近两周总游戏时长
            {{ Math.floor(gameTimeData.data.totalTime / 60) }}小时{{
              gameTimeData.data.totalTime % 60
            }}分钟，
          </span>
          近两周平均
          {{ gameTimeData.data.perDayTime }}分钟/天
          <span v-if="gameTimeData.data.perDayTime > 60">
            (
            {{ Math.floor(gameTimeData.data.perDayTime / 60) }}小时{{
              gameTimeData.data.perDayTime % 60
            }}分钟/天 )
          </span>
        </div>
        <div v-for="item in gameTimeData.data.games" class="leading-10 text-xl">
          <div class="font-bold text-2xl mt-8 leading-10">{{ item.name }}</div>
          <div>
            近两周游戏时长：
            <span class="font-bold"> {{ item.recentTime }} </span>
            分钟
            <span v-if="item.recentTime > 60">
              ({{ Math.floor(item.recentTime / 60) }}小时{{
                item.recentTime % 60
              }}分钟)
            </span>
          </div>
          <div>
            总游戏时长：
            <span class="font-bold"> {{ item.allTime }} </span>
            分钟
            <span v-if="item.allTime > 60">
              ({{ Math.floor(item.allTime / 60) }}小时{{
                item.allTime % 60
              }}分钟)
            </span>
          </div>
        </div>
      </div>
    </CommonICard>
    <div v-else-if="gameTimeData.isLoading">加载中...</div>
    <div>{{ gameTimeData.errorMessage }}</div>
  </div>
</template>
