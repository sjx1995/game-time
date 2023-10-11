/*
 * @Description: passport
 * @Author: Sunly
 * @Date: 2023-10-10 09:13:34
 */
import Steam from "node-steam-openid";

const ip =
  process.env.NODE_ENV === "development"
    ? "192.168.10.180:3000"
    : "gametime.sunly.in";

const steamPassport = new Steam({
  realm: `http://${ip}`,
  returnUrl: `http://${ip}/auth/steam/authenticate`, // Your return route
  apiKey: "5A8CBF81400D9B5F95755F5821E28150", // Steam API key
});

export { steamPassport };
