import { themes } from "@/themes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type WallpaperMode = "fill" | "tile" | "center" | "stretch";
export type Language = "en" | "pt" | "es" | "fr";
export type TimeFormat = "12h" | "24h";

export interface ScreenSaverSettings {
  type: number;
  waitMinutes: number;
  passwordProtected: boolean;
}

export interface Theme {
  desktop: string;
  window: string;
  activeTitleStart: string;
  activeTitleEnd: string;
  inactiveTitle: string;
  text: string;
  buttonFace: string;
  buttonShadow: string;
}

export interface CoreSettings {
  wallpaper: string;
  wallpaperMode: WallpaperMode;
  screenSaver: ScreenSaverSettings;
  theme: Theme;
}

export interface SettingsState {
  applied: CoreSettings;
  draft: CoreSettings;

  language: Language;
  timeFormat: TimeFormat;
  overrideDateTime: string | null;
}

const defaultCore: CoreSettings = {
  wallpaper: "/wallpaper/default.jpg",
  wallpaperMode: "tile",
  screenSaver: {
    type: 0,
    waitMinutes: 14,
    passwordProtected: false,
  },
  theme: themes["Windows Standard"],
};

const initialState: SettingsState = {
  applied: defaultCore,
  draft: defaultCore,

  language: "en",
  timeFormat: "24h",
  overrideDateTime: null,
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
      applied: {
        ...defaultCore,
        ...(parsed.applied || {}),
      },
      draft: {
        ...defaultCore,
        ...(parsed.applied || {}),
      },
    };
  } catch {
    return undefined;
  }
};

const clone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setWallpaper(state, action: PayloadAction<string>) {
      state.draft.wallpaper = action.payload;
    },

    setWallpaperMode(state, action: PayloadAction<WallpaperMode>) {
      state.draft.wallpaperMode = action.payload;
    },

    setScreenSaverType(state, action: PayloadAction<number>) {
      state.draft.screenSaver.type = action.payload;
    },

    setScreenSaverWait(state, action: PayloadAction<number>) {
      state.draft.screenSaver.waitMinutes = action.payload;
    },

    setScreenSaverPassword(state, action: PayloadAction<boolean>) {
      state.draft.screenSaver.passwordProtected = action.payload;
    },

    applySettings(state) {
      state.applied = clone(state.draft);
    },

    resetSettings(state) {
      state.draft = clone(state.applied);
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

    setTheme(state, action: PayloadAction<Theme>) {
      state.draft.theme = action.payload;
    },
  },
});

export const {
  setWallpaper,
  setWallpaperMode,
  setScreenSaverType,
  setScreenSaverWait,
  setScreenSaverPassword,
  applySettings,
  resetSettings,
  setLanguage,
  setTimeFormat,
  setOverrideDateTime,
  setTheme,
} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
