import { View, Text, Button, ScrollView } from "@tarojs/components";
import PageContainerComponent from "@/components/page-container";
import { useAppDispatch, useAppSelector } from "@/hook/useAppStore";
import FlexComponent from "@/components/flex";
import { setExampleListAction } from "@/redux/modules/example";
import { getLoginInfoAPI } from "@/api/login";
import { AtButton } from "taro-ui";

export default function Index() {
  const {
    example: { exampleList },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <PageContainerComponent>
      <ScrollView className="w-full h-full" scrollY>
        <FlexComponent className="w-full h-max" vertical gap={5}>
          <Text>Hello world!</Text>
          <AtButton
            type="primary"
            size="small"
            onClick={() =>
              dispatch(
                setExampleListAction([
                  {
                    id: 1,
                    name: "测试1",
                  },
                ])
              )
            }
          >
            测试redux
          </AtButton>
          <AtButton
            type="secondary"
            size="small"
            circle
            onClick={() => getLoginInfoAPI()}
          >
            获取用户信息
          </AtButton>
          <Text>{exampleList.join(",")}</Text>
          <View className="h-3xl"></View>
          <Text>{exampleList.join(",")}</Text>
        </FlexComponent>
      </ScrollView>
    </PageContainerComponent>
  );
}
