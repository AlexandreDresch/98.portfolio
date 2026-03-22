"use client";

import { useState } from "react";
import Background from "./background";
import { Win98Button } from "@/components/shared/win-98-button";
import WindowWrapper from "@/components/shared/window-wrapper";

const wallpapers = [
  { name: "(None)", color: "#008080" },

  { name: "Sky", image: "/wallpaper/default.jpg" },
  { name: "Car", image: "/wallpaper/car.jpg" },
  { name: "Cassette", image: "/wallpaper/cassette.jpg" },
  { name: "Cat", image: "/wallpaper/cat.jpg" },
  { name: "Mountains", image: "/wallpaper/mountains.jpg" },
  { name: "Sunflowers", image: "/wallpaper/sunflowers.jpg" },
  { name: "Brown Tiger", image: "/wallpaper/tiger.jpg" },
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
  const [displayMode, setDisplayMode] = useState("Fill");

  return (
    <WindowWrapper
      id={19}
      title="Display Properties"
      icon="/icons/display.png"
      controls={{ close: true, minimize: false, maximize: false }}
      className="!w-[420px]"
    >
      <div className="px-2 pt-2">
        <div className="flex">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-1 text-xs relative ${
                activeTab === tab
                  ? "bg-[#c0c0c0] border-t border-l border-white border-r border-r-[#404040] -mb-[1px] z-10 crt"
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
          <Win98Button>OK</Win98Button>
          <Win98Button>Cancel</Win98Button>
          <Win98Button>Apply</Win98Button>
        </div>
      </div>
    </WindowWrapper>
  );
}
