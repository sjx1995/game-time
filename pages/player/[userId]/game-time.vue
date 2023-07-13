<!--
 * @Description: 查看用户最近游戏时长
 * @Author: Sunly
 * @Date: 2023-05-21 14:05:15
-->
<script lang="ts" setup>
import { transMinToHour } from "~/utils";

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
      appid: number;
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

const getRecentTime = async () => {
  try {
    const data = await useFetch("/api/game-time/recent", {
      params: {
        steamid: steam64Id,
      },
    });
    if (data.data.value?.success) {
      if (data.data.value.data.total_count === 0) {
        gameTimeData.isSuccess = false;
        gameTimeData.errorMessage = "该用户近两周没有游戏记录";
        return;
      }
      let totalTime = 0;
      const games = data.data.value.data.games.map(
        ({ name, playtime_2weeks, playtime_forever, appid }) => {
          totalTime += playtime_2weeks;
          return {
            name,
            recentTime: playtime_2weeks,
            allTime: playtime_forever,
            appid,
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
      gameTimeData.errorMessage = "请求近两周游戏记录失败";
    }
  } catch (error: any) {
    gameTimeData.isSuccess = false;
    gameTimeData.errorMessage = error.message;
  } finally {
    gameTimeData.isLoading = false;
  }
};

const playerInfo = reactive<{
  avatar: string;
  name: string;
  playingGame: string;
  onlineStatus: number;
  lastOnline: number;
  recentTime: number;
  isSuccess: boolean;
  isLoading: boolean;
  errorMessage: string;
}>({
  avatar: "",
  name: "",
  playingGame: "",
  onlineStatus: 0,
  lastOnline: 0,
  recentTime: 0,
  isSuccess: false,
  isLoading: true,
  errorMessage: "",
});

const getPlayerInfo = async () => {
  try {
    const data = await useFetch("/api/players/info", {
      params: {
        ids: steam64Id,
      },
    });
    if (data.data.value?.success && data.data.value.data.players.length > 0) {
      const info = data.data.value.data.players[0];
      playerInfo.avatar = info.avatarfull;
      playerInfo.name = info.personaname;
      playerInfo.playingGame = info.gameextrainfo || "";
      playerInfo.onlineStatus = info.personastate;
      playerInfo.lastOnline = info.lastlogoff * 1000;
      playerInfo.isSuccess = true;
    } else {
      playerInfo.isSuccess = false;
      playerInfo.errorMessage = "获取用户信息失败";
    }
  } catch (error: any) {
    playerInfo.isSuccess = false;
    playerInfo.errorMessage = error.message;
  } finally {
    playerInfo.isLoading = false;
  }
};

onMounted(async () => {
  gameTimeData.isLoading = true;

  getRecentTime();
  getPlayerInfo();
});

const formatGameTimeText = (recentTime: number, allTime: number) => {
  return `近两周游戏时长: ${transMinToHour(recentTime)}
  \u00a0
  总游戏时长: ${transMinToHour(allTime)}`;
};
</script>

<template>
  <v-btn
    class="mb-8"
    prepend-icon="mdi-arrow-left"
    variant="tonal"
    @click="() => router.push('/player')"
  >
    返回
  </v-btn>

  <div v-if="gameTimeData.isLoading || playerInfo.isLoading">
    <LoadingComponent />
  </div>

  <template v-else>
    <PlayerInfoCard
      v-if="playerInfo.isSuccess"
      class="mb-2"
      :avatar="playerInfo.avatar"
      :name="playerInfo.name"
      :playingGame="playerInfo.playingGame"
      :onlineStatus="playerInfo.onlineStatus"
      :lastOnline="playerInfo.lastOnline"
      :recentTime="gameTimeData.data.totalTime"
    />
    <v-alert
      v-else
      title="没有数据"
      :text="gameTimeData.errorMessage"
      type="warning"
      variant="outlined"
    ></v-alert>

    <template v-if="gameTimeData.isSuccess">
      <GameInfoCard
        class="mb-2"
        v-for="item in gameTimeData.data.games"
        :key="item.name"
        :title="item.name"
        :content="formatGameTimeText(item.recentTime, item.allTime)"
        :appid="item.appid"
      />
    </template>
    <v-alert
      v-else
      title="没有数据"
      :text="gameTimeData.errorMessage"
      type="warning"
      variant="outlined"
    ></v-alert>
  </template>
</template>
