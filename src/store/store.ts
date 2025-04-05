import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { footerMessageReducer } from "./footer-message-slice";
import { projectsReducer } from "./projects-slice";
import { foldersReducer } from "./folders-slice";
import { programsReducer } from "./programs-slice";

export const store = configureStore({
  reducer: {
    footerMessage: footerMessageReducer,
    projects: projectsReducer,
    folders: foldersReducer,
    programs: programsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
