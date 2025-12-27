"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import StatusBar from "./status-bar";
import ClockWidget from "./clock-widget";
import AppIcon from "./app-icon";
import TipsBox from "./tips-box";
import Taskbar from "./task-bar";
import RecentAppsDrawer from "./recent-apps-drawer";
import AllAppsDrawer from "./all-apps-drawer";
import BootAnimation from "./boot-animation";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Folder } from "@/types";
import { folders } from "@/constants";
import { useAppDispatch } from "@/store/store";
import { openWindow } from "@/store/window-manager-slice";

export default function MobileLayout() {
  const [showBoot, setShowBoot] = useState(true);
  const [showAllApps, setShowAllApps] = useState(false);
  const [showRecentApps, setShowRecentApps] = useState(false);
  const [recentApps, setRecentApps] = useState<
    Array<{ label: string; iconImage?: string }>
  >([]);

  const dispatch = useAppDispatch();

  const isDrawerOpen = showAllApps || showRecentApps;

  const byName = (name: string) => folders.find((f) => f.name === name)!;

  const mainFolders = ["Recycle Bin", "My Computer", "Backend", "Frontend"];

  const utilities = ["Mobile", "Contact me"];

  const documents = ["My Resume", "98.portfolio"];

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  const handleFolderClick = (folder: Folder) => {
    setRecentApps((prev) => {
      const filtered = prev.filter((a) => a.label !== folder.name);
      return [
        { label: folder.name, iconImage: folder.image },
        ...filtered,
      ].slice(0, 6);
    });

    dispatch(openWindow(folder.id));
  };

  const handleHomeClick = () => {
    setShowAllApps(false);
    setShowRecentApps(false);
    window.scrollTo({ top: 0 });
  };

  const handleRecentAppsClick = () => {
    setShowRecentApps(true);
    setShowAllApps(false);
  };

  const handleBackClick = () => {
    if (showRecentApps) setShowRecentApps(false);
    else if (showAllApps) setShowAllApps(false);
  };

  if (showBoot) {
    return (
      <AnimatePresence>
        <BootAnimation onComplete={() => setShowBoot(false)} />
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/windows-98-cloud.jpg')] crt flex flex-col relative overflow-hidden">
      <div className="flex-1 overflow-y-auto pb-20 px-2 py-4">
        <StatusBar />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          <ClockWidget />

          <div className="grid grid-cols-2 gap-2 col-span-2 md:col-span-3">
            {mainFolders.map((name) => {
              const folder = byName(name);
              return (
                <AppIcon
                  key={folder.id}
                  item={folder}
                  onClick={handleFolderClick}
                />
              );
            })}
            {utilities.map((name) => {
              const folder = byName(name);
              return (
                <AppIcon
                  key={folder.id}
                  item={folder}
                  onClick={handleFolderClick}
                />
              );
            })}
            <AppIcon item={byName("Games")} onClick={handleFolderClick} />

            <div className="grid grid-cols-2 gap-2">
              {documents.map((name) => {
                const doc = byName(name);
                return (
                  <AppIcon
                    key={doc.id}
                    item={doc}
                    small
                    onClick={handleFolderClick}
                  />
                );
              })}
            </div>
          </div>

          <div className="col-span-2 md:col-span-full">
            <TipsBox />
          </div>
        </div>

        <div className="flex justify-end px-2 mb-6">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-white font-bold text-sm hover:bg-white/10"
            onClick={() => setShowAllApps(true)}
            style={{
              textShadow: `
                1px 1px 0 rgba(0,0,0,0.8),
                0 0 2px rgba(255,255,255,0.25)
              `,
            }}
          >
            <span>All Apps</span>
            <Image src="/arrow-right.svg" alt="arrow" width={12} height={12} />
          </Button>
        </div>
      </div>

      <Taskbar
        onRecentApps={handleRecentAppsClick}
        onHome={handleHomeClick}
        onBack={handleBackClick}
      />

      <RecentAppsDrawer
        show={showRecentApps}
        recentApps={recentApps}
        onClose={() => setShowRecentApps(false)}
        onRemoveApp={(index) =>
          setRecentApps((prev) => prev.filter((_, i) => i !== index))
        }
      />

      <AllAppsDrawer
        show={showAllApps}
        folders={folders}
        onClose={() => setShowAllApps(false)}
        onFolderClick={handleFolderClick}
      />
    </div>
  );
}
