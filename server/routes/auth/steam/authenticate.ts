/*
 * @Description:
 * @Author: Sunly
 * @Date: 2023-10-10 10:15:30
 */
import { steamPassport } from "~/utils/passport";
import { StorageNames } from "~/utils/enums";

export default defineEventHandler(async (event) => {
  const {
    steamid,
    username,
    avatar: { small: smallAvatar },
  } = await steamPassport.authenticate(event.node.req);
  await sendRedirect(
    event,
    encodeURI(
      `/redirect?${StorageNames.SESSION_STEAM_ID}=${steamid}&${StorageNames.SESSION_STEAM_NAME}=${username}&${StorageNames.SESSION_STEAM_IMG}=${smallAvatar}`
    ),
    301
  );
});
