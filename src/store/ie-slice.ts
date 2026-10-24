import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IEState {
  pendingUrl: string | null;
}

const initialState: IEState = {
  pendingUrl: null,
};

const ieSlice = createSlice({
  name: "ie",
  initialState,
  reducers: {
    requestUrl(state, action: PayloadAction<string>) {
      state.pendingUrl = action.payload;
    },
    clearPendingUrl(state) {
      state.pendingUrl = null;
    },
  },
});

export const { requestUrl, clearPendingUrl } = ieSlice.actions;
export const ieReducer = ieSlice.reducer;
