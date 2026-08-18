"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Win98Button } from "@/components/shared/win-98-button";
import {
  dismissClippy,
  showRandomClippyMessage,
  showContextualClippyMessage,
} from "@/store/clippy-slice";
import { useMonitor } from "@/hooks/use-monitor";

function TypingText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    idx.current = 0;
    const iv = setInterval(() => {
      if (idx.current >= text.length) {
        clearInterval(iv);
        setDone(true);
        return;
      }
      setDisplayed(text.slice(0, idx.current + 1));
      idx.current++;
    }, 18);
    return () => clearInterval(iv);
  }, [text]);

  return (
    <span>
      {displayed}
      {!done && (
        <span className="inline-block w-[2px] h-[14px] bg-[#000080] ml-[1px] animate-pulse align-middle" />
      )}
    </span>
  );
}

export default function Clippy() {
  const dispatch = useAppDispatch();
  const { isVisible, currentMessageId, messages, isAnimating } = useAppSelector(
    (state) => state.clippy,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hasGottenAttention, setHasGottenAttention] = useState(false);
  const controls = useAnimation();
  const dragStart = useRef({ mx: 0, my: 0, bx: 0, by: 0 });

  const currentMessage =
    messages.find((m) => m.id === currentMessageId)?.text ??
    "It looks like you're browsing a portfolio. Would you like help?";

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    const schedule = () => {
      const ms = Math.floor(Math.random() * (240_000 - 90_000) + 90_000);
      const t = setTimeout(() => {
        dispatch(showRandomClippyMessage());
        schedule();
      }, ms);
      cleanup = () => clearTimeout(t);
    };

    const initial = setTimeout(() => {
      dispatch(showRandomClippyMessage());
      setIsOpen(true);
      schedule();
    }, 8000);

    return () => {
      clearTimeout(initial);
      cleanup?.();
    };
  }, [dispatch]);

  useEffect(() => {
    const h = (e: Event) => {
      if ((e as CustomEvent).detail?.type === "window")
        dispatch(showContextualClippyMessage("tips"));
    };
    window.addEventListener("app-action", h);
    return () => window.removeEventListener("app-action", h);
  }, [dispatch]);

  useEffect(() => {
    if (isAnimating) {
      controls.start({
        x: [0, -6, 6, -6, 6, -4, 4, -2, 2, 0],
        transition: { duration: 0.7, ease: "easeInOut" },
      });
      setHasGottenAttention(true);
    }
  }, [isAnimating, controls]);

  const didDragRef = useRef(false);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      e.preventDefault();
      didDragRef.current = false;
      setIsDragging(true);
      dragStart.current = {
        mx: e.clientX,
        my: e.clientY,
        bx: pos.x,
        by: pos.y,
      };
    },
    [pos],
  );

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStart.current.mx;
      const dy = e.clientY - dragStart.current.my;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didDragRef.current = true;
      setPos({
        x: dragStart.current.bx + dx,
        y: dragStart.current.by + dy,
      });
    };
    const onUp = () => setIsDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDragging]);

  const handleOpen = () => {
    if (!isOpen) dispatch(showRandomClippyMessage());
    setIsOpen((v) => !v);
  };

  const handleDismiss = (duration: number | null) => {
    dispatch(dismissClippy(duration));
    setIsOpen(false);
  };

  const handleAnotherTip = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(showRandomClippyMessage());
  };

  const { isMonitor2 } = useMonitor();
  if (!isVisible || isMonitor2) return null;

  return (
    <div
      className="fixed z-[9999]"
      style={{
        bottom: 56 - pos.y,
        right: 112 - pos.x,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={onMouseDown}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="absolute bottom-[calc(100%+10px)] right-0 w-72 crt"
            style={{ cursor: "default" }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div
              className="bg-[#c0c0c0] text-black"
              style={{
                border: "2px solid",
                borderColor: "white #808080 #808080 white",
                boxShadow: "2px 2px 0 #000",
              }}
            >
              <div
                className="flex items-center justify-between px-2 py-px select-none"
                style={{
                  background: "linear-gradient(to right,#000080,#1084d0)",
                  height: 20,
                }}
              >
                <div className="flex items-center gap-1.5">
                  <Image
                    src="/clippy.gif"
                    alt=""
                    width={12}
                    height={12}
                    draggable={false}
                  />
                  <span className="text-white text-[11px] font-bold">
                    Clippy Assistant
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="w-4 h-3.5 text-black text-[9px] font-bold flex items-center justify-center bg-[#c0c0c0] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] hover:bg-[#d0d0d0]"
                >
                  ✕
                </button>
              </div>

              <div className="p-3">
                <div className="flex items-start gap-2 mb-3">
                  <motion.div
                    animate={{ rotate: [0, -5, 5, -3, 3, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 4,
                    }}
                    className="flex-shrink-0"
                  >
                    <Image
                      src="/clippy-thinking.gif"
                      alt="Clippy"
                      width={44}
                      height={44}
                      className="w-11 h-11 pointer-events-none"
                      draggable={false}
                    />
                  </motion.div>

                  <div
                    className="flex-1 bg-[#FFFFCC] p-2 text-[12px] leading-snug relative"
                    style={{
                      border: "1px solid #000",
                      boxShadow: "1px 1px 0 #888",
                    }}
                  >
                    <div
                      className="absolute top-3 -left-2"
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: "5px solid transparent",
                        borderBottom: "5px solid transparent",
                        borderRight: "8px solid #000",
                      }}
                    />
                    <div
                      className="absolute top-3.5 -left-1.5"
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: "4px solid transparent",
                        borderBottom: "4px solid transparent",
                        borderRight: "7px solid #FFFFCC",
                      }}
                    />
                    <TypingText text={currentMessage} />
                  </div>
                </div>

                <div className="border-t border-[#808080] border-b border-b-white my-2" />

                <div className="flex items-center justify-between gap-2">
                  <Win98Button onClick={handleAnotherTip}>
                    Another tip
                  </Win98Button>
                  <Win98Button onClick={() => handleDismiss(null)}>
                    Hide Clippy
                  </Win98Button>
                </div>

                <div className="border-t border-[#808080] border-b border-b-white my-2" />

                <div className="flex justify-end">
                  <Win98Button onClick={() => handleDismiss(3_600_000)}>
                    Dismiss for 1 hour
                  </Win98Button>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-2 right-8 flex flex-col items-center">
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderTop: "8px solid #808080",
                }}
              />
              <div
                className="-mt-[9px]"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "7px solid transparent",
                  borderRight: "7px solid transparent",
                  borderTop: "7px solid #c0c0c0",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={controls}
        className="relative"
        onClick={() => {
          if (!didDragRef.current) handleOpen();
        }}
        style={{ cursor: isDragging ? "grabbing" : "pointer" }}
        whileHover={isDragging ? {} : { scale: 1.08 }}
        whileTap={isDragging ? {} : { scale: 0.94 }}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/clippy.gif"
            alt="Clippy"
            width={80}
            height={80}
            className="w-auto h-16 drop-shadow-md pointer-events-none"
            draggable={false}
            priority
          />
        </motion.div>

        <AnimatePresence>
          {!isOpen && hasGottenAttention && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.3, 1] }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
            >
              <span className="text-white text-[9px] font-black leading-none">
                !
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {isDragging && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] bg-[#FFFFCC] border border-black px-1 pointer-events-none">
          Moving Clippy...
        </div>
      )}
    </div>
  );
}
