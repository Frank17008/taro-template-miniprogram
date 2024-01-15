import Taro from '@tarojs/taro';

const customInterceptor = (chain): Promise<any> => {
  const requestParams = chain.requestParams;
  if (requestParams) {
    const accessInfo = Taro.getStorageSync('accessInfo');
    requestParams.header = {
      ...(requestParams?.header || {}),
      ...(accessInfo?.accessToken && { 'Blade-auth': accessInfo?.accessToken }),
      'Tenant-Id': accessInfo?.tenantId || '000000',
    };
  }
  return chain.proceed({ ...requestParams }).then((res: any) => {
    // HTTP Status Code
    switch (res.statusCode) {
      case 200:
        return res.data;
      case 400:
        if (res.data?.error === 'invalid_grant') {
          Taro.showToast({ title: '用户名或密码错误', icon: 'none' });
          return Promise.reject('用户名或密码错误');
        }
        return res.data;
      case 401:
        const currentPages = Taro.getCurrentPages();
        const { route } = currentPages[0];
        if (route === 'pages/login/index') {
          Taro.showToast({ title: '鉴权失败', icon: 'error' });
        } else {
          Taro.showToast({ title: 'Token过期', icon: 'error' });
          Taro.reLaunch({ url: '/pages/login/index' });
        }
        return Promise.reject('Token失效');
      case 404:
      case 500:
        Taro.showToast({ title: '请求异常', icon: 'error' });
        return Promise.reject('请求异常');
      default:
        break;
    }
  });
};

Taro.addInterceptor(customInterceptor);
Taro.addInterceptor(Taro.interceptors.timeoutInterceptor);

type RequestMethod = 'PUT' | 'POST' | 'GET' | 'DELETE' | 'PATCH';

const request = async (method: RequestMethod, url: string, config?) => {
  const ContentType = config?.data ? 'application/json' : 'application/x-www-form-urlencoded';
  // get请求使用params, post使用data
  const data = config?.params || config?.data;
  return new Promise((resolve, reject) => {
    Taro.request({
      method,
      url,
      data,
      ...(config || {}),
      header: {
        'Content-Type': ContentType,
        ...config?.header,
      },
      success(res) {
        // if (res?.data?.code === 200) {
        return resolve({ ...(res.data || {}), statusCode: res.statusCode });
        // }
        // else {
        //   Taro.showToast({ title: "请求异常", icon: "error" });
        //   return reject(res?.data?.msg || "请求异常");
        // }
      },
      fail(e) {
        Taro.showToast({ title: '系统错误', icon: 'error' });
        return reject('系统错误');
      },
    });
  });
};

export default {
  get: (url: string, config?) => request('GET', url, config),
  post: (url: string, config?) => request('POST', url, config),
  put: (url: string, config?) => request('PUT', url, config),
  delete: (url: string, config?) => request('DELETE', url, config),
  patch: (url: string, config?) => request('PATCH', url, config),
};
