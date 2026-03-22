"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/store";
import WindowHeader from "@/components/shared/window-header";
import { closeWindow, activateWindow } from "@/store/window-manager-slice";
import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

import Background from "./background";
import { Win98Button } from "@/components/shared/win-98-button";

const wallpapers = [
  { name: "(None)", color: "#008080" },
  { name: "1stboot", color: "#000080" },
  { name: "Black Thatch", color: "#2a2a2a" },
  { name: "Blue Rivets", color: "#4169e1" },
  { name: "Bubbles", color: "#87ceeb" },
  { name: "Carved Stone", color: "#808080" },
  { name: "Circles", color: "#6b8e23" },
  { name: "Clouds", color: "#b0e0e6" },
  { name: "Forest", color: "#228b22" },
  { name: "Gold Weave", color: "#daa520" },
  { name: "Houndstooth", color: "#1c1c1c" },
  { name: "Pinstripe", color: "#2f4f4f" },
  { name: "Sandstone", color: "#c2b280" },
  { name: "Setup", color: "#000080" },
  { name: "Straw Mat", color: "#8b7355" },
  { name: "Tiles", color: "#cd853f" },
  { name: "Waves", color: "#4682b4" },
];

const tabs = [
  "Background",
  "Screen Saver",
  "Appearance",
  "Effects",
  "Web",
  "Settings",
];

export function DisplayProperties() {
  const dispatch = useAppDispatch();

  const program = useAppSelector((state) =>
    state.windows.windows.find((p) => p.id === 19 && p.type === "program"),
  );

  const activeWindowId = useAppSelector(
    (state) => state.windows.activeWindowId,
  );

  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState("Background");
  const [selectedWallpaper, setSelectedWallpaper] = useState(0);
  const [displayMode, setDisplayMode] = useState("Center");

  useEffect(() => {
    if (program) {
      setIsWindowOpen(program.isOpen);
    }
  }, [program]);

  const handleClose = () => dispatch(closeWindow(19));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleActivate = () => dispatch(activateWindow(19));

  const zIndex = activeWindowId === 19 ? 999 : 60;

  useEffect(() => {
    if (!windowRef.current) return;

    const el = windowRef.current;
    const dragger = el.querySelector(".dragger") as HTMLElement;
    if (!dragger) return;

    let offsetX = 0;
    let offsetY = 0;
    let dragging = false;

    const onMouseDown = (e: MouseEvent) => {
      dragging = true;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
      handleActivate();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      el.style.left = `${e.clientX - offsetX}px`;
      el.style.top = `${e.clientY - offsetY}px`;
    };

    const onMouseUp = () => (dragging = false);

    dragger.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      dragger.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [handleActivate]);

  if (!program?.isOpen) return null;

  return (
    <AnimatePresence>
      {isWindowOpen && (
        <motion.div
          ref={windowRef}
          onMouseDown={handleActivate}
          style={{ zIndex }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 160, damping: 18 },
          }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
          className={cn(
            "crt absolute left-[160px] top-[120px] w-[420px]",
            "border-2 border-t-white border-l-white border-r-gray-900 border-b-gray-900 bg-[#C0C0C0] shadow-lg",
          )}
        >
          <div className="dragger flex flex-col w-full">
            <WindowHeader
              icon="/icons/display.png"
              title="Display Properties"
              onClose={handleClose}
              controls={{ close: true, minimize: false, maximize: false }}
            />

            <div className="px-2 pt-2">
              <div className="flex">
                {tabs.map((tab, index) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`crt px-2 py-1 text-xs relative ${
                      activeTab === tab
                        ? "bg-[#c0c0c0] border-t border-l border-white border-r border-r-[#404040] -mb-[1px] z-10"
                        : "bg-[#c0c0c0] border-t border-l border-white border-r border-r-[#404040] border-b border-b-[#808080] mt-[2px]"
                    }`}
                    style={{ marginLeft: index === 0 ? 0 : -1 }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="mx-2 mb-2 p-4 bg-[#c0c0c0] border border-white border-t-[#808080] border-l-[#808080] min-h-[300px]">
              {activeTab === "Background" && (
                <Background
                  wallpapers={wallpapers}
                  selectedWallpaper={selectedWallpaper}
                  setSelectedWallpaper={setSelectedWallpaper}
                  displayMode={displayMode}
                  setDisplayMode={setDisplayMode}
                />
              )}

              {activeTab !== "Background" && <p>Not implemented</p>}

              <div className="py-2 flex justify-end gap-1">
                <Win98Button onClick={() => {}}>OK</Win98Button>
                <Win98Button onClick={handleClose}>Cancel</Win98Button>
                <Win98Button onClick={() => {}}>Apply</Win98Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
