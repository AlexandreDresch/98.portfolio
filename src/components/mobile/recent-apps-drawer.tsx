"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface App {
  icon: string;
  label: string;
  iconImage?: string;
}

interface RecentAppsDrawerProps {
  show: boolean;
  recentApps: App[];
  onClose: () => void;
  onRemoveApp: (index: number) => void;
}

const drawerVariants = {
  hidden: { y: "100%" },
  visible: { y: 0, transition: { type: "tween", ease: "linear", duration: 0.18 } },
  exit: { y: "100%", transition: { type: "tween", ease: "linear", duration: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 2 },
  visible: { opacity: 1, y: 0 },
};

export default function RecentAppsDrawer({
  show,
  recentApps,
  onClose,
  onRemoveApp,
}: RecentAppsDrawerProps) {
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
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.15}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.y > 120 || velocity.y > 600) onClose();
            }}
            className="crt fixed inset-x-0 bottom-0 h-[70vh] bg-[#008080] z-50 flex flex-col border-[2px] border-black border-t-white border-l-white rounded-none"
          >
            <div className="flex items-center justify-between bg-[#000080] text-white px-2 py-1 select-none">
              <span className="text-[12px] font-bold">Recent Applications</span>

              <Button variant="w98" className="bg-[#C0C0C0] w-6 h-5 p-1 flex items-center justify-center" onClick={onClose}>
                <Image src="/close.svg" alt="close icon" width={0} height={0} className="w-3 h-auto" />
              </Button>
            </div>

            <div className="flex-1 bg-[#c0c0c0] p-3 overflow-y-auto overscroll-contain">
              {recentApps.length === 0 ? (
                <div className="text-center text-black text-[11px] py-12 select-none">
                  <p className="font-bold mb-1">No recent apps</p>
                  <p>Programs you open will appear here</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {recentApps.map((app, index) => (
                    <motion.div key={index} variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.03 }} className="win98-border bg-[#c0c0c0] p-2 flex items-center gap-3 active:win98-border-inset">
                      <div className="w-10 h-10 flex items-center justify-center border border-t-[#404040] border-l-[#404040] border-r-white border-b-white bg-[#808080]">
                        {app.iconImage ? (
                          <Image src={app.iconImage} alt={app.label} width={32} height={32} className="image-rendering-pixelated" />
                        ) : (
                          <span className="text-xl">{app.icon}</span>
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="text-[11px] font-bold text-black">{app.label}</p>
                      </div>

                      <button onClick={() => onRemoveApp(index)} className="win98-border bg-[#c0c0c0] w-6 h-6 flex items-center justify-center active:win98-border-inset">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M3 3L9 9M3 9L9 3" stroke="black" strokeWidth="2" strokeLinecap="square" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-[#c0c0c0] p-2 text-[10px] text-black win98-border select-none">
              Tip: Recently opened programs
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
