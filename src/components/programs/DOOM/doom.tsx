"use client";

import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "@/store/store";
import WindowHeader from "@/components/shared/window-header";
import FolderFooterMessage from "@/components/folder/folder-footer-message";
import {
  minimizeWindow,
  closeWindow,
  activateWindow,
} from "@/store/window-manager-slice";
import { useState, useEffect } from "react";

export default function Doom() {
  const dispatch = useAppDispatch();
  const program = useAppSelector((state) =>
    state.windows.windows.find((p) => p.id === 15 && p.type === "program")
  );
  const activeWindowId = useAppSelector(
    (state) => state.windows.activeWindowId
  );

  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 50 });

  useEffect(() => {
    if (program) {
      setIsWindowOpen(program.isOpen);
    }
  }, [program]);

  const handleMinimize = () => {
    dispatch(minimizeWindow(15));
  };

  const handleClose = () => {
    dispatch(closeWindow(15));
  };

  const handleActivate = () => {
    dispatch(activateWindow(15));
  };

  const zIndex = activeWindowId === 15 ? 999 : 60;

  return (
    <>
      {isWindowOpen && (
        <Draggable
          handle=".dragger"
          defaultPosition={position}
          onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
        >
          <div
            className="fixed w-[800px] h-[600px] crt border-[1px] border-solid border-black border-t-white border-l-white bg-[#C0C0C0] p-[1px]"
            style={{ zIndex, left: 0, top: 0 }}
            onClick={handleActivate}
          >
            <div className="dragger">
              <WindowHeader
                icon="/doom.png"
                title="DOOM"
                onClose={handleClose}
                onMaximize={() => {}}
                onMinimize={handleMinimize}
              />
              <div className="mt-4 crt">
                <div className="border-[1px] border-[#808080] flex flex-col min-h-max flex-1 mt-[-15px]">
                  <div className="size-full h-[540px]">
                    <iframe
                      src="https://admiring-davinci-152c0f.netlify.app"
                      title="DOOM"
                      className="size-full"
                      allow="fullscreen"
                    ></iframe>
                  </div>
                  <FolderFooterMessage folderName="DOOM" icon="/doom.png" />
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      )}
    </>
  );
}
