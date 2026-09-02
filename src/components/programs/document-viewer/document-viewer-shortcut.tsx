"use client";

import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { activateWindow, openWindow, selectProgram } from "@/store/window-manager-slice";
import { openDocument } from "@/store/document-viewer-slice";
import { cn } from "@/lib/utils";
import { clearSelectedFile } from "@/store/folders-slice";

interface DocumentViewerShortcutProps {
  id?: number;
  documentPath: string;
  documentType: "pdf" | "markdown";
  title: string;
  folderName: string;
  icon: string;
}

export default function DocumentViewerShortcut({
  id,
  documentPath,
  documentType,
  title,
  folderName,
  icon,
}: DocumentViewerShortcutProps) {
  const dispatch = useAppDispatch();

  const activeWindowId = useAppSelector(
    (state) => state.windows.activeWindowId,
  );

  const windowItem = useAppSelector((state) =>
    state.windows.windows.find((w) => w.id === 25),
  );

  const handleOpen = () => {
    dispatch(
      openDocument({
        documentPath,
        documentType,
        title,
        folderName,
        icon,
      }),
    );

    dispatch(openWindow(25));
  };

  const handleSelection = () => {
      dispatch(clearSelectedFile());
      dispatch(selectProgram(25));
      dispatch(activateWindow(25));
    };

  const isOpen = windowItem?.isOpen || false;
  const isActive = activeWindowId === 25;

  return (
    <button
      type="button"
      onClick={handleSelection}
      onDoubleClick={handleOpen}
      className="w-28 h-max flex flex-col justify-center items-center cursor-pointer select-none"
    >
      <Image src={icon} alt={title} width={38} height={38} />

      <span
        className={cn(
          "font-normal text-sm text-white px-2 bg-[#0c7f80] truncate max-w-full",
          isActive && "bg-[#010f80]",
        )}
      >
        {title}
      </span>
    </button>
  );
}
