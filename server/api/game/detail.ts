/*
 * @Description: 获取游戏详情
 * @Author: Sunly
 * @Date: 2023-07-15 14:12:39
 */
import axios from "axios";
import { StorageNames } from '~/utils/enums'

type IGameDetail = {
  short_description: string
  categories: {
    "id": number,
    "description": string,
  }[],
  developers: string[],
  controller_support: boolean,
  release_date: {
    coming_soon: boolean,
    date: string,
  }
};

type IGetAppDetail =
  | {
    success: boolean;
    data: {
      [key: string]: {
        data: IGameDetail
      };
    }
  }
  | {
    success: false;
    errorMessage: string;
  };

export default defineEventHandler(async (event): Promise<IGetAppDetail> => {
  try {
    const { appId } = getQuery(event);
    const key = process.env[StorageNames.WEB_API_KEY]
    const res = await axios({
      url: "https://store.steampowered.com/api/appdetails",
      params: {
        key,
        appids: appId,
        cc: "cn",
        l: "chinese",
      },
    });
    return {
      success: true,
      data: res.data,
    };
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      errorMessage: error.message,
    };
  }
});
