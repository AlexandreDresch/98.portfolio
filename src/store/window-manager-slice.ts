import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Program, WindowItem } from "@/types";
import { folders, programs } from "@/constants";

interface WindowManagerState {
  windows: WindowItem[];
  dockItems: WindowItem[];
  activeWindowId: number | null;
  selectedProgram: Program | null;
}

const initialState: WindowManagerState = {
  windows: [
    ...programs.map((p) => ({ ...p, type: "program" as const })),
    ...folders.map((f) => ({ ...f, type: "folder" as const })),
  ],
  dockItems: [],
  activeWindowId: null,
  selectedProgram: null,
};

const windowManagerSlice = createSlice({
  name: "windowManager",
  initialState,
  reducers: {
    openWindow(state, action: PayloadAction<number>) {
      const id = action.payload;
      const item = state.windows.find((w) => w.id === id);

      if (!item) return;

      state.activeWindowId = id;

      item.isOpen = true;

      const dockItem = state.dockItems.find((d) => d.id === id);
      if (dockItem) {
        dockItem.isOpen = true;
      } else {
        state.dockItems.push({ ...item, isOpen: true });
      }
    },

    minimizeWindow(state, action: PayloadAction<number>) {
      const id = action.payload;
      const item = state.windows.find((w) => w.id === id);

      if (item) {
        item.isOpen = false;
      }

      if (state.activeWindowId === id) {
        state.activeWindowId = null;
      }

      const dockItem = state.dockItems.find((d) => d.id === id);
      if (dockItem) {
        dockItem.isOpen = false;
      } else if (item) {
        state.dockItems.push({ ...item, isOpen: false });
      }
    },

    closeWindow(state, action: PayloadAction<number>) {
      const id = action.payload;

      if (state.activeWindowId === id) {
        state.activeWindowId = null;
      }

      if (state.selectedProgram?.id === id) {
        state.selectedProgram = null;
      }

      const windowIndex = state.windows.findIndex((w) => w.id === id);
      if (windowIndex !== -1) {
        state.windows[windowIndex].isOpen = false;
      }

      state.dockItems = state.dockItems.filter((d) => d.id !== id);
    },

    toggleWindow(state, action: PayloadAction<number>) {
      const id = action.payload;
      const item = state.windows.find((w) => w.id === id);
      const dockItem = state.dockItems.find((d) => d.id === id);

      if (item) {
        item.isOpen = !item.isOpen;

        if (item.isOpen) {
          state.activeWindowId = id;
        } else if (state.activeWindowId === id) {
          state.activeWindowId = null;
        }

        if (dockItem) {
          dockItem.isOpen = item.isOpen;
        } else {
          state.dockItems.push({ ...item, isOpen: item.isOpen });
        }
      }
    },

    activateWindow(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.activeWindowId = id;
    },

    selectProgram(state, action: PayloadAction<number | null>) {
      if (action.payload === null) {
        state.selectedProgram = null;
      } else {
        const item = state.windows.find((w) => w.id === action.payload);
        state.selectedProgram = item ? { ...item } : null;
      }
    },
  },
});

export const {
  openWindow,
  minimizeWindow,
  closeWindow,
  toggleWindow,
  activateWindow,
  selectProgram,
} = windowManagerSlice.actions;

export const windowManagerReducer = windowManagerSlice.reducer;
