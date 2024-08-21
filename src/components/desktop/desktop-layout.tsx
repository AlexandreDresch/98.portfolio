"use client";

import React, { useEffect, useState } from "react";
import StartScreen from "./start-screen";
import Desktop from "./desktop";
import Dock from "../dock/dock";
import { motion } from "framer-motion";

export default function DesktopLayout() {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setTriggerAnimation(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="bg-black">
      {showStartScreen ? (
        <motion.div
          initial={{ scale: 1 }}
          animate={triggerAnimation ? { scale: 0 } : {}}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onAnimationComplete={() => setShowStartScreen(false)}
        >
          <StartScreen />
        </motion.div>
      ) : (
        <motion.main
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex min-h-screen flex-col bg-[url('/windows-98-cloud.jpg')] box-border crt rounded-none"
        >
          <Desktop />
          <Dock />
        </motion.main>
      )}
    </div>
  );
}
