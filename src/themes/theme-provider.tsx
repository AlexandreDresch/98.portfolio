"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/store/store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { applied } = useAppSelector((s) => s.settings);
  const theme = applied.theme;

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--desktop", theme.desktop);
    root.style.setProperty("--window", theme.window);
    root.style.setProperty("--text", theme.text);

    root.style.setProperty("--title-start", theme.activeTitleStart);
    root.style.setProperty("--title-end", theme.activeTitleEnd);
    root.style.setProperty("--title-inactive", theme.inactiveTitle);

    root.style.setProperty("--button-face", theme.buttonFace);
    root.style.setProperty("--button-shadow", theme.buttonShadow);
  }, [theme]);

  return <>{children}</>;
}
