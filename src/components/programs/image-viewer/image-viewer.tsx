"use client";

import { useAppSelector } from "@/store/store";
import WindowWrapper from "../../shared/window-wrapper";
import ImageSlider from "./image-slider";

export default function ImageViewer() {
  const { images, currentIndex } = useAppSelector((state) => state.imageViewer);

  return (
    <WindowWrapper
      id={11}
      title="Image Viewer"
      icon="/icons/kodak-image.png"
      controls={{
        close: true,
        minimize: true,
        maximize: true,
      }}
      className="!w-[980px] !h-[720px]"
      crtEffect={false}
    >
      <div className="flex h-full min-h-0 flex-col bg-[#C0C0C0]">
        {images.length > 0 && (
          <ImageSlider images={images} initialIndex={currentIndex} />
        )}
      </div>
    </WindowWrapper>
  );
}
