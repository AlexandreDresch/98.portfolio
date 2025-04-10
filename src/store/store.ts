import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { footerMessageReducer } from "./footer-message-slice";
import { projectsReducer } from "./projects-slice";
import { foldersReducer } from "./folders-slice";
import { windowManagerReducer } from "./window-manager-slice";

export const store = configureStore({
  reducer: {
    footerMessage: footerMessageReducer,
    projects: projectsReducer,
    folders: foldersReducer,
    windows: windowManagerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
