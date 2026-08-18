"use client";

import DesktopLayout from "@/components/desktop/desktop-layout";
import MobileLayout from "@/components/mobile/mobile-layout";
import { useIsDesktop } from "@/hooks/use-is-desktop";
import { useEffect } from "react";
import { openWindow } from "@/store/window-manager-slice";
import { useAppDispatch } from "@/store/store";

export default function Home() {
  const dispatch = useAppDispatch();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    const handler = (e: Event) => {
      const { windowId } = (e as CustomEvent).detail;
      dispatch(openWindow(windowId));
    };
    window.addEventListener("monitor2-open-app", handler);
    return () => window.removeEventListener("monitor2-open-app", handler);
  }, [dispatch]);

  if (isDesktop === null) return null;

  return isDesktop ? <DesktopLayout /> : <MobileLayout />;
}
