import { Base64 } from "js-base64";
import md5 from "js-md5";
import request from "./request";
import prefix from "./prefix";

const { api } = prefix;

export const login = (params) => {
  const Authorization = `Basic ${Base64.encode(
    `${params?.headers?.clientId || "sword"}:${
      params?.headers?.clientSecret || "sword_secret"
    }`
  )}`;
  const password = md5(params.password);
  const header = {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Type": "app",
    Authorization,
  };
  return request.post(`${BASE_URL}${api}/blade-auth/oauth/token`, {
    params: { ...params, password, grant_type: "password" },
    header,
  });
};
