import { folders } from "@/constants";
import { Folder, Project } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FoldersState {
  folders: Folder[];
  dockFolders: Folder[];
  selectedFile: Project | null;
  lastFileOpened: Project | null;
  isFileOpen: boolean;
}

const initialState: FoldersState = {
  folders: folders,
  dockFolders: [],
  selectedFile: null,
  lastFileOpened: null,
  isFileOpen: false,
};

const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    openFolder(state, action: PayloadAction<number>) {
      const folderId = action.payload;
      const folder = state.folders.find((folder) => folder.id === folderId);

      if (folder) {
        folder.isOpen = true;
        setTimeout(() => (document.body.style.pointerEvents = ""), 0);

        const dockFolder = state.dockFolders.find((f) => f.id === folderId);
        if (!dockFolder) {
          state.dockFolders.push(folder);
        } else {
          dockFolder.isOpen = true;
        }
      }
    },

    closeFolder(state, action: PayloadAction<number>) {
      const folderId = action.payload;
      const folder = state.folders.find((folder) => folder.id === folderId);

      if (folder) {
        folder.isOpen = false;
        state.dockFolders = state.dockFolders.filter((f) => f.id !== folderId);
      }
    },

    minimizeFolder(state, action: PayloadAction<number>) {
      const folderId = action.payload;
      const folder = state.folders.find((folder) => folder.id === folderId);

      if (folder) {
        folder.isOpen = false;
      }

      const dockFolder = state.dockFolders.find(
        (folder) => folder.id === folderId
      );
      if (dockFolder) {
        dockFolder.isOpen = false;
      }
    },
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
  openFolder,
  closeFolder,
  minimizeFolder,
  selectFile,
  clearSelectedFile,
  openFile,
  reOpenFile,
  closeFile,
} = foldersSlice.actions;
export const foldersReducer = foldersSlice.reducer;
