"use client";

import { useEffect, useState } from "react";

const CHANNEL_NAME = "win98-dual-monitor";

export default function Monitor2Init() {
  const [isMonitor2, setIsMonitor2] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("monitor") !== "2") return;

    setIsMonitor2(true);

    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel(CHANNEL_NAME);
      channel.postMessage({ type: "monitor2-ready" });

      const onUnload = () => channel?.postMessage({ type: "monitor2-closed" });
      window.addEventListener("beforeunload", onUnload);

      return () => {
        window.removeEventListener("beforeunload", onUnload);
        channel?.close();
      };
    } catch {}
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
