/*
 * @Description: passport
 * @Author: Sunly
 * @Date: 2023-10-10 09:13:34
 */
import Steam from "node-steam-openid";

const steamPassport = new Steam({
  realm: "http://192.168.10.180:3000", // Site name displayed to users on logon
  returnUrl: "http://192.168.10.180:3000/auth/steam/authenticate", // Your return route
  apiKey: "5A8CBF81400D9B5F95755F5821E28150", // Steam API key
});

export { steamPassport };
