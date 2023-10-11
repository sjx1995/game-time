/*
 * @Description: 枚举
 * @Author: Sunly
 * @Date: 2023-07-10 10:14:03
 */
enum StorageNames {
  WEB_API_KEY = "STEAM_KEY",
  RECENT_USER_IDS = "__recent-search-ids",
  SESSION_STEAM_ID = "__session-steam-id",
  SESSION_STEAM_NAME = "__session-steam-name",
  SESSION_STEAM_IMG = "__session-steam-img",
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

enum IFeaturedCategory {
  specials = "优惠",
  coming_soon = "即将推出",
  top_sellers = "热销商品",
  new_releases = "新品",
}

export { StorageNames, OnlineStatus, IFeaturedCategory };
