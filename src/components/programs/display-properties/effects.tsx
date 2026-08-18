"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Win98Button } from "@/components/shared/win-98-button";
import { Win98Checkbox } from "@/components/shared/win-98-checkbox";

interface EffectsState {
  animateWindows: boolean;
  smoothFonts: boolean;
  allColors: boolean;
  showDragContents: boolean;
  hideKeyboardNav: boolean;
  largeIcons: boolean;
  showFullPathTitleBar: boolean;
}

const STORAGE_KEY = "win98-effects";
const CHANNEL_NAME = "win98-dual-monitor";

const DEFAULTS: EffectsState = {
  animateWindows: true,
  smoothFonts: false,
  allColors: true,
  showDragContents: true,
  hideKeyboardNav: true,
  largeIcons: false,
  showFullPathTitleBar: false,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="text-xs font-bold">{children}</span>
      <div className="flex-1 border-t border-[#808080]" />
    </div>
  );
}

function MonitorIcon({
  label,
  active,
  index,
}: {
  label: string;
  active: boolean;
  index: number;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="relative"
        style={{
          width: 64,
          height: 50,
          background: active ? "#008080" : "#404040",
          border: "3px solid",
          borderColor: active
            ? "white #808080 #808080 white"
            : "#808080 #404040 #404040 #808080",
        }}
      >
        {active && (
          <div className="absolute inset-1 flex items-center justify-center">
            <div className="w-full h-full bg-[#000080] opacity-60 flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">{index}</span>
            </div>
          </div>
        )}
        {!active && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#808080] text-[8px]">{index}</span>
          </div>
        )}
        {active && (
          <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-[#c0c0c0]" />
        )}
      </div>
      <div
        style={{
          width: 18,
          height: 8,
          background: "#c0c0c0",
          border: "1px solid #808080",
        }}
      />
      <div
        style={{
          width: 30,
          height: 4,
          background: "#c0c0c0",
          border: "1px solid #808080",
        }}
      />
      <span className="text-[10px] text-center">{label}</span>
    </div>
  );
}

