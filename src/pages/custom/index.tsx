import { View, Text } from "@tarojs/components";
import PageContainerComponent from "@/components/page-container";
import FlexComponent from "@/components/flex";

export default function Index() {
  return (
    <PageContainerComponent
      navigation={
        <FlexComponent
          className="w-full h-full"
          align="center"
          justify="center"
        >
          自定义导航
        </FlexComponent>
      }
    >
      <Text>Hello world!</Text>
    </PageContainerComponent>
  );
}
