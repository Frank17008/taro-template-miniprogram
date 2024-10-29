export default defineAppConfig({
  pages: ['pages/login/index', 'pages/home/index', 'pages/other/index'],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: true,
  },
  // 分包
  subPackages: [
    // {
    //   root: "pages",
    //   pages: ["home/index"],
    // }
  ],
  // 权限配置 定位权限
  // permission: {
  //   'scope.userLocation': {
  //     desc: '您的位置信息将用于小程序位置接口的效果展示',
  //   },
  // },
  // tabbar配置不能超过5个
  tabBar: {
    position: 'bottom',
    color: '#333333',
    selectedColor: '#0EBD8D',
    backgroundColor: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        // iconPath: "./assets/images/home.png",
        // selectedIconPath: "./assets/images/home-act.png",
      },
      {
        pagePath: 'pages/other/index',
        text: '其他',
        // iconPath: "./assets/images/home.png",
        // selectedIconPath: "./assets/images/home-act.png",
      },
    ],
  },
});