export default function Effects() {
  const [effects, setEffects] = useState<EffectsState>(() => {
    if (typeof window === "undefined") return DEFAULTS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULTS, ...JSON.parse(stored) } : DEFAULTS;
    } catch {
      return DEFAULTS;
    }
  });

  const [dualMonitorActive, setDualMonitorActive] = useState(false);
  const [dualMonitorStatus, setDualMonitorStatus] = useState<
    "idle" | "opening" | "active" | "error"
  >("idle");
  const secondWindowRef = useRef<Window | null>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(effects));
    } catch {}
  }, [effects]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      channelRef.current = new BroadcastChannel(CHANNEL_NAME);
      channelRef.current.onmessage = (e) => {
        if (e.data?.type === "monitor2-ready") setDualMonitorStatus("active");
        if (e.data?.type === "monitor2-closed") {
          setDualMonitorActive(false);
          setDualMonitorStatus("idle");
          secondWindowRef.current = null;
          if (pollRef.current) clearInterval(pollRef.current);
        }
      };
    } catch {}
    return () => {
      channelRef.current?.close();
    };
  }, []);

  const toggle = (key: keyof EffectsState) =>
    setEffects((prev) => ({ ...prev, [key]: !prev[key] }));

  const openSecondMonitor = useCallback(() => {
    if (secondWindowRef.current && !secondWindowRef.current.closed) {
      secondWindowRef.current.focus();
      return;
    }

    setDualMonitorStatus("opening");

    const sw =
      typeof screen !== "undefined" ? screen.width : window.innerWidth * 2;
    const sh =
      typeof screen !== "undefined" ? screen.height : window.innerHeight;
    const halfW = Math.floor(sw / 2);

    try {
      window.moveTo(0, 0);
      window.resizeTo(halfW, sh);
    } catch {}

    const url = new URL(window.location.href);
    url.searchParams.set("monitor", "2");

    const features = [
      `width=${halfW}`,
      `height=${sh}`,
      `left=${halfW}`,
      `top=0`,
      "menubar=no",
      "toolbar=no",
      "location=no",
      "status=no",
      "scrollbars=no",
    ].join(",");

    const win = window.open(url.toString(), "win98-monitor-2", features);

    if (!win) {
      setDualMonitorStatus("error");
      return;
    }

    secondWindowRef.current = win;
    setDualMonitorActive(true);

    pollRef.current = setInterval(() => {
      if (secondWindowRef.current?.closed) {
        setDualMonitorActive(false);
        setDualMonitorStatus("idle");
        secondWindowRef.current = null;
        clearInterval(pollRef.current!);
        try {
          window.resizeTo(sw, sh);
          window.moveTo(0, 0);
        } catch {}
        channelRef.current?.postMessage({ type: "monitor1-restored" });
      }
    }, 800);
  }, []);

  const closeSecondMonitor = useCallback(() => {
    if (secondWindowRef.current && !secondWindowRef.current.closed) {
      secondWindowRef.current.close();
    }
    setDualMonitorActive(false);
    setDualMonitorStatus("idle");
    secondWindowRef.current = null;
    if (pollRef.current) clearInterval(pollRef.current);
    try {
      const sw = screen.width;
      const sh = screen.height;
      window.moveTo(0, 0);
      window.resizeTo(sw, sh);
    } catch {}
  }, []);

  useEffect(
    () => () => {
      if (pollRef.current) clearInterval(pollRef.current);
    },
    [],
  );

  const statusText: Record<typeof dualMonitorStatus, string> = {
    idle: "",
    opening: "Opening second monitor...",
    active: "Second monitor is active.",
    error: "Could not open window. Check your browser's popup blocker.",
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <SectionLabel>Visual effects</SectionLabel>
        <div className="flex flex-col gap-2 pl-1">
          <Win98Checkbox
            checked={effects.animateWindows}
            onChange={() => toggle("animateWindows")}
            label="Animate windows, menus and lists"
          />
          <Win98Checkbox
            checked={effects.smoothFonts}
            onChange={() => toggle("smoothFonts")}
            label="Smooth edges of screen fonts"
          />
          <Win98Checkbox
            checked={effects.allColors}
            onChange={() => toggle("allColors")}
            label="Show icons using all possible colors"
          />
          <Win98Checkbox
            checked={effects.showDragContents}
            onChange={() => toggle("showDragContents")}
            label="Show window contents while dragging"
          />
          <Win98Checkbox
            checked={effects.largeIcons}
            onChange={() => toggle("largeIcons")}
            label="Use large icons"
          />
          <Win98Checkbox
            checked={effects.showFullPathTitleBar}
            onChange={() => toggle("showFullPathTitleBar")}
            label="Show full path in title bar"
          />
          <Win98Checkbox
            checked={effects.hideKeyboardNav}
            onChange={() => toggle("hideKeyboardNav")}
            label="Hide keyboard navigation indicators until I use the Alt key"
          />
        </div>
      </div>

      <div>
        <SectionLabel>Multiple monitors</SectionLabel>

        <div className="flex items-end justify-center gap-2 mb-2 py-2 bg-[#000080] rounded-sm">
          <MonitorIcon label="1. Primary" active index={1} />
          <MonitorIcon
            label="2. Extended"
            active={dualMonitorActive}
            index={2}
          />
        </div>

        <p className="text-[11px] text-[#444] mb-2 leading-tight">
          Open the desktop across two browser windows, side by side — just like
          a real dual-monitor setup. The main window moves to the left half of
          your screen and a second window extends it on the right.
        </p>

        {dualMonitorStatus === "error" && (
          <div
            className="mb-2 px-2 py-1 text-[11px]"
            style={{
              background: "#fffff0",
              border: "1px solid #808080",
              color: "#800000",
            }}
          >
            ⚠ {statusText.error}
          </div>
        )}

        {dualMonitorStatus === "active" && (
          <div
            className="mb-2 px-2 py-1 text-[11px]"
            style={{
              background: "#f0fff0",
              border: "1px solid #008000",
              color: "#006000",
            }}
          >
            ✓ {statusText.active}
          </div>
        )}

        {dualMonitorStatus === "opening" && (
          <div
            className="mb-2 px-2 py-1 text-[11px] animate-pulse"
            style={{ border: "1px solid #808080" }}
          >
            ⟳ {statusText.opening}
          </div>
        )}

        <div className="flex items-center gap-2">
          {!dualMonitorActive ? (
            <Win98Button onClick={openSecondMonitor}>
              Extend desktop to second monitor
            </Win98Button>
          ) : (
            <Win98Button onClick={closeSecondMonitor}>
              Disconnect second monitor
            </Win98Button>
          )}
        </div>

        <p className="text-[10px] text-[#808080] mt-1 leading-tight">
          Note: Your browser must allow popups for this site. If a popup blocker
          is active, click &quot;Allow&quot; when prompted.
        </p>
      </div>
    </div>
  );
}
