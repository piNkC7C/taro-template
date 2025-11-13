export interface IResponseData<T> {
  code: number
  data: T
  msg?: string
}

export interface IResponse<T> {
  success: boolean
  data: T
  errMsg?: string
}

export type IRequest<T>  = T

export * from './common'
export * from './login'
