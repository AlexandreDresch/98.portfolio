"use client";
import { useEffect, useState } from "react";

export function useIdle(timeout: number) {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const reset = () => {
      setIsIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIsIdle(true), timeout);
    };

    const events = ["mousemove", "keydown", "click"];

    events.forEach((e) => window.addEventListener(e, reset));

    reset();

    return () => {
      events.forEach((e) => window.removeEventListener(e, reset));
      clearTimeout(timer);
    };
  }, [timeout]);

  return isIdle;
}
