import { IResponse, IResponseData } from "@/api/type";
import Taro from "@tarojs/taro";

// Taro 请求结果的基础类型
export interface ITaroResponse
  extends Taro.request.SuccessCallbackResult {
  config: ITaroRequest; // 原始请求配置
  data: IResponseData; // 接口响应数据（按业务约定结构化）
}
export type ITaroResponseFailure = {
  errMsg: string; // 错误信息
  errno?: number; // 错误码（可选）
  statusCode?: number; // HTTP 状态码（可选）
};
// 扩展拦截器类型
export interface ITaroInterceptors {
  requestSuccessFn?: (config: ITaroRequest) => ITaroRequest;
  // 统一使用响应成功/失败两类拦截器：
  // 成功：按业务约定返回结构化 IResponse
  responseSuccessFn?: (res: ITaroResponse) => IResponse;
  // 失败：网络错误/超时等统一在此处理并返回结构化 IResponse
  responseFailureFn?: (err: ITaroResponseFailure) => IResponse;
}

// 统一请求配置
export interface ITaroRequest extends Taro.request.Option {
  shouldEncode?: 0 | 1; // 是否对参数进行编码（0: 不编码, 1: 编码）（默认 1: 编码）
  params?: Record<string, any>; // 请求参数（会根据 shouldEncode 自动编码）
  data?: Record<string, any>; // 请求体数据（POST/PUT 等）
  interceptors?: ITaroInterceptors; // 单ci请求拦截器
  // 允许携带自定义字段（例如在响应拦截器中需要访问原始请求配置）
  [key: string]: any;
}
