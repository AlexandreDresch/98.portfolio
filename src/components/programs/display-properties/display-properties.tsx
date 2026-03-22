"use client";

import { useState } from "react";
import Background from "./background";
import { Win98Button } from "@/components/shared/win-98-button";
import WindowWrapper from "@/components/shared/window-wrapper";

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
  const [activeTab, setActiveTab] = useState("Background");
  const [selectedWallpaper, setSelectedWallpaper] = useState(0);
  const [displayMode, setDisplayMode] = useState("Center");

  return (
    <WindowWrapper
      id={19}
      title="Display Properties"
      icon="/icons/display.png"
      controls={{ close: true, minimize: false, maximize: false }}
      className="w-[420px]"
    >
      {/* Tabs */}
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

      {/* Content */}
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
          <Win98Button>OK</Win98Button>
          <Win98Button>Cancel</Win98Button>
          <Win98Button>Apply</Win98Button>
        </div>
      </div>
    </WindowWrapper>
  );
}
