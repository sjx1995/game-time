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

const recentSearchIds = useLocalStorage<string[]>(
  StorageNames.RECENT_USER_IDS,
  []
);

const steam64id = ref("");
const handleQuery2WeekGameTime = () => {
  if (steam64id.value === "") {
    appStore.showSnackbar("请输入玩家的64位ID");
    appStore.shackBody();
    return;
  }

  const idx = recentSearchIds.value.findIndex(
    (item) => item === steam64id.value
  );
  if (idx !== -1) {
    recentSearchIds.value.splice(idx, 1);
  }
  recentSearchIds.value.unshift(steam64id.value);
  router.push(`/player/${steam64id.value}/game-time`);
};

const handleClickPlayer = (info: any) => {
  router.push(`/player/${info.steamid}/game-time`);
};
</script>

<template>
  <div>
    <v-btn
      class="mb-8"
      prepend-icon="mdi-arrow-left"
      variant="tonal"
      @click="() => router.push('/')"
    >
      返回首页
    </v-btn>

    <PlayerUserList class="mb-8" @click-player="handleClickPlayer" />

    <div class="search-player-title">查询新玩家信息</div>
    <v-text-field
      label="玩家的64位ID"
      v-model:model-value="steam64id"
    ></v-text-field>

    <v-btn
      class="mb-8"
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
  line-height: 4rem;
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
