<!--
 * @Description: 输入要查询的用户id
 * @Author: Sunly
 * @Date: 2023-05-21 14:05:00
-->
<script lang="ts" setup>
import { StorageNames } from "~/utils/enums";
import { useAppStore } from "~/store/app";

const appStore = useAppStore();
const router = useRouter();

definePageMeta({
  title: "查询玩家信息",
});

// 获取好友列表
let steamId = null as null | string;
const showLoginTip = ref(false);
const friendIds = ref<string[]>([]);
const getFriends = async () => {
  const data = await useFetch("/api/players/friends", {
    params: {
      steamid: steamId,
    },
  });
  const res = data.data.value;
  if (res?.success) {
    friendIds.value = res.data.friendslist.friends.map(
      (person) => person.steamid
    );
  }
};
onMounted(() => {
  steamId = sessionStorage.getItem(StorageNames.SESSION_STEAM_ID);
  if (steamId) {
    nextTick(() => {
      getFriends();
    });
  } else {
    showLoginTip.value = true;
  }
});

// 监听用户退出状态
const userSteamId = useSessionStorage(StorageNames.SESSION_STEAM_ID, "");
watch(
  () => userSteamId.value,
  () => {
    if (!userSteamId.value) {
      friendIds.value = [];
      showLoginTip.value = true;
    }
  }
);

// 获取最近的玩家的id
const recentSearchIds = useLocalStorage<string[]>(
  StorageNames.RECENT_USER_IDS,
  []
);
const setRecentId = (id: string) => {
  const idx = recentSearchIds.value.findIndex((item) => item === id);
  if (idx !== -1) {
    recentSearchIds.value.splice(idx, 1);
  }
  recentSearchIds.value.unshift(id);
};

// 通过steamID查询玩家信息
const steam64id = ref("");
const handleQuery2WeekGameTime = () => {
  if (steam64id.value === "") {
    appStore.showSnackbar("请输入玩家的64位ID");
    appStore.shackBody();
    return;
  }
  setRecentId(steam64id.value);
  router.push(`/player/${steam64id.value}/game-time`);
};

// 查询具体玩家信息
const handleClickPlayer = (info: any) => {
  const { steamid } = info;
  setRecentId(steamid);
  router.push(`/player/${steamid}/game-time`);
};
</script>

<template>
  <div>
    <v-btn
      class="mb-4"
      prepend-icon="mdi-arrow-left"
      variant="tonal"
      @click="() => router.push('/')"
    >
      返回首页
    </v-btn>

    <v-alert
      v-if="showLoginTip"
      title="登录以查看你的好友数据"
      text='点击右上角的"登录STEAM"，即可查看你的所有好友数据'
      type="info"
      variant="outlined"
      class="mb-2"
    />

    <ClientOnly>
      <PlayerUserList
        title="好友列表"
        :user-ids="friendIds"
        @click-player="handleClickPlayer"
      />
    </ClientOnly>

    <ClientOnly>
      <PlayerUserList
        title="最近查询玩家"
        :user-ids="recentSearchIds"
        @click-player="handleClickPlayer"
      />
    </ClientOnly>

    <div class="search-player-title mt-6">通过64位ID查询玩家信息</div>
    <v-text-field
      label="玩家的64位ID"
      v-model:model-value="steam64id"
    ></v-text-field>

    <v-btn
      class="mb-4"
      prepend-icon="mdi-account-search-outline"
      variant="tonal"
      @click="handleQuery2WeekGameTime"
    >
      查询玩家信息
    </v-btn>

    <v-expansion-panels>
      <v-expansion-panel title="如何查看64位steam id ?">
        <v-expansion-panel-text>
          <div class="tip-content">
            <p>打开steam主页，地址栏中的数字就是64位steam id</p>
            <p>
              如果设置了自定义URL，可以通过
              <a
                class="text-blue-500 underline"
                href="https://steamid.io/lookup/"
                target="_blank"
                >STEAM I/O</a
              >
              查看64位steam id:
            </p>
            <p>1. 粘贴要查询玩家的steam主页地址</p>
            <p>2. 点击lookup</p>
            <p>
              3. steamID64就是要查询玩家的64位steam id，粘贴到上面，然后继续！
            </p>
            <img src="~/assets/images/steamid-io-tip.png" />
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style lang="scss" scoped>
.search-player-title {
  font-size: 1.75rem;
  font-weight: 400;
  margin-bottom: 0.25rem;
}
.tip-content {
  p {
    line-height: 32px;
  }
  img {
    width: 400px;
    margin-top: 16px;
    max-width: 100%;
  }
}
</style>
