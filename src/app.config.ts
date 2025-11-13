export default defineAppConfig({
  pages: ["pages/index/index", "pages/custom/index", "pages/login/index"],
  tabBar: {
    list: [
      {
        pagePath: "pages/index/index",
        text: "默认",
      },
      {
        pagePath: "pages/custom/index",
        text: "自定义",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "盖立克思AI",
    navigationBarTextStyle: "black",
  },
});
