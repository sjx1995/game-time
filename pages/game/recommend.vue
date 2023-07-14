<!--
 * @Description: 游戏推荐
 * @Author: Sunly
 * @Date: 2023-07-14 08:14:31
-->
<script lang="ts" setup>
import { IFeaturedCategory } from "~/utils/enums";

const router = useRouter();

const recommends = reactive({
  specials: [],
  coming_soon: [],
  top_sellers: [],
  new_releases: [],
  isLoading: true,
  isSuccess: false,
  errMessage: "",
});
const getRecommendGames = async () => {
  try {
    const data = await useFetch("/api/game/featuredcategories");
    if (data.data.value?.success) {
      Object.keys(data.data.value.data).forEach((key) => {
        if (
          ["specials", "coming_soon", "top_sellers", "new_releases"].includes(
            key
          )
        ) {
          const { id, name, items } = data.data.value.data[key];
          recommends[key] = {
            id,
            name,
            items: items.map((item) => ({
              ...item,
              final_price:
                key === "coming_soon" && item.final_price === 0
                  ? "即将推出"
                  : item.final_price === 0
                  ? "免费"
                  : `¥ ${item.final_price / 100}`,
            })),
          };
        }
      });
    }
    recommends.isSuccess = true;
    console.log(recommends);
  } catch (error: any) {
    recommends.isSuccess = false;
    recommends.errMessage = error.message;
  } finally {
    recommends.isLoading = false;
  }
};

onMounted(() => {
  nextTick(() => {
    getRecommendGames();
  });
});
</script>

<template>
  <v-btn
    class="ml-11"
    prepend-icon="mdi-arrow-left"
    variant="tonal"
    @click="() => router.push('/')"
  >
    返回首页
  </v-btn>

  <LoadingComponent v-if="recommends.isLoading" />

  <template v-else>
    <div class="recommends" v-if="recommends.isSuccess">
      <template v-for="(list, key) of recommends" :key="list.id">
        <div class="game-block" v-if="list.items">
          <div class="recommends-title-wrapper">
            <div class="recommends-title">
              {{ IFeaturedCategory[key] }}
            </div>
          </div>
          <div>
            <GameRecommendCard
              v-for="item of list.items"
              :key="item.id"
              :img-url="item.large_capsule_image"
              :name="item.name"
              :price="item.final_price"
              :windows_available="item.windows_available"
              :mac_available="item.mac_available"
              :linux_available="item.linux_available"
            />
          </div>
        </div>
      </template>
    </div>

    <v-alert
      v-else
      title="获取数据失败"
      :text="recommends.errMessage"
      type="warning"
      variant="outlined"
    ></v-alert>
  </template>
</template>

<style lang="scss" scoped>
.recommends {
  width: 1200px;
  margin: 0 auto;
  .game-block {
    position: relative;
    display: flex;
    .recommends-title-wrapper {
      position: sticky;
      height: 200px;
      top: 60px;
      .recommends-title {
        position: absolute;
        font-size: 24px;
        font-weight: 700;
        right: 8px;
        top: 28px;
        color: #ddd;
      }
    }
  }
}
@media screen and (max-width: 1199px) {
  .recommends {
    width: 800px;
  }
}
@media screen and (max-width: 799px) {
  .recommends {
    width: 400px;
  }
}
</style>
