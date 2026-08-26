import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ImageViewerState {
  images: string[];
  currentIndex: number;
}

const initialState: ImageViewerState = {
  images: [],
  currentIndex: 0,
};

const imageViewerSlice = createSlice({
  name: "imageViewer",
  initialState,
  reducers: {
    openImageViewer(
      state,
      action: PayloadAction<{
        imageUrl: string;
        images: string[];
      }>,
    ) {
      const { imageUrl, images } = action.payload;

      state.images = images;

      const index = images.indexOf(imageUrl);

      state.currentIndex = index >= 0 ? index : 0;
    },

    setCurrentImage(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    },

    clearImageViewer(state) {
      state.images = [];
      state.currentIndex = 0;
    },
  },
});

export const {
  openImageViewer,
  setCurrentImage,
  clearImageViewer,
} = imageViewerSlice.actions;

export const imageViewerReducer = imageViewerSlice.reducer;
