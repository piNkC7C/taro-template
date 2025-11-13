import Taro from "@tarojs/taro";
import { Button } from "@tarojs/components";
import PageContainerComponent from "@/components/page-container";
import FlexComponent from "@/components/flex";
import { phoneLoginAPI, sendMobileCodeAPI } from "@/api/login";
import { setAccessToken, setRefreshToken } from "@/utils/storge";
import { ROUTE_PATH } from "@/constants";

export default function Index() {
  const loginByPhone = async () => {
    await sendMobileCodeAPI({
      mobile: "19519100207",
      scene: 1,
    });
    const loginRes = await phoneLoginAPI({
      mobile: "19519100207",
      code: "999999",
    });
    if (loginRes.success) {
      setRefreshToken(loginRes.data.refreshToken);
      setAccessToken(loginRes.data.accessToken);
      Taro.switchTab({
        url: ROUTE_PATH.INDEX,
      });
    }
  };

  return (
    <PageContainerComponent
      navigation={
        <FlexComponent
          className="w-full h-full"
          align="center"
          justify="center"
        >
          登录
        </FlexComponent>
      }
    >
      <FlexComponent
        className="w-full h-full"
        align="center"
        justify="center"
        vertical
      >
        <Button onClick={async () => await loginByPhone()}>手机号登录</Button>
      </FlexComponent>
    </PageContainerComponent>
  );
}
