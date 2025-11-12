import { createSlice } from "@reduxjs/toolkit";
import { IExampleState } from "../types/example";

// 线索状态
const initialState: IExampleState = {
  exampleList: [],
};

const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    setExampleListAction(
      state,
      { payload }: { payload: IExampleState["exampleList"] }
    ) {
      state.exampleList = payload;
    },
  },
});

export const { setExampleListAction } = exampleSlice.actions;
export default exampleSlice.reducer;
