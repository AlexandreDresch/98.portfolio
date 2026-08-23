"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/store";
import { activateWindow, openWindow } from "@/store/window-manager-slice";
import { spawnRegistry } from "@/lib/spawn-registry";

const TRANSFER_KEY = "win98-window-transfer";

export default function MonitorReceiver() {
  const dispatch = useAppDispatch();
  const [flash, setFlash] = useState<"left" | "right" | null>(null);

  const isMonitor2 =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("monitor") === "2";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkForTransfers = () => {
      const raw = localStorage.getItem(TRANSFER_KEY);
      if (!raw) return;

      try {
        const { direction, payload } = JSON.parse(raw);
        const isForUs =
          (isMonitor2 && direction === "to-monitor2") ||
          (!isMonitor2 && direction === "to-monitor1");

        if (isForUs) {
          const { windowId, x, y } = payload;

          const SAFE_MARGIN = 60;

          const clampedX = Math.min(
            Math.max(SAFE_MARGIN, x),
            window.innerWidth - 50,
          );
          const clampedY = Math.min(Math.max(0, y), window.innerHeight - 50);

          spawnRegistry.set(windowId, { x: clampedX, y: clampedY });

          dispatch(openWindow(windowId));
          dispatch(activateWindow(windowId));
          setFlash(isMonitor2 ? "left" : "right");
          setTimeout(() => setFlash(null), 500);

          localStorage.removeItem(TRANSFER_KEY);
        }
      } catch (e) {
        localStorage.removeItem(TRANSFER_KEY);
      }
    };

    const interval = setInterval(checkForTransfers, 50);

    return () => clearInterval(interval);
  }, [dispatch, isMonitor2]);

  return (
    <>
      {flash === "left" && (
        <div
          className="fixed top-0 left-0 bottom-10 w-1 z-[99990] pointer-events-none animate-pulse"
          style={{
            background: "rgba(0,128,255,0.8)",
            boxShadow: "4px 0 16px rgba(0,128,255,0.6)",
          }}
        />
      )}
      {flash === "right" && (
        <div
          className="fixed top-0 right-0 bottom-10 w-1 z-[99990] pointer-events-none animate-pulse"
          style={{
            background: "rgba(0,128,255,0.8)",
            boxShadow: "-4px 0 16px rgba(0,128,255,0.6)",
          }}
        />
      )}
    </>
  );
}
