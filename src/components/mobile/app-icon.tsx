"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Folder as DesktopItem } from "@/types";

interface AppIconProps {
  item: DesktopItem;
  bgColor?: string;
  small?: boolean;
  className?: string;
  onClick?: (item: DesktopItem) => void;
}

export default function AppIcon({
  item,
  bgColor = "#c0c0c0",
  small = false,
  className,
  onClick,
}: AppIconProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onClick?.(item)}
      className={cn(
        "border-[2px] border-black border-t-white border-l-white",
        "rounded-none flex flex-col items-center justify-center gap-1",
        "select-none outline-none",
        "hover:border-black hover:border-b-white hover:border-r-white",
        small ? "p-2" : "p-3",
        className
      )}
      style={{ backgroundColor: bgColor }}
      tabIndex={0}
      whileHover={{ filter: "brightness(1.03)" }}
      whileTap={{ x: 1, y: 1 }}
      transition={{ duration: 0.08, ease: "linear" }}
    >
      <div
        className={cn(
          "flex items-center justify-center w-full",
          small ? "h-8" : "h-12"
        )}
      >
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          width={small ? 24 : 32}
          height={small ? 24 : 32}
          draggable={false}
          className="pointer-events-none select-none"
        />
      </div>

      <span
        className={cn(
          "text-black text-center leading-tight font-bold",
          small ? "text-[10px]" : "text-xs"
        )}
      >
        {item.name}
      </span>
    </motion.button>
  );
}
