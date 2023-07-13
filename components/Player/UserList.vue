<!--
 * @Description: 根据用户id获取用户信息
 * @Author: Sunly
 * @Date: 2023-07-10 22:34:31
-->
<script lang="ts" setup>
import { StorageNames } from "~/utils/enums";
import type { IPlayerInfo } from "~/server/api/players/info";

const playerListData = reactive({
  isLoading: true,
  isSuccess: false,
  errorMessage: "",
  players: [],
});

const getPlayerList = async () => {
  const recentSearchIds = useLocalStorage<string[]>(
    StorageNames.RECENT_USER_IDS,
    []
  );
  console.log("recentSearchIds", recentSearchIds.value);
  if (recentSearchIds.value.length === 0) {
    playerListData.isLoading = false;
    playerListData.isSuccess = true;
    return;
  }
  await nextTick(async () => {
    const data = await useFetch("/api/players/info", {
      params: {
        ids: recentSearchIds.value,
      },
    });
    console.log("user list", data.data.value);
    if (data.data.value?.success) {
      const playerList = data.data.value.data.players;
      console.log(playerList);
      playerListData.isLoading = false;
      playerListData.isSuccess = true;
      playerListData.players = [...playerList];
    } else {
      playerListData.isLoading = false;
      playerListData.isSuccess = false;
      playerListData.errorMessage = "获取用户信息失败";
    }
  });
};

onMounted(() => {
  console.log("mounted player info");
  getPlayerList();
});

const emits = defineEmits<{
  (event: "clickPlayer", steam64Id: IPlayerInfo): void;
}>();
</script>

<template>
  <div
    class="player-list-title"
    v-if="!(!playerListData.isLoading && !playerListData.isSuccess)"
  >
    最近查询玩家
  </div>
  <LoadingComponent v-if="playerListData.isLoading" />
  <div
    class="player-card"
    v-for="info of playerListData.players"
    @click="emits('clickPlayer', info)"
  >
    <img class="player-avatar" :src="info.avatarmedium" />
    <span class="player-name">
      {{ info.personaname }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.player-list-title {
  font-size: 1.75rem;
  font-weight: 400;
  line-height: 4rem;
}
.player-card {
  height: 32px;
  display: inline-block;
  border-radius: 16px;
  box-sizing: content-box;
  border: 1px solid rgba(251, 19, 255);
  user-select: none;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 8px;
  margin-right: 12px;
  &:hover {
    background-color: rgba(251, 19, 255, 0.6);
    color: #fff;
  }
  .player-avatar {
    width: 32px;
    height: 32px;
    border-radius: 16px;
  }
  .player-name {
    line-height: 32px;
    vertical-align: top;
    padding: 0px 12px 0 8px;
  }
}
</style>
