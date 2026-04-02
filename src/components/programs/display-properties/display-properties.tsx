"use client";

import { useEffect, useState } from "react";
import Background from "./background";
import { Win98Button } from "@/components/shared/win-98-button";
import WindowWrapper from "@/components/shared/window-wrapper";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setWallpaper,
  setWallpaperMode,
  applySettings,
  resetSettings,
} from "@/store/settings-slice";
import { WallpaperMode } from "@/types";
import { closeWindow } from "@/store/window-manager-slice";
import ScreenSaver from "./screen-saver/screen-saver";

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

  const dispatch = useAppDispatch();

  const { draft, applied } = useAppSelector((state) => state.settings);

  useEffect(() => {
    const index = wallpapers.findIndex(
      (wp) => "image" in wp && wp.image === draft.wallpaper,
    );

    if (index !== -1) setSelectedWallpaper(index);

    setDisplayMode(
      draft.wallpaperMode.charAt(0).toUpperCase() +
        draft.wallpaperMode.slice(1),
    );
  }, [draft.wallpaper, draft.wallpaperMode]);

  const handleWallpaperChange = (index: number, mode: string) => {
    const selected = wallpapers[index];

    dispatch(setWallpaper("image" in selected ? selected.image || "" : ""));

    dispatch(setWallpaperMode(mode.toLowerCase() as WallpaperMode));
  };

  const isDirty = JSON.stringify(draft) !== JSON.stringify(applied);

  return (
    <WindowWrapper
      id={19}
      title="Display Properties"
      icon="/icons/display.png"
      controls={{ close: true, minimize: false, maximize: false }}
      className={`!w-[420px] ${activeTab === "Screen Saver" && "!h-[660px]"}`}
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
            setSelectedWallpaper={(i) => {
              setSelectedWallpaper(i);
            }}
            displayMode={displayMode}
            setDisplayMode={setDisplayMode}
            onChange={handleWallpaperChange}
          />
        )}

        {activeTab === "Screen Saver" && <ScreenSaver />}

        {activeTab !== "Background" && activeTab !== "Screen Saver" && (
          <p>Not implemented</p>
        )}

        <div className="py-2 flex justify-end gap-1">
          <Win98Button
            onClick={() => {
              dispatch(applySettings());
              dispatch(closeWindow(19));
            }}
          >
            OK
          </Win98Button>

          <Win98Button
            onClick={() => {
              dispatch(resetSettings());
              dispatch(closeWindow(19));
            }}
          >
            Cancel
          </Win98Button>

          <Win98Button
            disabled={!isDirty}
            onClick={() => dispatch(applySettings())}
          >
            Apply
          </Win98Button>
        </div>
      </div>
    </WindowWrapper>
  );
}
