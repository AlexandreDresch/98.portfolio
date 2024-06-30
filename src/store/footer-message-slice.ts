import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IFooterMessageState {
  message: string;
}

const initialState: IFooterMessageState = {
  message: "",
};

export const footerMessageSlice = createSlice({
  name: "footer-message",
  initialState,
  reducers: {
    setFooterMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setFooterMessage } = footerMessageSlice.actions;
export const footerMessageReducer = footerMessageSlice.reducer;