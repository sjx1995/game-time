<!--
 * @Description: 3d卡片
 * @Author: Sunly
 * @Date: 2023-07-14 05:17:04
-->
<script lang="ts" setup>
const props = defineProps<{
  appId: number;
  name: string;
  price: string;
  windows_available: boolean;
  mac_available: boolean;
  linux_available: boolean;
  imgUrl: string;
}>();

const WRAPPER_WIDTH = 308;
const WRAPPER_HEIGHT = 176;
const moveContext = reactive({
  isEnter: false,
  centerX: 0,
  centerY: 0,
  distance: 0,
});
const cardTransformStyle = computed(() =>
  moveContext.isEnter
    ? `
      scale3d(1.3, 1.3, 1.3)
      rotate3d(
        ${moveContext.centerY / 100},
        ${-moveContext.centerX / 100},
        0,
        ${Math.log(moveContext.distance) * 2}deg
      )`
    : "scale3d(1, 1, 1) rotate3d(0, 0, 0, 0deg)"
);
const glowTransformStyle = computed(() =>
  moveContext.isEnter
    ? `
      radial-gradient(
        circle at
        ${moveContext.centerX * 2 + WRAPPER_WIDTH / 2}px
        ${moveContext.centerY * 2 + WRAPPER_HEIGHT / 2}px,
        #ffffff55,
        #0000000f
      )`
    : "transparent"
);
const shadowTransformStyle = computed(() =>
  moveContext.isEnter
    ? `
      ${moveContext.centerX / 6}px
      ${moveContext.centerY / 6}px
      100px rgba(255, 0, 242, 0.5),
      ${moveContext.centerX / 7}px
      ${moveContext.centerY / 7}px
      40px rgba(255, 0, 242, 0.5)`
    : "0 0 transparent"
);
const containerRef = ref<HTMLDivElement | null>(null);
const rotateToMouse = (e: MouseEvent) => {
  if (!moveContext.isEnter || !containerRef.value) return;
  let { left, top } = containerRef.value.getBoundingClientRect();
  left += 46;
  top += 32;
  const { pageX, pageY } = e;
  const absoluteX = pageX - left;
  const absoluteY = pageY - top;
  moveContext.centerX = absoluteX - WRAPPER_WIDTH / 2;
  moveContext.centerY = absoluteY - WRAPPER_HEIGHT / 2;
  moveContext.distance =
    Math.sqrt(moveContext.centerX ** 2 + moveContext.centerY ** 2) * 1.6;
};

