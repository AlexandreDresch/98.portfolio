"use client";

import { useEffect, useState } from "react";

type MonitorNumber = 1 | 2;

interface MonitorInfo {
  monitor: MonitorNumber;
  isMonitor2: boolean;
  isMonitor1: boolean;
  sendToMonitor2: (payload: { windowId: number; title?: string }) => void;
}

export function useMonitor(): MonitorInfo {
  const [monitor, setMonitor] = useState<MonitorNumber>(1);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("monitor") === "2") setMonitor(2);
  }, []);

  const sendToMonitor2 = (payload: { windowId: number; title?: string }) => {
    try {
      const channel = new BroadcastChannel("win98-dual-monitor");
      channel.postMessage({ type: "open-app", payload });
      channel.close();
    } catch {}
  };

  return {
    monitor,
    isMonitor2: monitor === 2,
    isMonitor1: monitor === 1,
    sendToMonitor2,
  };
}