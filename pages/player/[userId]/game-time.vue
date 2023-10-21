<!--
 * @Description: 查看用户最近游戏时长
 * @Author: Sunly
 * @Date: 2023-05-21 14:05:15
-->
<script lang="ts" setup>
import domToImage from "dom-to-image";
import { toDataURL as generateQrCode } from "qrcode";
import dayjs from "dayjs";
import { transMinToHour } from "~/utils";

const route = useRoute();
const router = useRouter();

definePageMeta({
  title: "玩家游戏信息",
});

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
        gameTimeData.errorMessage =
          "该用户近两周没有游戏记录或没有公开个人资料";
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

  nextTick(() => {
    getRecentTime();
    getPlayerInfo();
  });
});

const formatGameTimeText = (recentTime: number, allTime: number) => {
  return [
    `近两周游戏时长: ${transMinToHour(recentTime)}`,
    `总游戏时长: ${transMinToHour(allTime)}`,
  ];
};

const isSaving = ref(false);
const curTime = ref("");
const curOriginUrl = ref("");
const qrCodeUrl = ref("");
const isCapturing = ref(false);
const handleSaveCapture = async () => {
  const ele = document.querySelector("#capture-container");
  if (ele) {
    isSaving.value = true;
    curOriginUrl.value = window.location.origin;
    qrCodeUrl.value = await generateUrlQrCode();
    curTime.value = dayjs().format("YYYY-MM-DD HH:mm:ss");

    try {
      isCapturing.value = true;
      const dataUrl = await domToImage.toPng(ele, { bgcolor: "#efdbff" });
      isCapturing.value = false;
      const link = document.createElement("a");
      link.download = `${playerInfo.name}的最近游玩.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      isSaving.value = false;
      // qrCodeUrl.value = "";
    }
  }
};

const generateUrlQrCode = async () => {
  try {
    return await generateQrCode(window.location.href, {
      color: {
        dark: "#121212",
        light: "#00000000",
      },
    });
  } catch (error) {
    return "";
  }
};
</script>

<template>
  <div class="game-time-container">
    <div class="px-4">
      <v-btn
        prepend-icon="mdi-arrow-left"
        variant="tonal"
        @click="() => router.push('/player')"
      >
        返回
      </v-btn>
      <v-btn
        append-icon="mdi-crown-circle-outline"
        class="float-right"
        variant="tonal"
        @click="handleSaveCapture"
        :loading="isSaving"
        v-if="playerInfo.isSuccess"
      >
        生成游戏时间卡片
      </v-btn>
    </div>

    <div id="capture-container">
      <div id="info-wrapper" class="pa-4">
        <template v-if="gameTimeData.isLoading || playerInfo.isLoading">
          <LoadingComponent />
        </template>

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
            :text="playerInfo.errorMessage"
            type="warning"
            variant="outlined"
            class="mb-2"
          />

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
          />
        </template>
      </div>

      <div class="extra-info px-4 pt-4" v-show="isSaving">
        <div class="mb-4">
          <div class="info-title">Game Time</div>
          <div class="info-text">记录时间：{{ curTime }}</div>
          <div class="info-text">更多信息：{{ curOriginUrl }}</div>
        </div>
        <img
          class="qr-code mb-4"
          :src="qrCodeUrl"
          width="100"
          height="100"
          v-show="qrCodeUrl"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game-time-container {
  max-width: 950px;
  margin: 0 auto;
  #capture-container {
    overflow: hidden;
    #info-wrapper {
      background-color: rgb(var(--v-theme-background));
    }
    .extra-info {
      color: rgb(var(--v-theme-background));
      user-select: none;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      .info-title {
        font-weight: 700;
        font-size: 24px;
        margin-bottom: 8px;
      }
      .info-text {
        white-space: nowrap;
      }
      img.qr-code {
        border: 1px solid rgb(var(--v-theme-background));
        border-radius: 4px;
      }
    }
  }
}
</style>
