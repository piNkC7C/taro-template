import Taro from "@tarojs/taro";
import type { ITaroRequest, ITaroInterceptors, ITaroResponse } from "./type";
import { IResponse, IResponseData } from "@/api/type";

interface IConfig {
  baseURL: string; // 基础 URL
  timeout?: number; // 请求超时时间（默认 30s）
  interceptors?: ITaroInterceptors; // 拦截器
  shouldEncode?: 0 | 1; // 是否对参数进行编码（0: 不编码, 1: 编码）（默认 1: 编码）
}

// 统一的请求类：与 PC 端 axios 封装保持接口一致
class UniteTaroRequest {
  private baseURL: string; // 基础 URL
  private timeout: number; // 请求超时时间（默认 30s）
  private instanceInterceptors?: ITaroInterceptors; // 实例级拦截器
  private shouldEncode: 0 | 1; // 是否对参数进行编码（0: 不编码, 1: 编码）（默认 1: 编码）

  constructor(config: IConfig) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout || 30000;
    this.instanceInterceptors = config.interceptors;
    this.shouldEncode = config.shouldEncode || 1;
  }

  private buildURL(url: string, params?: ITaroRequest["params"]) {
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

  async request(config: ITaroRequest) {
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
      const apiResponse = await Taro.request<IResponseData>({
        url,
        // 避免错误的命名空间引用，直接使用字符串联合
        method: config.method,
        header: config.headers,
        data: config.data,
        timeout: config.timeout || this.timeout,
      });
      // 状态码 200 处理
      if (apiResponse.statusCode === 200) {
        const res: ITaroResponse = {
          ...apiResponse,
          config: config,
        };

        console.log("Taro.request success", res);

        // 实例响应成功拦截器
        let handled: IResponse | null = null;
        if (this.instanceInterceptors?.responseSuccessFn) {
          handled = this.instanceInterceptors.responseSuccessFn(res);
        }
        // 单次响应成功拦截器
        if (config.interceptors?.responseSuccessFn) {
          handled = config.interceptors.responseSuccessFn(res);
        }
        if (!handled) {
          throw apiResponse;
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
      let handled: IResponse = {
        success: false,
        data: null,
        errMsg: err?.errMsg || "接口响应失败",
      };
      return handled;
    }
  }

  get(config: ITaroRequest) {
    return this.request({ ...config, method: "GET" });
  }
  post(config: ITaroRequest) {
    return this.request({ ...config, method: "POST" });
  }
  put(config: ITaroRequest) {
    return this.request({ ...config, method: "PUT" });
  }
  delete(config: ITaroRequest) {
    return this.request({ ...config, method: "DELETE" });
  }
  patch(config: ITaroRequest) {
    return this.request({ ...config, method: "PATCH" });
  }
}

export default UniteTaroRequest;
