/*
 * @Description: steam 认证
 * @Author: Sunly
 * @Date: 2023-10-10 08:57:18
 */
import { steamPassport } from "~/utils/passport";

export default defineEventHandler(async (event) => {
  const redirectUrl = await steamPassport.getRedirectUrl();
  await sendRedirect(event, redirectUrl, 301);
});
