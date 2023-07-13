/*
 * @Description: 获取好友列表
 * @Author: Sunly
 * @Date: 2023-07-10 04:11:10
 */
import axios from "axios";

export type IPlayerInfo = {
  avatar: string;
  avatarfull: string;
  avatarmedium: string;
  communityvisibilitystate: number;
  gameextrainfo: string;
  gameid: string;
  personaname: string;
  personastate: number;
  personastateflags: number;
  profilestate: number;
  profileurl: string;
  realname: string;
  steamid: string;
  timecreated: number;
  lastlogoff: number;
};

type IGetPlayerList =
  | {
      success: boolean;
      data: {
        players: IPlayerInfo[];
      };
    }
  | {
      success: false;
      errorMessage: string;
    };

export default defineEventHandler(async (event): Promise<IGetPlayerList> => {
  try {
    const key = process.env.STEAM_KEY;
    console.log("===key", key);
    const { ids } = getQuery(event);
    if (!(ids && (ids as Array<string>).length))
      throw new Error("参数错误, 缺少要查询对象的id");
    const res = await axios({
      url: "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/",
      method: "get",
      params: {
        key,
        steamids:
          typeof ids === "string" ? ids : (ids as Array<string>).join(","),
      },
    });
    return {
      key,
      success: true,
      data: res.data.response,
    };
  } catch (error: any) {
    return {
      success: false,
      errorMessage: error.message,
    };
  }
});
