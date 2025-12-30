"use client";

import { AnimatePresence, motion } from "framer-motion";
import WindowContentRouter from "../shared/window-content-router";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { closeWindow } from "@/store/window-manager-slice";
import Image from "next/image";

export default function MobileWindow() {
  const dispatch = useAppDispatch();

  const window = useAppSelector((state) => {
    const items = state.windows.dockItems;
    return items.length > 0 ? items[items.length - 1] : null;
  });

  if (!window) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="fixed inset-0 z-50 bg-[#c0c0c0] flex flex-col"
      >
        <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center">
          <span className="text-xs font-bold">{window.name}</span>
          <Button
            variant="w98"
            className="bg-[#C0C0C0] w-6 h-5 p-1 flex items-center justify-center"
            onClick={() => dispatch(closeWindow(window.id))}
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

        <div className="flex-1 min-h-0">
          <WindowContentRouter window={window} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
