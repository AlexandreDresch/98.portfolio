"use client";
import { motion, AnimatePresence } from "framer-motion";

export function ScreenSaverWrapper({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="crt fixed inset-0 z-[9999] bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