const isOpen = ref(false);
const cardData = reactive({
  description: "",
  tags: [] as string[],
  developers: [] as string[],
  controller_support: false,
  date: "",
  isLoading: true,
});
const handleGetGameDetail = async () => {
  const { appId } = props;
  try {
    const data = await useFetch("/api/game/detail", {
      params: {
        appId,
      },
    });
    if (data.data.value?.success) {
      const res = data.data.value.data[appId].data;
      if ((res as any).success === false) {
        cardData.isLoading = false;
        return;
      }
      console.log(res);
      cardData.description = res.short_description;
      cardData.tags = res.categories.map((item) => item.description);
      cardData.developers = res.developers;
      cardData.controller_support = res.controller_support;
      cardData.date = res.release_date.date
        ? res.release_date.date
        : res.release_date.coming_soon
        ? "即将推出"
        : "未知";
    }
  } finally {
    cardData.isLoading = false;
  }
};
const handleCheckDetail = () => {
  isOpen.value = !isOpen.value;
  if (!cardData.isLoading) return;
  handleGetGameDetail();
};
</script>
<template>
  <div
    :class="{ 'game-card-container': true, flip: isOpen }"
    ref="containerRef"
    @mouseleave="
      () => {
        moveContext.isEnter = false;
        isOpen = false;
      }
    "
    @click="handleCheckDetail"
  >
    <div
      class="game-card-wrapper"
      :style="{ transform: cardTransformStyle }"
      @mousemove="rotateToMouse"
      @mouseenter="() => (moveContext.isEnter = true)"
    >
      <div
        class="game-card-shadow"
        :style="{ 'box-shadow': shadowTransformStyle }"
      ></div>
      <div class="game-card">
        <div class="game-detail">
          <LoadingComponent v-if="cardData.isLoading" />
          <template v-else>
            <div class="title">{{ name }}</div>
            <div class="platform">
              <template v-if="cardData.controller_support">
                <span class="mdi mdi-controller"></span> |
              </template>
              <span
                v-if="windows_available"
                class="mdi mdi-microsoft-windows"
              ></span>
              <span v-if="mac_available" class="mdi mdi-apple"></span>
              <span v-if="linux_available" class="mdi mdi-linux"></span>
            </div>
            <div class="desc">{{ cardData.description }}</div>
            <div class="info" v-if="cardData.developers.length">
              开发商:
              <span class="tag" v-for="dev of cardData.developers" :key="dev">
                {{ dev }}
              </span>
            </div>
            <div class="info" v-if="cardData.tags.length">
              标签:
              <span class="tag" v-for="tag of cardData.tags" :key="dev">
                {{ tag }}
              </span>
            </div>
            <div class="info" v-if="cardData.date">
              发售日期: {{ cardData.date }}
            </div>
            <div class="info">售价: {{ price }}</div>
          </template>
        </div>
        <img :src="imgUrl" />
        <div class="game-card-info">
          <div class="title">
            {{ name }}
          </div>
          <div class="info">
            {{ price }}
            <span>
              <span
                v-if="windows_available"
                class="mdi mdi-microsoft-windows"
              ></span>
              <span v-if="mac_available" class="mdi mdi-apple"></span>
              <span v-if="linux_available" class="mdi mdi-linux"></span>
            </span>
          </div>
        </div>
        <div class="glow" :style="{ background: glowTransformStyle }"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game-card-container {
  width: 400px;
  height: 240px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  &.flip {
    .game-detail {
      z-index: 1001 !important;
    }
    .game-card-wrapper {
      transform: rotateY(180deg) scale3d(1.5, 1.5, 1.5) !important;
    }
    .game-card-shadow {
      box-shadow: 0 0 100px 40px rgba(255, 0, 242, 0.5) !important;
    }
    .game-card-info {
      display: none;
    }
    .glow {
      background: transparent !important;
    }
  }
  .game-card-wrapper {
    position: relative;
    width: 308px;
    height: 176px;
    transition: all 0.2s ease-out;
    border-radius: 12px;
    .game-card-shadow {
      position: absolute;
      top: 5%;
      left: 5%;
      width: 90%;
      height: 90%;
      transition: all 0.2s ease-out;
      box-shadow: 0 0 transparent;
    }
    &:hover {
      .game-card-info {
        bottom: 0px !important;
        .title {
          margin-bottom: 0px !important;
        }
      }
    }
    .game-card {
      width: 100%;
      height: 100%;
      overflow: hidden;
      transform-style: preserve-3d;
      border-radius: 8px;
      box-shadow: 0 2px 12px -3px rgba(255, 0, 242, 0.5);
      background: #222;
      .game-detail {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        transform: rotateY(180deg);
        color: #fff;
        font-size: 12px;
        z-index: -1;
        padding: 6px;
        .title {
          font-weight: 700;
          font-size: 14px;
          width: 226px;
          overflow: hidden;
          text-overflow: ellipsis;
          text-wrap: nowrap;
        }
        .platform {
          position: absolute;
          top: 8px;
          right: 14px;
        }
        .desc {
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
        }
        .info {
          overflow: hidden;
          height: 18px;
          .tag {
            position: relative;
            padding: 0 4px;
            margin-left: 4px;
            display: inline-block;
            &::after {
              content: "";
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 6px;
              background: #c000ff66;
              border-radius: 4px;
            }
          }
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
      .game-card-info {
        position: absolute;
        bottom: -22px;
        height: 100px;
        width: 100%;
        padding: 0 18px;
        user-select: none;
        background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.65) 0%,
          rgba(0, 0, 0, 0.45) 60%,
          transparent 100%
        );
        transition: all 0.2s ease-out;
        .title {
          font-size: 18px;
          margin-top: 40px;
          margin-bottom: 12px;
          overflow: hidden;
          text-wrap: nowrap;
          text-overflow: ellipsis;
          transition: all 0.2s ease-out;
        }
        .info {
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          line-height: 24px;
          .mdi {
            font-size: 18px;
            margin-left: 8px;
          }
        }
      }
      .glow {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-image: radial-gradient(
          circle at 50% -20%,
          #ffffff22,
          #0000000f
        );
      }
    }
  }
}
</style>
