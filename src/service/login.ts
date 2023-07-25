import { Base64 } from "js-base64";
import md5 from "js-md5";
import request from "./request";

export const login = (params): Promise<any> => {
  const Authorization = `Basic ${Base64.encode("sword: sword_secret")}`;
  const password = md5(params.password);
  return request
    .post(`${BASE_URL}/blade-auth/oauth/token`, {
      data: { ...params, password, grant_type: "password" },
      headers: {
        contentType: "application/x-www-form-urlencoded",
        Authorization,
      },
    })
    .then((res) => {
      console.info(res);
    });
};
