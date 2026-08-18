"use client";

import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/store/store";
import { openWindow } from "@/store/window-manager-slice";

const CHANNEL = "win98-dual-monitor";

export default function MonitorReceiver() {
  const dispatch = useAppDispatch();
  const channelRef = useRef<BroadcastChannel | null>(null);
  const [flash, setFlash] = useState<"left" | "right" | null>(null);

  const isMonitor2 =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("monitor") === "2";

  useEffect(() => {
    try {
      channelRef.current = new BroadcastChannel(CHANNEL);
      channelRef.current.onmessage = (e) => {
        const { type, direction, payload } = e.data ?? {};
        if (type !== "window-transfer") return;

        const isForUs =
          (isMonitor2  && direction === "to-monitor2") ||
          (!isMonitor2 && direction === "to-monitor1");

        if (!isForUs) return;

        const { windowId, x, y } = payload as {
          windowId: number;
          x: number;
          y: number;
        };

        sessionStorage.setItem(
          `win98-window-${windowId}-spawn`,
          JSON.stringify({ x, y }),
        );

        dispatch(openWindow(windowId));

        setFlash(isMonitor2 ? "left" : "right");
        setTimeout(() => setFlash(null), 500);
      };
    } catch {}

    return () => channelRef.current?.close();
  }, [dispatch, isMonitor2]);

  return (
    <>
      {flash === "left" && (
        <div
          className="fixed top-0 left-0 bottom-10 w-1 z-[99990] pointer-events-none animate-pulse"
          style={{ background: "rgba(0,128,255,0.8)", boxShadow: "4px 0 16px rgba(0,128,255,0.6)" }}
        />
      )}
      {flash === "right" && (
        <div
          className="fixed top-0 right-0 bottom-10 w-1 z-[99990] pointer-events-none animate-pulse"
          style={{ background: "rgba(0,128,255,0.8)", boxShadow: "-4px 0 16px rgba(0,128,255,0.6)" }}
        />
      )}
    </>
  );
}