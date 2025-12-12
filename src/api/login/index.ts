import Taro from "@tarojs/taro";
import { appRequest, seniorRequest } from "@/service";
import { SENIOR_TOKEN, TENANT_ID, BASE_URL, APP_URL } from "@/service/config";
import type {
  IResponseData,
  IResponse,
  ILoginResponse,
  ILoginInfo,
  ISendMobileCodeRequest,
  IVerifyMobileCodeRequest,
  IPhoneLoginRequest,
} from "../type";
import {
  refreshTokenURL,
  getLoginInfoURL,
  sendMobileCodeURL,
  verifyMobileCodeURL,
  phoneLoginURL,
} from "../url";

// 刷新令牌接口，直接使用axios
export const refreshTokenAPI = async (
  refreshToken: string
): Promise<IResponse<ILoginResponse>> => {
  const response: Taro.request.SuccessCallbackResult<
    IResponseData<ILoginResponse>
  > = await Taro.request<IResponseData<ILoginResponse>>({
    url: `${BASE_URL}${APP_URL}${refreshTokenURL}`,
    method: "POST",
    data: { refreshToken },
    header: {
      Authorization: `Bearer ${SENIOR_TOKEN}`,
      "tenant-id": TENANT_ID,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  console.log("refreshTokenAPI response", response);

  if (response.statusCode !== 200) {
    throw new Error("刷新令牌失败");
  }

  if (response.data.code !== 0) {
    return {
      success: false,
      errMsg: response.data.msg || "刷新令牌失败",
      data: response.data.data,
    };
  }

  return {
    success: true,
    data: response.data.data,
  };
};

// 获取用户信息接口
export const getLoginInfoAPI = async (): Promise<IResponse<ILoginInfo>> => {
  const response = await appRequest.get({
    url: getLoginInfoURL,
  });

  return response;
};

// 发送手机验证码
export const sendMobileCodeAPI = async (
  data: ISendMobileCodeRequest
): Promise<IResponse<boolean>> => {
  const response = await seniorRequest.post({
    url: sendMobileCodeURL,
    data,
  });

  return response;
};

// 校验手机验证码
export const verifyMobileCodeAPI = async (
  data: IVerifyMobileCodeRequest
): Promise<IResponse<boolean>> => {
  const response = await seniorRequest.post({
    url: verifyMobileCodeURL,
    data,
  });

  return response;
};

// 手机号登录
export const phoneLoginAPI = async (
  data: IPhoneLoginRequest
): Promise<IResponse<ILoginResponse>> => {
  const response = await seniorRequest.post({
    url: phoneLoginURL,
    data,
  });

  return response;
};
