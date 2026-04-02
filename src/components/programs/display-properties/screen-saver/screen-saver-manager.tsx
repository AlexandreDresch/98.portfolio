"use client";

import { useAppSelector } from "@/store/store";
import { useIdle } from "@/hooks/use-iddle";
import { useScreenSaverExit } from "@/hooks/use-screen-saver-exit";
import { useState, useEffect } from "react";

import { ScreenSaverWrapper } from "./screen-saver-wrapper";
import { ScreenSaverRenderer } from "./screen-saver-renderer";

export function ScreensaverManager() {
  const { applied } = useAppSelector((s) => s.settings);

  const waitMs = applied.screenSaver.waitMinutes * 60 * 1000;

  const isIdle = useIdle(waitMs);

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;

    const timeout = setTimeout(() => {
    }, 1000);

    return () => clearTimeout(timeout);
  }, [active]);

  useEffect(() => {
    if (isIdle && applied.screenSaver.type !== 0) {
      setActive(true);
    }
  }, [isIdle, applied.screenSaver.type]);

  useScreenSaverExit(() => {
    if (active) setActive(false);
  });

  return (
    <ScreenSaverWrapper active={active}>
      <ScreenSaverRenderer type={applied.screenSaver.type} />
    </ScreenSaverWrapper>
  );
}
