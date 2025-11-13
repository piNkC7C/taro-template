// 登录响应体
export type ILoginResponse = {
    userId: number // 用户ID
    accessToken: string // 访问令牌
    refreshToken: string // 刷新令牌
    expiresTime: number // 过期时间
}
// 登录用户信息
export type ILoginInfo = {
    id: number
    nickname: string
    avatar: string
    mobile: string | null
    sex: number | null
    point: number
    areaId: string | null
    experience: number | null
    level: {
        id: number
        name: string
        level: number
        icon: string
    } | null
    position: string | null
    brokerageEnabled: boolean | null
    targetCompanyServe: string | null
    companyName: string | null
}
// 发送手机验证码
export type ISendMobileCodeRequest = {
    mobile: string // 手机号
    scene: number // 场景
    captchaVerification?: string // 验证码
}
// 验证手机验证码
export type IVerifyMobileCodeRequest = {
    mobile: string // 手机号
    scene: number // 场景 23:重置密码 21:登录
    code: string // 验证码
}
// 手机号登录
export type IPhoneLoginRequest = {
    mobile: string // 手机号
    code: string // 验证码
}
