import { folders } from "@/constants";
import { Folder } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FoldersState {
  folders: Folder[];
  dockFolders: Folder[];
}

const initialState: FoldersState = {
  folders: folders,
  dockFolders: [],
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
  },
});

export const { openFolder, closeFolder, minimizeFolder } = foldersSlice.actions;
export const foldersReducer = foldersSlice.reducer;
