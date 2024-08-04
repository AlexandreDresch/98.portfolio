"use client";

import { ImageMagnifierProps } from "@/types";
import Image from "next/image";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";

export default function ImageMagnifier({ src, alt }: ImageMagnifierProps) {
  const magnifierHeight = 150;
  const magnifierWidth = 180;
  const zoomLevel = 1.8;

  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierEnabled, setMagnifierEnabled] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      if (!magnifierEnabled) return;
      const { width, height } = e.currentTarget.getBoundingClientRect();
      setImgDimensions({ width, height });
      setShowMagnifier(true);
    },
    [magnifierEnabled]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      if (!magnifierEnabled) return;
      const { top, left } = e.currentTarget.getBoundingClientRect();
      const x = e.pageX - left - window.scrollX;
      const y = e.pageY - top - window.scrollY;
      setXY([x, y]);
    },
    [magnifierEnabled]
  );

  const handleMouseLeave = useCallback(() => {
    setShowMagnifier(false);
  }, []);

  const toggleMagnifier = () => {
    setMagnifierEnabled((prev) => !prev);
    setShowMagnifier(false);
  };

  return (
    <>
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="contain"
        className="h-full w-full"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      <Button
        size="icon"
        variant="ghost"
        onClick={toggleMagnifier}
        className="absolute top-2 right-2 size-6"
      >
        <Image src="/icons/magnifying-glass.png" fill alt="Magnifying Glass" />
      </Button>

      {showMagnifier && magnifierEnabled && (
        <div
          className="absolute pointer-events-none border border-gray-200 bg-white"
          style={{
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            backgroundImage: `url('${src}')`,
            backgroundSize: `${imgDimensions.width * zoomLevel}px ${
              imgDimensions.height * zoomLevel
            }px`,
            backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          }}
        />
      )}
    </>
  );
}
