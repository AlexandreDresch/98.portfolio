"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { generateBootSequence } from "@/lib/utils";

interface BootAnimationProps {
  onComplete: () => void;
}

const NORMAL_FOOTER_MESSAGES = [
  "Not licensed by Microsoft. Please don’t tell them.",
  "Initializing bugs... done.",
  "Press F8 to panic.",
  "Insert floppy disk to continue.",
  "Summoning Clippy... please wait.",
  "It worked on my machine.",
  "Optimized for 56k modems.",
];

const RARE_FOOTER_MESSAGES = [
  "You were not supposed to see this.",
  "System sentience: TRUE",
  "Hello, developer.",
  "They are watching.",
];

export default function BootAnimation({ onComplete }: BootAnimationProps) {
  const [bootMessages, setBootMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const [hasError, setHasError] = useState(false);
  const [hasWarning, setHasWarning] = useState(false);

  const [footerMessage, setFooterMessage] = useState("");
  const [isRare, setIsRare] = useState(false);

  useEffect(() => {
    setBootMessages(generateBootSequence());
  }, []);

  useEffect(() => {
    if (bootMessages.length === 0) return;

    if (currentIndex < bootMessages.length) {
      const message = bootMessages[currentIndex];

      if (message.includes("ERROR")) setHasError(true);
      if (message.includes("WARNING")) setHasWarning(true);

      const delay =
        message.includes("ERROR") || message.includes("WARNING")
          ? Math.random() * 500 + 800
          : Math.random() * 300 + 300;

      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setProgress(((currentIndex + 1) / bootMessages.length) * 100);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      const doneTimer = setTimeout(onComplete, 1500);
      return () => clearTimeout(doneTimer);
    }
  }, [currentIndex, bootMessages, onComplete]);

  useEffect(() => {
    const roll = Math.random();

    if (roll < 0.01) {
      setIsRare(true);
      setFooterMessage(
        RARE_FOOTER_MESSAGES[
          Math.floor(Math.random() * RARE_FOOTER_MESSAGES.length)
        ]
      );
    } else {
      setFooterMessage(
        NORMAL_FOOTER_MESSAGES[
          Math.floor(Math.random() * NORMAL_FOOTER_MESSAGES.length)
        ]
      );
    }
  }, []);

  const footerColor = hasError
    ? "text-red-500"
    : hasWarning
    ? "text-yellow-400"
    : "text-gray-500";

  const glitchVariant = {
    animate: {
      x: [0, -1, 1, -2, 2, 0],
      opacity: [1, 0.7, 1, 0.5, 1],
      transition: {
        duration: 0.2,
        repeat: Infinity,
        repeatDelay: 2,
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black crt font-mono z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="mb-10 flex justify-center w-full"
        animate={{ rotateY: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <pre className="text-white text-center">
          {` 
 █████╗  █████╗ 
██╔══██╗██╔══██╗
╚██████║╚█████╔╝
 ╚═══██║██╔══██╗
 █████╔╝╚█████╔╝
 ╚════╝  ╚════╝ 
`}
        </pre>
      </motion.div>

      <div className="w-3/4 max-w-xl text-green-500 text-sm mb-6">
        {bootMessages.slice(0, currentIndex).map((msg, i) => (
          <div
            key={i}
            className={
              msg.includes("ERROR")
                ? "text-red-500"
                : msg.includes("WARNING")
                ? "text-yellow-400"
                : ""
            }
          >
            {msg}
          </div>
        ))}
      </div>

      <div className="w-64 mb-6">
        <div className="bg-gray-700 h-4 border border-gray-600 overflow-hidden">
          <motion.div
            className="h-full bg-green-500"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <p className="text-gray-400 text-xs text-center mt-1">
          Loading system… {Math.floor(progress)}%
        </p>
      </div>

      <motion.p
        className={`text-xs absolute bottom-8 ${footerColor}`}
        variants={isRare || hasError ? glitchVariant : undefined}
        animate={isRare || hasError ? "animate" : undefined}
      >
        {footerMessage}
      </motion.p>
    </motion.div>
  );
}
