/// <reference types="@tarojs/taro" />

declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";

declare namespace NodeJS {
  interface ProcessEnv {
    /** 当前构建的平台 */
    TARO_ENV:
      | "weapp"
      | "swan"
      | "alipay"
      | "h5"
      | "rn"
      | "tt"
      | "qq"
      | "jd"
      | "harmony"
      | "jdrn";
  }
}

// 由 Taro 配置中的 defineConstants 注入的全局常量
declare const MY_CONST: {
  isProd: boolean;
};
