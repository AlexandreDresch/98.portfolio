import { ScreenSaverSettings } from "@/types";
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

  screenSaver: ScreenSaverSettings;
}

const initialState: SettingsState = {
  wallpaper: "/wallpaper/default.jpg",
  wallpaperMode: "tile",
  language: "en",
  timeFormat: "24h",
  overrideDateTime: null,

  screenSaver: {
    type: 0,
    waitMinutes: 14,
    passwordProtected: false,
  },
};

export const loadSettings = (): SettingsState | undefined => {
  if (typeof window === "undefined") return undefined;

  try {
    const serialized = localStorage.getItem("settings");
    if (!serialized) return undefined;

    const parsed = JSON.parse(serialized);

    return {
      ...initialState,
      ...parsed,
      screenSaver: {
        ...initialState.screenSaver,
        ...(parsed.screenSaver || {}),
      },
    };
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
    setScreenSaverType(state, action: PayloadAction<number>) {
      state.screenSaver.type = action.payload;
    },
    setScreenSaverWait(state, action: PayloadAction<number>) {
      state.screenSaver.waitMinutes = action.payload;
    },
    setScreenSaverPassword(state, action: PayloadAction<boolean>) {
      state.screenSaver.passwordProtected = action.payload;
    },
  },
});

export const {
  setWallpaper,
  setWallpaperMode,
  setLanguage,
  setTimeFormat,
  setOverrideDateTime,
  setScreenSaverType,
  setScreenSaverWait,
  setScreenSaverPassword,
} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
