import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { footerMessageReducer } from "./footer-message-slice";
import { projectsReducer } from "./projects-slice";
import { foldersReducer } from "./folders-slice";
import { windowManagerReducer } from "./window-manager-slice";
import { clippyReducer } from "./clippy-slice";

export const store = configureStore({
  reducer: {
    footerMessage: footerMessageReducer,
    projects: projectsReducer,
    folders: foldersReducer,
    windows: windowManagerReducer,
    clippy: clippyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
