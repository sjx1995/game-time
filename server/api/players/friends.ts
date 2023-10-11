/*
 * @Description: 获取好友列表
 * @Author: Sunly
 * @Date: 2023-10-11 08:09:52
 */
import axios from "axios";
import { StorageNames } from "~/utils/enums";

type IGetFriendList =
  | {
      success: boolean;
      data: {
        friendslist: {
          friends: {
            steamid: string;
            relationship: string;
            friend_since: number;
          }[];
        };
      };
    }
  | {
      success: false;
      errorMessage: string;
    };

export default defineEventHandler(async (event): Promise<IGetFriendList> => {
  try {
    const key = process.env[StorageNames.WEB_API_KEY];
    const { steamid } = getQuery(event);
    if (!steamid) throw new Error("参数错误, 缺少SteamID");
    const res = await axios({
      url: "http://api.steampowered.com/ISteamUser/GetFriendList/v0001",
      method: "get",
      params: {
        key,
        steamid,
        relationship: "friend",
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
