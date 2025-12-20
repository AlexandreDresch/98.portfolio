"use client";

import { AnimatePresence, motion } from "framer-motion";

export function Toast({ toast }: { toast: any }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="
            fixed bottom-4 right-4 z-[9999]
            border border-black bg-[#c0c0c0]
            shadow-[2px_2px_0_#000]
            p-2
          "
        >
          {toast.content}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
