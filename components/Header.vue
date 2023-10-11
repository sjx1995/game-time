<!--
 * @Description: header
 * @Author: Sunly
 * @Date: 2023-05-21 14:00:42
-->
<script setup lang="ts">
import { StorageNames } from "~/utils/enums";

const router = useRouter();

// 小屏幕隐藏部分header元素
const { width } = useWindowSize();
console.log(width.value);
const tooNarrow = computed(() => width.value < 650);

const handleToHome = () => {
  router.push("/");
};

// 读取用户信息
const steamId = useSessionStorage(StorageNames.SESSION_STEAM_ID, "");
const steamName = useSessionStorage(StorageNames.SESSION_STEAM_NAME, "");
const steamImg = useSessionStorage(StorageNames.SESSION_STEAM_IMG, "");
const isLogin = computed(() => steamId.value !== "");
const handleClickPlayer = () => {
  let players = localStorage.getItem(StorageNames.RECENT_USER_IDS);
  if (players) {
    let playerList = JSON.parse(players) as string[];
    playerList = playerList.filter((id) => id !== steamId.value);
    playerList.unshift(steamId.value);
    localStorage.setItem(
      StorageNames.RECENT_USER_IDS,
      JSON.stringify(playerList)
    );
  }
  router.push(`/player/${steamId.value}/game-time`);
};

const handleLogout = () => {
  steamId.value = "";
  steamName.value = "";
  steamImg.value = "";
};
</script>

<template>
  <v-app-bar scroll-behavior="hide" rounded class="header">
    <div @click="handleToHome" class="logo-wrapper">
      <img src="~/assets/images/logo.png" width="48" height="48" />
      <v-app-bar-title v-if="!tooNarrow">GAME TIME</v-app-bar-title>
    </div>

    <v-spacer></v-spacer>

    <a
      class="btn-link"
      href="https://github.com/sjx1995/game-time"
      target="_blank"
      v-show="!tooNarrow"
    >
      <v-btn class="mr-2" prepend-icon="mdi-github" variant="tonal">
        GITHUB
      </v-btn>
    </a>

    <template v-if="isLogin">
      <v-menu location="bottom">
        <template v-slot:activator="{ props }">
          <div class="btn-user">
            <v-btn class="mr-2" v-bind="props" variant="tonal">
              <img :src="steamImg!" alt="steam avatar" />
              <span class="steam-name">
                {{ steamName }}
              </span>
            </v-btn>
          </div>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-btn
                prepend-icon="mdi-gamepad-square-outline"
                block
                class="justify-start"
                @click="handleClickPlayer"
              >
                查看我的游戏时间
              </v-btn>
            </v-list-item-title>
            <v-list-item-title>
              <v-btn
                prepend-icon="mdi-logout"
                block
                class="justify-start text-red"
                @click="handleLogout"
              >
                退出
              </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <template v-else>
      <a class="btn-link" href="/auth/steam">
        <v-btn class="mr-2" prepend-icon="mdi-steam" variant="tonal">
          登录 STEAM
        </v-btn>
      </a>
    </template>
  </v-app-bar>
</template>

<style lang="scss" scoped>
.header {
  .logo-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  img {
    margin-left: 16px;
  }
  .btn-link,
  .btn-user {
    color: #fff;
  }
  .btn-user {
    .steam-name {
      display: inline-block;
      max-width: 220px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      margin-left: 0;
      margin-right: 8px;
    }
  }
}
</style>
