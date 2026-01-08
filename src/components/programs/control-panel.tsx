"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const controlPanelItems = [
  { id: "display", name: "Display", icon: "/icons/display.png" },
  { id: "keyboard", name: "Keyboard", icon: "/icons/keyboard.png" },
  { id: "mouse", name: "Mouse", icon: "/icons/mouse.png" },
  { id: "system", name: "System", icon: "/icons/system.png" },
];

type Props = {
  openFolder: (folderId: string) => void;
};

export default function ControlPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] min-h-[400px] gap-4 p-3 text-[11px] select-none"
    >
      {controlPanelItems.map((item) => (
        <motion.div
          key={item.id}
          whileTap={{ scale: 0.96 }}
          className="flex flex-col items-center cursor-pointer"
        >
          <Image src={item.icon} className="w-8 h-8 mb-1 pixelated" alt="" width={32} height={32} />
          <span className="text-center">{item.name}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
