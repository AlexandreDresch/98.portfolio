"use client";

import { useEffect, useState } from "react";
import StartScreen from "./start-screen";
import Desktop from "./desktop";
import Dock from "../dock/dock";
import { AnimatePresence, motion } from "framer-motion";
import BootTerminal from "./boot-terminal";
import { useWindowsSound } from "../shared/sound-manager";
import { useAppSelector } from "@/store/store";

export default function DesktopLayout() {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showDesktop, setShowDesktop] = useState(false);
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  const { playSound } = useWindowsSound();

  const { wallpaper, wallpaperMode } = useAppSelector(
    (state) => state.settings.applied,
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && showStartScreen && !triggerAnimation) {
        setTriggerAnimation(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showStartScreen, triggerAnimation]);

  const handleStartScreenComplete = () => {
    setShowStartScreen(false);
    setShowTerminal(true);
  };

  const handleBootComplete = () => {
    setShowTerminal(false);
    setShowDesktop(true);

    playSound("startup");
  };

  return (
    <div className="bg-black">
      <AnimatePresence>
        {showStartScreen && (
          <motion.div
            key="start-screen"
            initial={{ scale: 1 }}
            animate={triggerAnimation ? { scale: 0 } : {}}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onAnimationComplete={handleStartScreenComplete}
          >
            <StartScreen />
          </motion.div>
        )}

        {showTerminal && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BootTerminal onBootComplete={handleBootComplete} />
          </motion.div>
        )}

        {showDesktop && (
          <motion.main
            key="desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex h-[100dvh] flex-col box-border crt rounded-none"
            style={{
              backgroundImage: wallpaper ? `url(${wallpaper})` : undefined,
              backgroundColor: "#008080",

              backgroundRepeat:
                wallpaperMode === "tile" ? "repeat" : "no-repeat",

              backgroundSize:
                wallpaperMode === "fill"
                  ? "cover"
                  : wallpaperMode === "stretch"
                    ? "100% 100%"
                    : "800px auto",

              backgroundPosition:
                wallpaperMode === "center" ? "center" : "top left",
            }}
          >
            <div className="flex-1 min-h-0 relative overflow-hidden">
              <Desktop />
            </div>
            <Dock />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
