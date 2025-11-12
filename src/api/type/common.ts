// 获取详情
export type IDetailRequest = {
    id: number // 主键ID
}

// 分页请求
export type IPaginationRequest = {
    pageNo: number
    pageSize: number
}

// 分页响应
export type IPaginationResponse<T> = {
    total: number
    list: T[]
}
