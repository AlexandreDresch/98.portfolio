"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  closeWindow,
  activateWindow,
  maximizeWindow,
  minimizeWindow,
  openWindow,
} from "@/store/window-manager-slice";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import WindowHeader from "@/components/shared/window-header";
import { WindowWrapperProps } from "@/types";
import { spawnRegistry } from "@/lib/spawn-registry";

const TRANSFER_KEY = "win98-window-transfer";
const EDGE_THRESHOLD = 40;
const NEAR_THRESHOLD = 120;

export default function WindowWrapper({
  id,
  title,
  icon,
  children,
  className,
  controls,
  crtEffect = true,
}: WindowWrapperProps) {
  const dispatch = useAppDispatch();

  const program = useAppSelector((state) =>
    state.windows.windows.find((p) => p.id === id && p.type === "program"),
  );

  const activeWindowId = useAppSelector(
    (state) => state.windows.activeWindowId,
  );

  const windowRef = useRef<HTMLDivElement>(null);
  const transferredRef = useRef(false);

  const handleMinimize = () => dispatch(minimizeWindow(id));
  const handleMaximize = () => dispatch(maximizeWindow(id));
  const handleClose = () => dispatch(closeWindow(id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleActivate = () => dispatch(activateWindow(id));

  const zIndex = activeWindowId === id ? 999 : 60;

  useEffect(() => {
    if (!windowRef.current) return;

    const el = windowRef.current;
    const dragger = el.querySelector(".dragger") as HTMLElement;
    if (!dragger) return;

    let offsetX = 0;
    let offsetY = 0;
    let dragging = false;

    const isMonitor2 =
      new URLSearchParams(window.location.search).get("monitor") === "2";

    const onMouseDown = (e: MouseEvent) => {
      dragging = true;
      transferredRef.current = false;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
      handleActivate();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return;

      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;

      el.style.left = `${x}px`;
      el.style.top = `${y}px`;

      if (!transferredRef.current) {
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const edgeW = window.innerWidth;
        const centrumX = x + w / 2;

        const nearEdge =
          (!isMonitor2 && centrumX > edgeW - NEAR_THRESHOLD) ||
          (isMonitor2 && x < NEAR_THRESHOLD);

        el.style.outline = nearEdge ? "2px solid rgba(0,128,255,0.55)" : "";
        el.style.outlineOffset = nearEdge ? "-2px" : "";

        if (!isMonitor2 && centrumX > edgeW - EDGE_THRESHOLD) {
          transferredRef.current = true;
          el.style.outline = "";

          const safeX = Math.max(
            EDGE_THRESHOLD + 20,
            x - edgeW + EDGE_THRESHOLD,
          );

          localStorage.setItem(
            TRANSFER_KEY,
            JSON.stringify({
              direction: "to-monitor2",
              payload: {
                windowId: id,
                x: safeX,
                y,
                width: w,
                height: h,
              },
            }),
          );

          dispatch(closeWindow(id));
          return;
        }

        if (isMonitor2 && x < EDGE_THRESHOLD) {
          transferredRef.current = true;
          el.style.outline = "";

          const safeX = Math.max(
            EDGE_THRESHOLD + 20,
            window.innerWidth - w - EDGE_THRESHOLD + x,
          );

          localStorage.setItem(
            TRANSFER_KEY,
            JSON.stringify({
              direction: "to-monitor1",
              payload: {
                windowId: id,
                x: safeX,
                y,
                width: w,
                height: h,
              },
            }),
          );

          dispatch(closeWindow(id));
          return;
        }
      }
    };

    const onMouseUp = () => {
      dragging = false;
      el.style.outline = "";
    };

    dragger.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      dragger.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [handleActivate, id, dispatch]);

  useEffect(() => {
    if (!program?.isOpen) return;
    if (!windowRef.current) return;

    const spawn = spawnRegistry.get(id);
    if (!spawn) return;

    windowRef.current.style.left = `${spawn.x}px`;
    windowRef.current.style.top = `${spawn.y}px`;
    spawnRegistry.delete(id);
  }, [id, program?.isOpen]);

  const handleUnminimize = () => {
    if (program?.isMinimized) dispatch(openWindow(id));
  };

  if (program?.isMinimized && !program.isOpen) return null;

  return (
    <AnimatePresence>
      {program?.isOpen && (
        <motion.div
          key={id}
          ref={windowRef}
          onMouseDown={handleActivate}
          onDoubleClick={handleUnminimize}
          style={{ zIndex }}
          initial={{
            opacity: 0,
            scale: 0.9,
            y: program?.isMinimized ? 300 : 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: program?.isMinimized ? 300 : 0,
            transition: { type: "spring", stiffness: 160, damping: 18 },
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={cn(
            "absolute left-[160px] top-[120px]",
            crtEffect && "crt",
            "border-2 border-t-white border-l-white border-r-gray-900 border-b-gray-900 bg-[#C0C0C0] shadow-lg",
            className,
            program?.isMaximized
              ? "left-0 top-0 !w-[100vw] h-[calc(100dvh-32px)]"
              : "left-[120px] top-[80px] w-[800px] h-[600px]",
          )}
        >
          <motion.div
            layout
            className="flex flex-col w-full min-w-0 h-full min-h-0"
            style={{
              height: program?.isMaximized ? "calc(100dvh - 32px)" : "100%",
            }}
            transition={{ type: "tween", duration: 0.15 }}
          >
            <WindowHeader
              icon={icon}
              title={title}
              onMaximize={handleMaximize}
              onMinimize={handleMinimize}
              onClose={handleClose}
              controls={controls}
            />

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
