import { DispatchType, IRootState } from '..'

export type IThunkState = {
  state: IRootState
  dispatch: DispatchType
}
