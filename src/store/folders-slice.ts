import { folders } from "@/constants";
import { Folder, Project } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FoldersState {
  folders: Folder[];
  selectedFile: Project | null;
  lastFileOpened: Project | null;
  isFileOpen: boolean;
}

const initialState: FoldersState = {
  folders: folders,
  selectedFile: null,
  lastFileOpened: null,
  isFileOpen: false,
};

const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    selectFile: (state, action: PayloadAction<Project>) => {
      state.selectedFile = action.payload;
    },
    clearSelectedFile: (state) => {
      state.selectedFile = null;
    },
    openFile: (state) => {
      if (state.selectedFile) {
        state.isFileOpen = true;
      }
    },
    reOpenFile: (state) => {
      if (state.lastFileOpened) {
        state.selectedFile = state.lastFileOpened;
        state.isFileOpen = true;
      }
    },
    closeFile: (state) => {
      if (state.selectedFile) {
        state.isFileOpen = false;

        state.lastFileOpened = state.selectedFile;
      }
    },
  },
});

export const {
  selectFile,
  clearSelectedFile,
  openFile,
  reOpenFile,
  closeFile,
} = foldersSlice.actions;
export const foldersReducer = foldersSlice.reducer;
