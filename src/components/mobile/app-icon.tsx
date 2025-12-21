"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AppIconProps {
  label: string;
  bgColor?: string;
  iconImage: string;
  small?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function AppIcon({
  label,
  bgColor = "#c0c0c0",
  iconImage,
  small = false,
  className,
  onClick,
}: AppIconProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn(
        "border-[2px] border-solid border-black border-t-white border-l-white rounded-none px-[2px] gap-1 hover:border-black hover:border-b-white hover:border-r-white",
        "flex flex-col items-center justify-center gap-1",
        "select-none outline-none",
        small ? "p-2" : "p-3",
        className
      )}
      style={{ backgroundColor: bgColor }}
      tabIndex={0}
      whileHover={{
        filter: "brightness(1.03)",
      }}
      whileTap={{
        x: 1,
        y: 1,
      }}
      transition={{
        duration: 0.08,
        ease: "linear",
      }}
    >
      <div
        className={cn(
          "flex items-center justify-center w-full",
          small ? "h-8" : "h-12"
        )}
      >
        <Image
          src={iconImage || "/placeholder.svg"}
          alt={label}
          width={small ? 24 : 32}
          height={small ? 24 : 32}
          draggable={false}
          className="pointer-events-none select-none"
        />
      </div>

      {label && (
        <span
          className={cn(
            "text-black text-center leading-tight",
            small ? "text-[10px]" : "text-xs",
            "font-bold"
          )}
        >
          {label}
        </span>
      )}
    </motion.button>
  );
}
