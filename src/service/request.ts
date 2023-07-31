import Taro from "@tarojs/taro";

const customInterceptor = (chain) => {
  const requestParams = chain.requestParams;
  if (requestParams) {
    //   const { method, data, url } = requestParams;
    // const token = Taro.getStorageSync("token");
    // requestParams.headers = {
    // ...(requestParams?.header || {}),
    // "Blade-auth": token,
    // Authorization: accessInfo.authorization,
    // };
  }
  return chain.proceed(requestParams).then((res) => res);
};

Taro.addInterceptor(customInterceptor);
// 日志
// Taro.addInterceptor(Taro.interceptors.logInterceptor);
// 超时
// Taro.addInterceptor(Taro.interceptors.timeoutInterceptor);

type RequestMethod = "PUT" | "POST" | "GET" | "DELETE" | "PATCH";
const request = async (method: RequestMethod, url: string, config?) => {
  const ContentType = config?.data
    ? "application/json"
    : "application/x-www-form-urlencoded";
  // get请求使用params, post使用data
  const data = config?.params || config?.data;
  const option = {
    method,
    url,
    data,
    header: {
      "Content-Type": ContentType,
      "Tenant-Id": "000000",
      ...config?.headers,
    },
    success(res) {
      switch (res?.statusCode) {
        case 200: {
          break;
        }
        case 401:
          {
            Taro.showModal({
              title: "登录提示",
              content: "身份已过期，请重新登录后再来操作！",
              success(res1) {
                if (res.confirm) {
                }
              },
            });
          }
          break;
        default:
          break;
      }
    },
    error(e) {
      console.error("请求接口出现问题", e);
    },
  };
  const res = await Taro.request(option);
  return res;
};

export default {
  get: (url: string, config?) => request("GET", url, config),
  post: (url: string, config?) => request("POST", url, config),
  put: (url: string, config?) => request("PUT", url, config),
  delete: (url: string, config?) => request("DELETE", url, config),
  patch: (url: string, config?) => request("PATCH", url, config),
};
