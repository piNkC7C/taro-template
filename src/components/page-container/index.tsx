import {
  getSystemInfoSync,
  getMenuButtonBoundingClientRect,
} from "@tarojs/taro";
import { memo, ReactNode } from "react";
import equal from "fast-deep-equal";
import FlexComponent from "@/components/flex";

interface IProps {
  children: ReactNode;
  navigation?: ReactNode;
}

function PageContainerComponent(props: IProps) {
  const { navigation, children } = props;
  const {
    statusBarHeight, // 状态栏高度
    windowHeight, // 屏幕高度
    windowWidth, // 屏幕宽度
  } = getSystemInfoSync();
  const realStatusBarHeight = statusBarHeight || 0;
  // 获取胶囊按钮信息
  const {
    top: topMenuButton, // 胶囊按钮上边界坐标
    height: heightMenuButton, // 胶囊按钮高度
    width: widthMenuButton, // 胶囊按钮宽度
    left: leftMenuButton, // 胶囊按钮左边界坐标
    right: rightMenuButton, // 胶囊按钮右边界坐标
  } = getMenuButtonBoundingClientRect();
  // 导航栏高度 = (胶囊按钮上边界坐标 - 状态栏高度) * 2 + 胶囊按钮高度
  const navBarHeight =
    topMenuButton * 2 + heightMenuButton - realStatusBarHeight + 4;

  return (
    <FlexComponent
      className="w-screen h-screen overflow-hidden"
      vertical
      align="center"
    >
      {navigation && (
        <FlexComponent
          className="w-full border-box"
          style={{
            paddingBlockStart: realStatusBarHeight,
            height: navBarHeight,
          }}
        >
          {navigation}
        </FlexComponent>
      )}
      <FlexComponent
        className="w-full overflow-hidden"
        flex={1}
        style={{
          minHeight: 0,
        }}
      >
        {children}
      </FlexComponent>
    </FlexComponent>
  );
}

export default memo(PageContainerComponent, (prevProps, nextProps) => {
  return equal(prevProps, nextProps);
});
