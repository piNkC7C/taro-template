// 接口响应数据类型
export interface IResponseData<T = any> {
  code: number;
  data: T;
  msg?: string;
}

// 拦截器响应数据类型
export interface IResponse<T = any> {
  success: boolean;
  data: T;
  errMsg?: string;
}

export * from "./common";
export * from "./login";
