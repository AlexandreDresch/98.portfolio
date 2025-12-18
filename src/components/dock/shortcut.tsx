"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { clearSelectedFile } from "@/store/folders-slice";
import {
  openWindow,
  activateWindow,
  selectProgram,
} from "@/store/window-manager-slice";
import { ShortcutProps } from "@/types";
import { cn } from "@/lib/utils";
import FolderLayout from "../folder/folder-layout";

export default function Shortcut({ folder, children }: ShortcutProps) {
  const dispatch = useAppDispatch();

  const windowItem = useAppSelector((state) =>
    state.windows.windows.find((w) => w.id === folder.id)
  );

  const activeWindowId = useAppSelector(
    (state) => state.windows.activeWindowId
  );

  const isOpen = windowItem?.isOpen || false;
  const isActive = activeWindowId === folder.id;
  const isMaximized = windowItem?.isMaximized || false;

  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [zIndex, setZIndex] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const [originalPosition, setOriginalPosition] = useState({ x: 100, y: 100 });
  const [_, setOriginalSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (isOpen && position.x === 100 && position.y === 100) {
      const baseX = 100 + (folder.id % 5) * 30;
      const baseY = 100 + Math.floor(folder.id / 5) * 30;
      setPosition({ x: baseX, y: baseY });
      setOriginalPosition({ x: baseX, y: baseY });
    }
  }, [isOpen, folder.id, position, isMaximized]);

  useEffect(() => {
    if (isActive) {
      setZIndex(50);
    } else if (isOpen) {
      setZIndex(10);
    }
  }, [isActive, isOpen]);

  useEffect(() => {
    if (isMaximized) {
      setOriginalPosition(position);
      if (windowRef.current) {
        setOriginalSize({
          width: windowRef.current.offsetWidth,
          height: windowRef.current.offsetHeight,
        });
      }

      setPosition({ x: 0, y: 0 });
    } else {
      setPosition(originalPosition);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMaximized, originalPosition]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      const boundedX = Math.max(0, Math.min(newX, window.innerWidth - 400));
      const boundedY = Math.max(0, Math.min(newY, window.innerHeight - 200));

      setPosition({ x: boundedX, y: boundedY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleDoubleClick = () => {
    dispatch(clearSelectedFile());
    if (!isOpen) {
      dispatch(openWindow(folder.id));
    }
    dispatch(activateWindow(folder.id));
  };

  const handleShortcutClick = () => {
    dispatch(clearSelectedFile());
    dispatch(selectProgram(folder.id));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      !target.closest(".dragger") &&
      !target.closest(".window-controls") &&
      !target.closest("button")
    ) {
      return;
    }

    if (target.closest("button")) return;

    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });

    if (!isActive) {
      dispatch(activateWindow(folder.id));
    }
  };

  if (!isOpen) {
    return (
      <div
        className="w-28 h-max flex flex-col justify-center items-center cursor-pointer select-none"
        onDoubleClick={handleDoubleClick}
        onClick={handleShortcutClick}
      >
        <Image
          width={100}
          height={100}
          alt={folder.name}
          src={folder.image}
          quality={100}
          className="w-10 h-auto object-fill"
        />
        <span
          className={cn(
            "font-normal text-sm text-white px-2 bg-[#0c7f80] truncate max-w-full",
            isActive && "bg-[#010f80]"
          )}
        >
          {folder.name}
        </span>
      </div>
    );
  }

  return (
    <>
      <div
        className="w-28 h-max flex flex-col justify-center items-center cursor-pointer select-none"
        onDoubleClick={handleDoubleClick}
        onClick={handleShortcutClick}
      >
        <Image
          width={100}
          height={100}
          alt={folder.name}
          src={folder.image}
          quality={100}
          className="w-10 h-auto object-fill"
        />
        <span
          className={cn(
            "font-normal text-sm text-white px-2 bg-[#0c7f80] truncate max-w-full",
            isActive && "bg-[#010f80]"
          )}
        >
          {folder.name}
        </span>
      </div>

      <div
        ref={windowRef}
        className="absolute border-2 border-t-white border-l-white border-r-gray-900 border-b-gray-900 bg-[#C0C0C0] shadow-lg"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex,
          width: isMaximized ? "100vw" : "800px",
          maxWidth: "calc(100vw - 1px)",
          maxHeight: "calc(100vh - 32px)",
          minWidth: "800px",
        }}
        onMouseDown={handleMouseDown}
      >
        <div
          className="flex flex-col w-full min-w-0 h-full min-h-0"
          style={{
            height: isMaximized ? "calc(100dvh - 32px)" : "calc(100% - 32px)",
          }}
        >
          <FolderLayout folder={folder}>{children}</FolderLayout>
        </div>
      </div>
    </>
  );
}
