import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Folder, Program, WindowItem } from "@/types";
import { folders, programs } from "@/constants";

interface WindowManagerState {
  windows: WindowItem[];
  dockItems: WindowItem[];
}

const initialState: WindowManagerState = {
  windows: [
    ...programs.map(p => ({ ...p, type: 'program' as const })),
    ...folders.map(f => ({ ...f, type: 'folder' as const }))
  ],
  dockItems: [],
};

const windowManagerSlice = createSlice({
  name: "windowManager",
  initialState,
  reducers: {
    openWindow(state, action: PayloadAction<number>) {
      const id = action.payload;
      const item = state.windows.find(w => w.id === id);
      
      if (!item) return;

      item.isOpen = true;
      
      const dockItem = state.dockItems.find(d => d.id === id);
      if (dockItem) {
        dockItem.isOpen = true;
      } else {
        state.dockItems.push({ ...item, isOpen: true });
      }

      state.windows.forEach(w => {
        if (w.id !== id && w.isOpen) {
          w.isOpen = false;
        }
      });
      
      state.dockItems.forEach(d => {
        if (d.id !== id && d.isOpen) {
          d.isOpen = false;
        }
      });
    },

    minimizeWindow(state, action: PayloadAction<number>) {
      const id = action.payload;
      const item = state.windows.find(w => w.id === id);
      
      if (item) {
        item.isOpen = false;
      }

      const dockItem = state.dockItems.find(d => d.id === id);
      if (dockItem) {
        dockItem.isOpen = false;
      } else if (item) {
        state.dockItems.push({ ...item, isOpen: false });
      }
    },

    closeWindow(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.windows = state.windows.filter(w => w.id !== id);
      state.dockItems = state.dockItems.filter(d => d.id !== id);
    },

    toggleWindow(state, action: PayloadAction<number>) {
      const id = action.payload;
      const item = state.windows.find(w => w.id === id);
      const dockItem = state.dockItems.find(d => d.id === id);

      if (item) {
        item.isOpen = !item.isOpen;
        
        if (dockItem) {
          dockItem.isOpen = item.isOpen;
        } else {
          state.dockItems.push({ ...item, isOpen: item.isOpen });
        }
      }
    }
  },
});

export const { 
  openWindow, 
  minimizeWindow, 
  closeWindow,
  toggleWindow
} = windowManagerSlice.actions;

export const windowManagerReducer = windowManagerSlice.reducer;