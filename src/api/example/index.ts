import { appRequest } from '@/service'
import { IGetExampleListRequest } from '../type/example'
import { getExampleListURL } from '../url'
import { IResponse } from '../type'


export const getExampleListAPI = async (params: IGetExampleListRequest): Promise<IResponse<boolean>> => {
  const response = await appRequest.get<boolean>({
    url: getExampleListURL,
    params
  })

  return response
}
