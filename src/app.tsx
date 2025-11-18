import { PropsWithChildren } from "react";

import "./app.scss";
import 'taro-ui/dist/style/index.scss'
import { Provider } from "react-redux";
import store from "./redux";

function App({ children }: PropsWithChildren<any>) {
  // children 是将要会渲染的页面
  return <Provider store={store}>{children}</Provider>;
}

export default App;
