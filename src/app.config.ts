export default defineAppConfig({
  pages: ["pages/login/index"],
  window: {
    backgroundTextStyle: "dark",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
    enablePullDownRefresh: true,
  },
  // 分包
  subPackages: [
    // {
    //   root: "pages",
    //   pages: ["home/index"],
    // }
  ],
  // tabbar配置不能超过5个
  tabBar: {
    position: "bottom",
    color: "#333333",
    selectedColor: "#0EBD8D",
    backgroundColor: "white",
    list: [
      {
        pagePath: "pages/home/index",
        text: "首页",
        // iconPath: "./assets/images/home.png",
        // selectedIconPath: "./assets/images/home-act.png",
      },
    ],
  },
});
