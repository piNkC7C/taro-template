import { Text } from "@tarojs/components";
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
      <FlexComponent
        className="w-full h-full"
        align="center"
        justify="center"
        vertical
      >
        <Text>Hello world!</Text>
      </FlexComponent>
    </PageContainerComponent>
  );
}
