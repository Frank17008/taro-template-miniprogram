import { Base64 } from "js-base64";
import md5 from "js-md5";
import request from "./request";

export const login = (params) => {
  const Authorization = `Basic ${Base64.encode(
    `${params?.headers?.clientId || "sword"}:${
      params?.headers?.clientSecret || "sword_secret"
    }`
  )}`;
  const password = md5(params.password);
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization,
  };
  return request
    .post(`${BASE_URL}/api/blade-auth/oauth/token`, {
      params: { ...params, password, grant_type: "password" },
      headers,
    })
    .then((res) => {});
};
