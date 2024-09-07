import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { WindowHeaderProps } from "@/types";

export default function WindowHeader({
  icon,
  title,
  onClose,
  onMinimize,
  onMaximize,
}: WindowHeaderProps) {
  return (
    <div
      className={cn(
        "crt z-50 w-full h-6 relative bg-gradient-to-r mt-0 from-[#010f80] to-[#1084d0]"
      )}
    >
      <div className="absolute w-full flex justify-between px-1 top-[2px]">
        <div className="flex gap-1 items-center">
          <Image
            width={16}
            height={16}
            alt={`${title} Icon`}
            src={icon}
            className="w-4 h-4"
          />
          <span className="text-white text-sm">{title}</span>
        </div>

        <div className="flex gap-[3px] items-center">
          <Button
            variant="w98"
            className="bg-[#C0C0C0] w-6 h-5 p-1 pb-0 flex place-items-baseline"
            onClick={onMinimize}
          >
            <Image
              width={0}
              height={0}
              alt="minimize icon"
              src="/minimize.svg"
              className="w-3 h-auto"
            />
          </Button>

          <Button
            variant="w98"
            className="bg-[#C0C0C0] w-6 h-5 p-1 flex items-center justify-center"
            onClick={onMaximize}
          >
            <Image
              width={0}
              height={0}
              alt="maximize icon"
              src="/maximize.svg"
              className="w-3 h-auto"
            />
          </Button>

          <Button
            variant="w98"
            className="bg-[#C0C0C0] w-6 h-5 p-1 flex items-center justify-center"
            onClick={onClose}
          >
            <Image
              width={0}
              height={0}
              alt="close icon"
              src="/close.svg"
              className="w-3 h-auto"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
