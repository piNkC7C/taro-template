import Taro from "@tarojs/taro";
import { BASE_URL, APP_URL, TIME_OUT, TENANT_ID, SENIOR_TOKEN } from "./config";
import UniteTaroRequest from "./request";
import type { ITaroRequest } from "./request/type";
import { refreshToken } from "@/utils/auth";
import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
} from "@/utils/storge";
import { ROUTE_PATH } from "@/constants";

// 刷新中状态与等待队列
let isRefreshing = false;
interface PendingRequest {
  config: ITaroRequest;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  requestInstance: UniteTaroRequest;
}
const waitQueue: PendingRequest[] = [];

const handleTokenRefresh = async (
  originalRequest: ITaroRequest,
  requestInstance: UniteTaroRequest
) => {
  return new Promise((resolve, reject) => {
    // 进入等待队列
    waitQueue.push({
      config: originalRequest,
      resolve,
      reject,
      requestInstance,
    });

    if (isRefreshing) return;
    isRefreshing = true;

    refreshToken()
      .then((newToken) => {
        setAccessToken(newToken);
        // 重试队列中的请求
        waitQueue.forEach(({ config, resolve, reject, requestInstance }) => {
          config.headers = config.headers || {};
          config.headers["Authorization"] = `Bearer ${newToken}`;
          requestInstance.request(config).then(resolve).catch(reject);
        });
        waitQueue.length = 0;
      })
      .catch((error) => {
        // 刷新失败，清除 token 并提示
        removeAccessToken();
        removeRefreshToken();
        waitQueue.forEach(({ reject }) => reject(error));
        waitQueue.length = 0;
        Taro.showModal({
          title: "登录已过期",
          content: "登录已过期，请重新登录",
          showCancel: false,
          success: (res) => {
            if (res.confirm) {
              Taro.navigateTo({ url: ROUTE_PATH.LOGIN });
            }
          },
        });
      })
      .finally(() => {
        isRefreshing = false;
      });
  });
};

const createRequest = (
  baseURL: string,
  headerAuth?: string,
  shouldEncode?: 0 | 1
) => {
  const requestInstance = new UniteTaroRequest({
    baseURL,
    timeout: TIME_OUT,
    shouldEncode,
    interceptors: {
      // 请求拦截：自动携带 token、租户信息
      requestSuccessFn(config) {
        config.headers = config.headers || {};
        if (TENANT_ID) {
          config.headers["tenant-id"] = TENANT_ID;
        }
        const token = getAccessToken();
        const auth = token || headerAuth;
        if (auth) {
          config.headers["Authorization"] = `Bearer ${auth}`;
        }
        return config;
      },
      // 响应拦截：统一结构化返回，并处理 401
      responseSuccessFn(response) {
        const res = response.data;
        switch (res.code) {
          case 0:
            return {
              success: true,
              data: res.data,
            };
          case 401:
            // 进入刷新逻辑
            return handleTokenRefresh(response.config, requestInstance) as any;
          default:
            Taro.showToast({ title: res.msg || "接口响应失败", icon: "none" });
            return {
              success: false,
              data: res.data,
              errMsg: res.msg || "响应失败",
            };
        }
      },
      responseFailureFn(error) {
        console.log("接口响应失败", error);
        let errMsg = error.errMsg || "接口响应失败";
        Taro.showToast({ title: errMsg, icon: "none" });
        return {
          success: false,
          data: null,
          errMsg,
        };
      },
    },
  });

  return requestInstance;
};

// 默认应用端请求实例
const appRequest = createRequest(BASE_URL + APP_URL);
// 可选：高级授权请求（若配置了环境变量）
const seniorRequest = createRequest(BASE_URL + APP_URL, SENIOR_TOKEN);

export { appRequest, seniorRequest };
