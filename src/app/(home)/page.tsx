"use client";

import DesktopLayout from "@/components/desktop/desktop-layout";
import MobileLayout from "@/components/mobile/mobile-layout";
import { useIsDesktop } from "@/hooks/use-is-desktop";

export default function Home() {
  const isDesktop = useIsDesktop();

  if (isDesktop === null) return null;

  return isDesktop ? <DesktopLayout /> : <MobileLayout />;
}
