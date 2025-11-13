import { IResponse, IResponseData } from "@/api/type";
import Taro from "@tarojs/taro";

export type TaroResponseFailure = {
  errMsg: string;
  errno?: number;
  statusCode?: number;
}
// 扩展拦截器类型
export interface TaroInterceptors<RES = any> {
  requestSuccessFn?: (config: TaroRequestConfig) => TaroRequestConfig;
  // 统一使用响应成功/失败两类拦截器：
  // 成功：按业务约定返回结构化 IResponse
  responseSuccessFn?: (res: TaroResponse<RES>) => IResponse<RES>;
  // 失败：网络错误/超时等统一在此处理并返回结构化 IResponse
  responseFailureFn?: (err: TaroResponseFailure) => IResponse<RES>;
}

// 统一请求配置
export interface TaroRequestConfig<RES = any>
  extends Taro.request.Option {
  shouldEncode?: 0 | 1; // 是否对参数进行编码（0: 不编码, 1: 编码）（默认 1: 编码）
  params?: any; // 请求参数（会根据 shouldEncode 自动编码）
  data?: any; // 请求体数据
  interceptors?: TaroInterceptors<RES>; // 请求拦截器
  // 允许携带自定义字段（例如在响应拦截器中需要访问原始请求配置）
  [key: string]: any;
}

// Taro 请求结果的基础类型
export interface TaroResponse<RES = any>
  extends Taro.request.SuccessCallbackResult {
  config: TaroRequestConfig;
  data: IResponseData<RES>;
}
