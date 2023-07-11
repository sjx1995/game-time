/*
 * @Description: 枚举
 * @Author: Sunly
 * @Date: 2023-07-10 10:14:03
 */
enum StorageNames {
  WEB_API_KEY = "__STEAM_WEB_API_KEY",
  RECENT_USER_IDS = "__recent-search-ids",
}

enum OnlineStatus {
  "离线" = 0,
  "在线" = 1,
  "忙碌" = 2,
  "离开" = 3,
  "打瞌睡" = 4,
  "想交易" = 5,
  "想玩游戏" = 6,
}

export { StorageNames, OnlineStatus };
