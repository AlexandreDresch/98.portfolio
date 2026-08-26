"use client";

import Image from "next/image";
import { useAppDispatch } from "@/store/store";
import { openImageViewer } from "@/store/image-viewer-slice";
import { openWindow } from "@/store/window-manager-slice";

interface ImageShortcutProps {
  name: string;
  imageUrl: string;
  images: string[];
}

export default function ImageShortcut({
  name,
  imageUrl,
  images,
}: ImageShortcutProps) {
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    dispatch(
      openImageViewer({
        imageUrl,
        images,
      }),
    );

    dispatch(openWindow(11));
  };

  return (
    <button
      type="button"
      onDoubleClick={handleOpen}
      className="flex flex-col items-center gap-1 cursor-pointer"
    >
      <Image src="/icons/kodak-image.png" alt={name} width={38} height={38} />

      <span className="text-sm font-normal">{name}</span>
    </button>
  );
}
