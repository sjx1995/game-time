/*
 * @Description: 推荐游戏
 * @Author: Sunly
 * @Date: 2023-07-14 09:55:32
 */
import axios from "axios";
import { StorageNames, IFeaturedCategory } from "~/utils/enums";

type IGameDetail = {
  id: number;
  type: number;
  name: string;
  discounted: boolean;
  discount_percent: number;
  original_price: number;
  final_price: number;
  currency: string;
  large_capsule_image: string;
  small_capsule_image: string;
  windows_available: boolean;
  mac_available: boolean;
  linux_available: boolean;
  streamingvideo_available: boolean;
  discount_expiration: number;
  header_image: string;
  controller_support: string;
};

type IFeaturedCategories = {
  specials: {
    name: IFeaturedCategory.specials;
    items: IGameDetail[];
  };
  coming_soon: {
    name: IFeaturedCategory.coming_soon;
    items: IGameDetail[];
  };
  top_sellers: {
    name: IFeaturedCategory.top_sellers;
    items: IGameDetail[];
  };
  new_releases: {
    name: IFeaturedCategory.new_releases;
    items: IGameDetail[];
  };
};

type IGetRecentGameTime =
  | {
      success: boolean;
      data: IFeaturedCategories;
    }
  | {
      success: false;
      errorMessage: string;
    };

export default defineEventHandler(async (): Promise<IGetRecentGameTime> => {
  try {
    const key = process.env[StorageNames.WEB_API_KEY];
    const res = await axios({
      url: "https://store.steampowered.com/api/featuredcategories",
      params: {
        key,
        cc: "cn",
        lang: "chinese",
      },
    });
    return {
      success: true,
      data: res.data,
    };
  } catch (error: any) {
    return {
      success: false,
      errorMessage: error.message,
    };
  }
});
