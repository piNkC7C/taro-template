import Taro from "@tarojs/taro";
import type { TaroRequestConfig, TaroInterceptors, TaroResponse } from "./type";
import { IResponse, IResponseData } from "@/api/type";

// 统一的请求类：与 PC 端 axios 封装保持接口一致
class TTRequest {
  private baseURL: string;
  private timeout: number;
  private instanceInterceptors?: TaroInterceptors;
  private shouldEncode: 0 | 1;

  constructor(config: {
    baseURL: string;
    timeout?: number;
    interceptors?: TaroInterceptors;
    shouldEncode?: 0 | 1;
  }) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout || 30000;
    this.instanceInterceptors = config.interceptors;
    this.shouldEncode = config.shouldEncode || 1;
  }

  private buildURL(url: string, params?: TaroRequestConfig["params"]) {
    const full = url.startsWith("http") ? url : `${this.baseURL}${url}`;
    if (!params || Object.keys(params).length === 0) return full;
    // 不编码时，直接拼接查询字符串
    if (this.shouldEncode === 0) {
      return full + "?" + new URLSearchParams(params).toString();
    }
    // 编码时，手动编码参数
    let urlWithParams = full + "?";
    for (const propName of Object.keys(params)) {
      const value = params[propName];
      const part = encodeURIComponent(propName) + "=";
      if (value !== null && typeof value !== "undefined") {
        if (typeof value === "object") {
          for (const key of Object.keys(value)) {
            let params = propName + "[" + key + "]";
            const subPart = encodeURIComponent(params) + "=";
            url += subPart + encodeURIComponent(value[key]) + "&";
          }
        } else {
          url += part + encodeURIComponent(value) + "&";
        }
      }
    }
    urlWithParams = urlWithParams.slice(0, -1);
    return urlWithParams;
  }

  async request<RES>(
    config: TaroRequestConfig<RES>
  ): Promise<IResponse<RES>> {
    // 单次请求拦截器（优先）
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config);
    }
    // 实例请求拦截器
    if (this.instanceInterceptors?.requestSuccessFn) {
      config = this.instanceInterceptors.requestSuccessFn(config);
    }

    const url = this.buildURL(config.url, config.params);

    try {
      const apiResponse = await Taro.request<IResponseData<RES>>({
        url,
        // 避免错误的命名空间引用，直接使用字符串联合
        method: config.method,
        header: config.headers,
        data: config.data,
        timeout: config.timeout || this.timeout,
      });
      if (apiResponse.statusCode === 200) {
        const res: TaroResponse<RES> = {
          ...apiResponse,
          config: config,
        };

        console.log("Taro.request success", res);

        // 实例响应成功拦截器
        let handled: IResponse<RES> | null = null;
        if (this.instanceInterceptors?.responseSuccessFn) {
          handled = this.instanceInterceptors.responseSuccessFn(res);
        }
        // 单次响应成功拦截器
        if (config.interceptors?.responseSuccessFn) {
          handled = config.interceptors.responseSuccessFn(res);
        }
        if (!handled) {
          return {
            success: res.statusCode === 200 && res.data.code === 0,
            data: res.data.data,
            errMsg: res.data.msg,
          };
        }
        return handled;
      } else {
        throw apiResponse;
      }
    } catch (err) {
      // 单次响应失败拦截器
      if (config.interceptors?.responseFailureFn) {
        const ret = config.interceptors.responseFailureFn(err);
        return ret;
      }
      // 实例响应失败拦截器
      if (this.instanceInterceptors?.responseFailureFn) {
        const ret = this.instanceInterceptors.responseFailureFn(err);
        // 若拦截器返回了结构化错误，则抛出
        return ret;
      }
      // 原始错误
      let handled: IResponse<RES> = {
        success: false,
        data: null as RES,
        errMsg: err?.errMsg || "接口响应失败",
      };
      return handled;
    }
  }

  get<RES>(config: TaroRequestConfig<RES>) {
    return this.request<RES>({ ...config, method: "GET" });
  }
  post<RES>(config: TaroRequestConfig<RES>) {
    return this.request<RES>({ ...config, method: "POST" });
  }
  put<RES>(config: TaroRequestConfig<RES>) {
    return this.request<RES>({ ...config, method: "PUT" });
  }
  delete<RES>(config: TaroRequestConfig<RES>) {
    return this.request<RES>({ ...config, method: "DELETE" });
  }
  patch<RES>(config: TaroRequestConfig<RES>) {
    return this.request<RES>({ ...config, method: "PATCH" });
  }
}

export default TTRequest;
