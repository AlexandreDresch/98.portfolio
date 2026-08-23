"use client";

import { useEffect, useState } from "react";

const MONITOR2_ACTIVE_KEY = "win98-monitor2-active";

export default function Monitor2Init() {
  const [isMonitor2, setIsMonitor2] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("monitor") !== "2") return;

    setIsMonitor2(true);

    localStorage.setItem(
      MONITOR2_ACTIVE_KEY,
      JSON.stringify({ active: true, ts: Date.now() }),
    );

    const onUnload = () => localStorage.removeItem(MONITOR2_ACTIVE_KEY);
    window.addEventListener("beforeunload", onUnload);

    const onPageHide = () => localStorage.removeItem(MONITOR2_ACTIVE_KEY);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      window.removeEventListener("beforeunload", onUnload);
      window.removeEventListener("pagehide", onPageHide);
      localStorage.removeItem(MONITOR2_ACTIVE_KEY);
    };
  }, []);

  if (!isMonitor2) return null;

  return (
    <div
      className="fixed bottom-12 left-2 z-[99999] pointer-events-none select-none"
      style={{
        background: "rgba(0,0,0,0.55)",
        color: "#fff",
        fontSize: 10,
        padding: "2px 6px",
        fontFamily: "Arial, sans-serif",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      Monitor 2
    </div>
  );
}
