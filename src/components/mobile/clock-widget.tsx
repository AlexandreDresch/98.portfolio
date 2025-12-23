"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClockWidget() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );

      setCurrentDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="col-span-2 row-span-2 flex items-center justify-center p-4 select-none">
      <div className="flex flex-col items-center gap-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTime}
            initial={{ y: -1, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 1, opacity: 0 }}
            transition={{ duration: 0.12, ease: "linear" }}
            className="text-5xl md:text-6xl font-bold text-white tracking-tight"
            style={{
              textShadow: `
                1px 1px 0 rgba(0,0,0,0.8),
                0 0 2px rgba(255,255,255,0.25)
              `,
            }}
          >
            {currentTime || "18:32"}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0.85 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-sm md:text-base text-white font-bold"
          style={{
            fontFamily: `"MS Sans Serif", "Tahoma", monospace`,
            textShadow: "1px 1px 0 rgba(0,0,0,0.8)",
          }}
        >
          {currentDate || "Wed, Dec 18"}
        </motion.div>
      </div>
    </div>
  );
}
