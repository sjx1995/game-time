<!--
 * @Description: 玩家信息
 * @Author: Sunly
 * @Date: 2023-07-11 04:34:29
-->
<script lang="ts" setup>
import { OnlineStatus as onlineStatusText } from "~/utils/enums";
import { formatTime, transMinToHour } from "~/utils";

defineProps<{
  avatar: string;
  name: string;
  playingGame: string;
  onlineStatus: number;
  lastOnline: number;
  recentTime: number;
}>();
</script>

<template>
  <div class="player-card">
    <img :src="avatar" />
    <div class="player-info">
      <div class="player-name">
        {{ name }}
      </div>
      <div class="player-extra-info">
        <div>
          <span class="status-circle">
            {{
              playingGame !== ""
                ? "🎮 "
                : onlineStatus === 0
                ? "👻 "
                : onlineStatus === 1
                ? "🟢 "
                : onlineStatus === 2
                ? "🔴 "
                : onlineStatus === 3
                ? "🔴 "
                : onlineStatus === 4
                ? "😴 "
                : onlineStatus === 5
                ? "💰 "
                : onlineStatus === 6
                ? "👋 "
                : ""
            }}
          </span>
          <span>{{
            onlineStatus === 0
              ? `${onlineStatusText[0]} 上次在线 ${formatTime(
                  new Date().getTime() - lastOnline
                )} 前`
              : playingGame !== ""
              ? `游戏中: ${playingGame}`
              : onlineStatusText[onlineStatus]
          }}</span>
        </div>
        <div v-if="recentTime !== 0">
          近两周游戏时长: {{ transMinToHour(recentTime) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.player-card {
  max-width: 950px;
  border-radius: 12px;
  background: #222;
  padding: 24px 0;
  &:hover {
    img {
      box-shadow: 0 0 16px 2px rgba(255, 0, 204, 0.6);
    }
  }
  img {
    width: 135px;
    height: 135px;
    border-radius: 8px;
    margin-left: 24px;
    transition: all 0.3s;
  }
  .player-info {
    display: inline-block;
    vertical-align: top;
    margin-left: 24px;
    .player-name {
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 4rem;
    }
    .player-extra-info {
      line-height: 2rem;
    }
  }
}
</style>
