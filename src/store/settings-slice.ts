import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type WallpaperMode = "fill" | "tile" | "center" | "stretch";
export type Language = "en" | "pt" | "es" | "fr";
export type TimeFormat = "12h" | "24h";

export interface SettingsState {
  wallpaper: string;
  wallpaperMode: WallpaperMode;
  language: Language;
  timeFormat: TimeFormat;
  overrideDateTime: string | null;
}

const initialState: SettingsState = {
  wallpaper: "/wallpaper/default.jpg",
  wallpaperMode: "tile",
  language: "en",
  timeFormat: "24h",
  overrideDateTime: null,
};

export const loadSettings = (): SettingsState | undefined => {
  if (typeof window === "undefined") return undefined;

  try {
    const serialized = localStorage.getItem("settings");
    if (!serialized) return undefined;

    return JSON.parse(serialized) as SettingsState;
  } catch {
    return undefined;
  }
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setWallpaper(state, action: PayloadAction<string>) {
      state.wallpaper = action.payload;
    },
    setWallpaperMode(state, action: PayloadAction<WallpaperMode>) {
      state.wallpaperMode = action.payload;
    },
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    },
    setTimeFormat(state, action: PayloadAction<TimeFormat>) {
      state.timeFormat = action.payload;
    },
    setOverrideDateTime(state, action: PayloadAction<string | null>) {
      state.overrideDateTime = action.payload;
    },
  },
});

export const {
  setWallpaper,
  setWallpaperMode,
  setLanguage,
  setTimeFormat,
  setOverrideDateTime,
} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
