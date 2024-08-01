import { folders } from "@/constants";
import { Folder } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FoldersState {
  folders: Folder[];
}

const initialState: FoldersState = {
  folders: folders,
};

const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    toggleFolder(state, action: PayloadAction<number>) {
      const folder = state.folders.find(
        (folder) => folder.id === action.payload
      );
      if (folder) {
        folder.isOpen = !folder.isOpen;
      }
    },
  },
});

export const { toggleFolder } = foldersSlice.actions;
export const foldersReducer = foldersSlice.reducer;
