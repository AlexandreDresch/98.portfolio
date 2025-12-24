"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import AppIcon from "./app-icon";
import Image from "next/image";

interface App {
  icon: string;
  label: string;
  iconImage?: string;
}

interface AllAppsDrawerProps {
  show: boolean;
  apps: App[];
  onClose: () => void;
  onAppClick: (app: App) => void;
}

const drawerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "tween", ease: "linear", duration: 0.18 },
  },
  exit: {
    x: "100%",
    transition: { type: "tween", ease: "linear", duration: 0.15 },
  },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025 } },
};

const iconVariants = {
  hidden: { opacity: 0, y: 2 },
  visible: { opacity: 1, y: 0 },
};

export default function AllAppsDrawer({
  show,
  apps,
  onClose,
  onAppClick,
}: AllAppsDrawerProps) {
  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="crt fixed inset-0 bg-black z-40"
          />

          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.x > 120 || velocity.x > 600) onClose();
            }}
            className="crt fixed inset-y-0 right-0 w-full max-w-md bg-[#008080] z-50 flex flex-col border-[2px] border-solid border-black border-t-white border-l-white rounded-none"
          >
            <div className="flex items-center justify-between bg-[#000080] text-white px-2 py-1 select-none">
              <span className="text-[12px] font-bold">All Applications</span>

              <Button
                variant="w98"
                className="bg-[#C0C0C0] w-6 h-5 p-1 flex items-center justify-center"
                onClick={onClose}
              >
                <Image
                  src="/close.svg"
                  alt="close icon"
                  width={0}
                  height={0}
                  className="w-3 h-auto"
                />
              </Button>
            </div>

            <motion.div
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 bg-[#c0c0c0] p-3 overflow-y-auto overscroll-contain"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {apps.map((app, index) => (
                  <motion.div key={index} variants={iconVariants}>
                    <AppIcon
                      iconImage={app.iconImage || "/icons/default-app-icon.png"}
                      label={app.label}
                      bgColor="#c0c0c0"
                      onClick={() => {
                        onAppClick(app);
                        onClose();
                      }}
                      className="w-full"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="bg-[#c0c0c0] p-2 text-[10px] text-black win98-border">
              Tip: Double-click to open programs
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
