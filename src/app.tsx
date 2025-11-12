import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";

import "./app.scss";
import { Provider } from "react-redux";
import store from "./redux";

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log("isProd", MY_CONST.isProd);
  });
  // children 是将要会渲染的页面
  return <Provider store={store}>{children}</Provider>;
}

export default App;
