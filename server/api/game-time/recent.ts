/*
 * @Description: 获取最近游戏时间
 * @Author: Sunly
 * @Date: 2023-05-21 16:17:02
 */
import axios from "axios";

type IGameTimeDetail = {
  appid: number;
  img_icon_url: string;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
  playtime_linux_forever: number;
  playtime_mac_forever: number;
  playtime_windows_forever: number;
};

type IGetRecentGameTime =
  | {
      success: boolean;
      data: {
        total_count: number;
        games: IGameTimeDetail[];
      };
    }
  | {
      success: false;
      errorMessage: string;
    };

export default defineEventHandler(
  async (event): Promise<IGetRecentGameTime> => {
    try {
      const { key, steamid } = getQuery(event);
      if (!key) throw new Error("参数错误，请点击右上角配置steam web api");
      if (!steamid) throw new Error("参数错误, 缺少要查询对象的id");
      const res = await axios({
        url: "https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/",
        params: {
          key,
          steamid,
        },
      });
      return {
        success: true,
        data: res.data.response,
      };
    } catch (error: any) {
      return {
        success: false,
        errorMessage: error.message,
      };
    }
  }
);
