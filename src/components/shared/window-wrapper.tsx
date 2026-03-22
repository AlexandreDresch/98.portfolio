"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { closeWindow, activateWindow } from "@/store/window-manager-slice";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import WindowHeader from "@/components/shared/window-header";
import { WindowWrapperProps } from "@/types";


export default function WindowWrapper({
  id,
  title,
  icon,
  children,
  className,
  controls,
}: WindowWrapperProps) {
  const dispatch = useAppDispatch();

  const program = useAppSelector((state) =>
    state.windows.windows.find((p) => p.id === id && p.type === "program"),
  );

  const activeWindowId = useAppSelector(
    (state) => state.windows.activeWindowId,
  );

  const windowRef = useRef<HTMLDivElement>(null);

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

    const onMouseDown = (e: MouseEvent) => {
      dragging = true;
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
      {program.isOpen && (
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
          exit={{ opacity: 0, scale: 0.9 }}
          className={cn(
            "crt absolute left-[160px] top-[120px]",
            "border-2 border-t-white border-l-white border-r-gray-900 border-b-gray-900 bg-[#C0C0C0] shadow-lg",
            className,
          )}
        >
          <div className="dragger flex flex-col w-full">
            <WindowHeader
              icon={icon}
              title={title}
              onClose={handleClose}
              controls={controls}
            />

            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
