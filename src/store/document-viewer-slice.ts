import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type DocumentType = "pdf" | "markdown";

interface DocumentViewerState {
  documentPath: string;
  documentType: DocumentType;
  title: string;
  folderName: string;
  icon: string;
  selectedShortcutPath: string | null;
}

const initialState: DocumentViewerState = {
  documentPath: "",
  documentType: "pdf",
  title: "Document Viewer",
  folderName: "",
  icon: "/icons/file.png",
  selectedShortcutPath: null,
};

const documentViewerSlice = createSlice({
  name: "documentViewer",
  initialState,
  reducers: {
    openDocument(
      state,
      action: PayloadAction<{
        documentPath: string;
        documentType: DocumentType;
        title?: string;
        folderName?: string;
        icon?: string;
      }>,
    ) {
      const { documentPath, documentType, title, folderName, icon } =
        action.payload;

      state.documentPath = documentPath;
      state.documentType = documentType;
      state.title = title ?? "Document Viewer";
      state.folderName = folderName ?? "";
      state.icon = icon ?? "/icons/file.png";
    },

    selectShortcut(state, action: PayloadAction<string | null>) {
      state.selectedShortcutPath = action.payload;
    },

    clearDocument(state) {
      state.documentPath = "";
      state.documentType = "pdf";
      state.title = "Document Viewer";
      state.folderName = "";
      state.icon = "/icons/file.png";
      state.selectedShortcutPath = null;
    },
  },
});

export const { openDocument, clearDocument, selectShortcut } =
  documentViewerSlice.actions;
export const documentViewerReducer = documentViewerSlice.reducer;
