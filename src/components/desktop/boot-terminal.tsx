"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { generateBootSequence } from "@/lib/utils";
import { useWindowsSound } from "../shared/sound-manager";

interface BootTerminalProps {
  onBootComplete: () => void;
}

export default function BootTerminal({ onBootComplete }: BootTerminalProps) {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [bootMessages, setBootMessages] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const { playSound, stopSound } = useWindowsSound();

  useEffect(() => {
    setBootMessages(generateBootSequence());
  }, []);

  useEffect(() => {
    playSound("hardDrive");

    return () => {
      stopSound("hardDrive");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (bootMessages.length === 0) return;

    if (currentIndex < bootMessages.length) {
      const message = bootMessages[currentIndex];
      const isError = message.includes("ERROR") || message.includes("WARNING");

      const delay = isError
        ? Math.random() * 500 + 800
        : Math.random() * 300 + 300;

      const timer = setTimeout(() => {
        setMessages((prev) => [...prev, bootMessages[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);

        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, delay);

      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        onBootComplete();
      }, 1500);

      return () => clearTimeout(finalTimer);
    }
  }, [currentIndex, bootMessages, onBootComplete]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <motion.div
      className="bg-black text-green-500 font-mono p-4 w-full h-screen overflow-auto crt"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      ref={terminalRef}
    >
      <div className="flex flex-col">
        <div className="mb-4">
          <pre className="text-white">
            {` 
 █████╗  █████╗ 
██╔══██╗██╔══██╗
╚██████║╚█████╔╝
 ╚═══██║██╔══██╗
 █████╔╝╚█████╔╝
 ╚════╝  ╚════╝ .portfolio
      `}
          </pre>
        </div>

        {messages.map((message, index) => {
          const isError = message.includes("ERROR");
          const isWarning = message.includes("WARNING");

          return (
            <div
              key={index}
              className={`mb-1 ${
                isError ? "text-red-500" : isWarning ? "text-yellow-500" : ""
              }`}
            >
              {message}
            </div>
          );
        })}

        {currentIndex < bootMessages.length && (
          <div className="flex">
            <span>C:\\&gt;</span>
            <span
              className={`ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`}
            >
              _
            </span>
          </div>
        )}

        {bootMessages.length > 0 &&
          currentIndex >= bootMessages.length / 2 &&
          currentIndex < bootMessages.length && (
            <div className="mt-4">
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-green-500 h-full transition-all duration-300 ease-linear"
                  style={{
                    width: `${(currentIndex / bootMessages.length) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="text-xs mt-1 text-center">
                Loading system...{" "}
                {Math.floor((currentIndex / bootMessages.length) * 100)}%
              </div>
            </div>
          )}
      </div>
    </motion.div>
  );
}
