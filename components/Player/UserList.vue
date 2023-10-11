<!--
 * @Description: 根据用户id获取用户信息
 * @Author: Sunly
 * @Date: 2023-07-10 22:34:31
-->
<script lang="ts" setup>
import type { IPlayerInfo } from "~/server/api/players/info";

const props = defineProps<{
  title: string;
  userIds: string[];
}>();

const playerListData = reactive({
  isSuccess: false,
  errorMessage: "",
  players: [] as IPlayerInfo[],
});

const getPlayerList = async () => {
  await nextTick(async () => {
    const data = await useFetch("/api/players/info", {
      params: {
        ids: props.userIds,
      },
    });
    if (data.data.value?.success) {
      const playerList = data.data.value.data.players;
      playerListData.isSuccess = true;
      playerListData.players = [...playerList];
    } else {
      playerListData.isSuccess = false;
      playerListData.errorMessage = "获取用户信息失败";
    }
  });
};

watch(
  () => props.userIds.length,
  () => {
    if (props.userIds.length) {
      getPlayerList();
    } else {
      playerListData.isSuccess = false;
      playerListData.players = [];
    }
  },
  {
    immediate: true,
  }
);

const emits = defineEmits<{
  (event: "clickPlayer", steam64Id: IPlayerInfo): void;
}>();
</script>

<template>
  <div>
    <div
      class="player-list-title mt-6"
      v-show="playerListData.isSuccess && playerListData.players.length"
    >
      {{ title }}
    </div>
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
  </div>
</template>

<style lang="scss" scoped>
.player-list-title {
  font-size: 1.75rem;
  font-weight: 400;
  margin-bottom: 0.25rem;
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
