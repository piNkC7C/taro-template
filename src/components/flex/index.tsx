import { View } from "@tarojs/components";
import { CSSProperties, memo, ReactNode } from "react";
import equal from "fast-deep-equal";

type Justify =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "normal";

type Align =
  | "flex-start"
  | "center"
  | "flex-end"
  | "stretch"
  | "baseline"
  | "normal";

type WrapProp = boolean | "wrap" | "nowrap";

interface IProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  vertical?: boolean; // 主轴是否垂直（column）
  wrap?: WrapProp; // 是否换行，支持 boolean 或 'wrap'/'nowrap'
  justify?: Justify; // 主轴对齐方式
  align?: Align; // 交叉轴对齐方式
  gap?: "small" | "middle" | "large" | number | string; // 间距预设或自定义
  flex?: string | number; // 容器自身的 flex 值（当父级是 flex 时生效）
}

function FlexComponent(props: IProps) {
  const {
    children,
    className,
    style,
    vertical = false,
    wrap,
    justify = "normal",
    align = "normal",
    gap,
    flex = "normal",
  } = props;
  // 主轴方向
  const dirClass = vertical ? "flex-col" : "";
  // 换行方式
  const wrapClass = (() => {
    if (wrap === true || wrap === "wrap") return "flex-wrap";
    if (wrap === "nowrap") return "flex-nowrap";
    return ""; // 默认不换行
  })();

  const alignMap: Record<Align, string> = {
    normal: "items-normal",
    "flex-start": "items-start",
    center: "items-center",
    "flex-end": "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline",
  };

  const justifyMap: Record<Justify, string> = {
    normal: "justify-normal",
    "flex-start": "justify-start",
    center: "justify-center",
    "flex-end": "justify-end",
    "space-between": "justify-between",
    "space-around": "justify-around",
    "space-evenly": "justify-evenly",
  };

  let gapClass = "";
  const inlineStyle: CSSProperties = { ...(style || {}) };

  if (typeof gap === "string") {
    if (gap === "small" || gap === "middle" || gap === "large") {
      gapClass = `gap-${gap}`;
    } else if (gap) {
      inlineStyle.gap = gap; // 自定义字符串长度，如 '8px'、'1rem'
    }
  } else if (typeof gap === "number") {
    if (Number.isInteger(gap) && gap >= 1 && gap <= 10) {
      gapClass = `gap-${gap}`;
    } else {
      inlineStyle.gap = `${gap}px`;
    }
  }

  if (typeof flex !== "undefined") {
    inlineStyle.flex = flex as any;
  }

  const classes = [
    "flex",
    dirClass,
    wrapClass,
    alignMap[align],
    justifyMap[justify],
    gapClass,
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <View className={classes} style={inlineStyle}>
      {children}
    </View>
  );
}

export default memo(FlexComponent, (prevProps, nextProps) => {
  return equal(prevProps, nextProps);
});
