import { Win98Button } from "@/components/shared/win-98-button";
import Win98Checkbox from "@/components/shared/win-98-checkbox";
import { useState } from "react";
import MonitorPreview from "../monitor-preview";
import { ScreenSaverWrapper } from "./screen-saver-wrapper";
import { ScreenSaverRenderer } from "./screen-saver-renderer";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setScreenSaverType,
  setScreenSaverWait,
  setScreenSaverPassword,
} from "@/store/settings-slice";

const screenSavers = [
  "(None)",
  "3D Pipes",
  "Mystify",
  "Starfield",
  "Flying Windows",
];

export default function ScreenSaver() {
  const dispatch = useAppDispatch();

  const { type, waitMinutes, passwordProtected } = useAppSelector(
    (s) => s.settings.screenSaver,
  );

  const [previewing, setPreviewing] = useState(false);

  return (
    <>
      <MonitorPreview
        wallpaper={{ name: "Screen Saver", color: "#000000" }}
        isScreenSaver
        displayMode="fill"
      />

      <ScreenSaverWrapper active={previewing}>
        <div onClick={() => setPreviewing(false)}>
          <ScreenSaverRenderer type={type} />
        </div>
      </ScreenSaverWrapper>

      <fieldset className="border border-[#808080] border-t-white border-l-white p-3 mb-3">
        <legend className="px-1 text-xs">Screen Saver</legend>

        <div className="flex gap-2 items-start">
          <div className="flex-1">
            <select
              value={type}
              onChange={(e) =>
                dispatch(setScreenSaverType(Number(e.target.value)))
              }
              className="w-full bg-white border-2 border-[#808080] border-t-[#404040] border-l-[#404040] text-xs px-1 py-1"
            >
              {screenSavers.map((ss, index) => (
                <option key={ss} value={index}>
                  {ss}
                </option>
              ))}
            </select>
          </div>

          <Win98Button className="w-[70px]">Settings...</Win98Button>

          <Win98Button onClick={() => setPreviewing(true)}>Preview</Win98Button>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Win98Checkbox
            checked={passwordProtected}
            onChange={(v) => dispatch(setScreenSaverPassword(v))}
            label="Password protected"
          />
          <Win98Button className="ml-auto">Change...</Win98Button>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs">Wait:</span>
          <input
            type="number"
            value={waitMinutes}
            onChange={(e) => {
              const value = Math.max(1, Number(e.target.value) || 1);
              dispatch(setScreenSaverWait(value));
            }}
            className="w-12 bg-white border-2 border-[#808080] border-t-[#404040] border-l-[#404040] text-xs px-1 py-[2px] text-right"
          />
          <span className="text-xs">minutes</span>
        </div>
      </fieldset>

      <fieldset className="border border-[#808080] border-t-white border-l-white p-3">
        <legend className="px-1 text-xs">
          Energy saving features of monitor
        </legend>
        <div className="text-xs text-[#404040]">
          To adjust the power settings for your monitor, click Settings.
        </div>
        <div className="mt-2">
          <Win98Button>Settings...</Win98Button>
        </div>
      </fieldset>
    </>
  );
}
