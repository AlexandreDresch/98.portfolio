import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type DocumentType = "pdf" | "markdown";

interface DocumentViewerState {
  documentPath: string;
  documentType: DocumentType;
  title: string;
  folderName: string;
  icon: string;
}

const initialState: DocumentViewerState = {
  documentPath: "",
  documentType: "pdf",
  title: "Document Viewer",
  folderName: "",
  icon: "/icons/file.png",
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

    clearDocument(state) {
      state.documentPath = "";
      state.documentType = "pdf";
      state.title = "Document Viewer";
      state.folderName = "";
      state.icon = "/icons/file.png";
    },
  },
});

export const { openDocument, clearDocument } = documentViewerSlice.actions;
export const documentViewerReducer = documentViewerSlice.reducer;
