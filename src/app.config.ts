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
});
