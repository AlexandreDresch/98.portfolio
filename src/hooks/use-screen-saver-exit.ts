"use client";
import { useEffect, useRef } from "react";

export function useScreenSaverExit(onExit: () => void) {
  const last = useRef({ x: 0, y: 0 });
  const threshold = 20;

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const dx = Math.abs(e.clientX - last.current.x);
      const dy = Math.abs(e.clientY - last.current.y);

      if (dx > threshold || dy > threshold) {
        onExit();
      }

      last.current = { x: e.clientX, y: e.clientY };
    };

    const key = () => onExit();

    window.addEventListener("mousemove", move);
    window.addEventListener("keydown", key);
    window.addEventListener("click", key);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("keydown", key);
      window.removeEventListener("click", key);
    };
  }, [onExit]);
}
