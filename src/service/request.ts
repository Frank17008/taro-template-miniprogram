import Taro from "@tarojs/taro";

const customInterceptor = (chain) => {
  const requestParams = chain.requestParmas;
  console.info(requestParams);
  if (requestParams) {
    //   const { method, data, url } = requestParams;
    // const token = Taro.getStorageSync("token");
    requestParams.headers = {
      ...(requestParams?.header || {}),
      "Tenant-Id": "000000",
      // "Blade-auth": token,
      // Authorization: accessInfo.authorization,
    };
  }
  return chain.proceed(requestParams).then((res) => res);
};

// Taro.addInterceptor(customInterceptor);
// 日志
// Taro.addInterceptor(Taro.interceptors.logInterceptor);
// 超时
// Taro.addInterceptor(Taro.interceptors.timeoutInterceptor);

const request = async (method, url: string, params?) => {
  let contentType = params?.data
    ? "application/json"
    : "application/x-www-form-urlencoded";
  if (params) contentType = params?.header?.contentType || contentType;
  const option = {
    method,
    url,
    data: params && params?.data,
    header: { "Content-type": contentType },
    success(res) {
      switch (res?.statusCode) {
        case 200: {
          break;
        }
        default:
          break;
      }
    },
    error(e) {
      console.error("请求接口出现问题", e);
    },
  };
  const res = await Taro.request(option);
  return res.data;
};

export default {
  get: (url: string, config?) => request("GET", url, config),
  post: (url: string, config?) => request("POST", url, config),
  put: (url: string, config?) => request("PUT", url, config),
  delete: (url: string, config?) => request("DELETE", url, config),
  patch: (url: string, config?) => request("PATCH", url, config),
};
