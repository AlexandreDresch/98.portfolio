"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/store";
import WindowHeader from "@/components/shared/window-header";
import FolderFooterMessage from "@/components/folder/folder-footer-message";
import {
  minimizeWindow,
  maximizeWindow,
  closeWindow,
  activateWindow,
  openWindow,
} from "@/store/window-manager-slice";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export default function Doom() {
  const dispatch = useAppDispatch();
  const program = useAppSelector((state) =>
    state.windows.windows.find((p) => p.id === 15 && p.type === "program")
  );
  const activeWindowId = useAppSelector(
    (state) => state.windows.activeWindowId
  );

  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (program) {
      setIsWindowOpen(program.isOpen);
    }
  }, [program]);

  const handleMinimize = () => dispatch(minimizeWindow(15));
  const handleMaximize = () => dispatch(maximizeWindow(15));
  const handleClose = () => dispatch(closeWindow(15));
  const handleActivate = () => dispatch(activateWindow(15));

  const zIndex = activeWindowId === 15 ? 999 : 60;

  useEffect(() => {
    if (!windowRef.current || program?.isMaximized) return;

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program?.isMaximized]);

  const handleUnminimize = () => {
    if (program?.isMinimized) dispatch(openWindow(15));
  };

  if (program?.isMinimized && !program.isOpen) return null;

  return (
    <AnimatePresence>
      {isWindowOpen && (
        <motion.div
          ref={windowRef}
          onMouseDown={handleActivate}
          onDoubleClick={handleUnminimize}
          style={{ zIndex }}
          initial={{
            opacity: 0,
            scale: 0.8,
            y: program?.isMinimized ? 300 : 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: program?.isMinimized ? 300 : 0,
            transition: {
              type: "spring",
              stiffness: 160,
              damping: 18,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.15 },
          }}
          layout
          className={cn(
            "absolute border-2 border-t-white border-l-white border-r-gray-900 border-b-gray-900 bg-[#C0C0C0] shadow-lg",
            program?.isMaximized
              ? "left-0 top-0 w-[100vw] h-[calc(100dvh-32px)]"
              : "left-[120px] top-[80px] w-[800px] h-[600px]"
          )}
        >
          <motion.div
            layout
            className="dragger flex flex-col w-full min-w-0 h-full min-h-0"
            style={{
              height: program?.isMaximized
                ? "calc(100dvh - 32px)"
                : "100%",
            }}
            transition={{
              type: "tween",
              duration: 0.15,
            }}
          >
            <WindowHeader
              icon="/doom.png"
              title="DOOM"
              onClose={handleClose}
              onMaximize={handleMaximize}
              onMinimize={handleMinimize}
            />

            <div className="flex flex-col flex-1 min-h-0 border border-[#808080] overflow-hidden">
              <iframe
                src="https://admiring-davinci-152c0f.netlify.app"
                title="DOOM"
                className="flex-1 w-full min-h-0 outline-none border-none"
                allow="fullscreen"
              />
              <FolderFooterMessage folderName="DOOM" icon="/doom.png" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
