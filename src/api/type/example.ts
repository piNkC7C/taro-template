import { IPaginationRequest } from "./common"

export type IExampleList = {
    id: number
    name: string
}

export type IGetExampleListRequest = IPaginationRequest & {
  createTime?: string
}
