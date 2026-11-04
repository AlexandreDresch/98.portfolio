"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import WindowWrapper from "@/components/shared/window-wrapper";
import { cn } from "@/lib/utils";
import {
  openWindow,
  selectProgram,
  closeWindow,
} from "@/store/window-manager-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { SECTIONS } from "./constants";

import { AboutContent } from "./about-content";
import { SkillsContent } from "./skills-content";
import { FeaturesContent } from "./features-content";
import { ProjectsContent } from "./projects-content";
import { ContactContent } from "./contact-content";
import { DisclaimerContent } from "./disclaimer-content";

import { SectionId } from "./types";
import { Button } from "@/components/ui/button";

const CONTENT: Record<SectionId, React.ReactNode> = {
  about: <AboutContent />,
  skills: <SkillsContent />,
  features: <FeaturesContent />,
  projects: <ProjectsContent />,
  contact: <ContactContent />,
  disclaimer: <DisclaimerContent />,
};

export default function About({
  renderTrigger = true,
}: {
  renderTrigger?: boolean;
}) {
  const [active, setActive] = useState<SectionId>("about");
  const [showOnStart, setShowOnStart] = useState(true);
  const [typedTitle, setTypedTitle] = useState("");

  const fullTitle = "Welcome to 98.portfolio";

  const dispatch = useAppDispatch();
  const { selectedProgram } = useAppSelector((state) => state.windows);

  const handleOpenWindow = () => {
    dispatch(openWindow(28));
  };

  const handleSelect = () => {
    dispatch(selectProgram(null));
    dispatch(selectProgram(28));
  };

  const handleClose = () => {
    dispatch(selectProgram(null));
    dispatch(closeWindow(28));
  };

  const isActive = selectedProgram?.id === 28;

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setTypedTitle(fullTitle.slice(0, i + 1));
      i++;
      if (i >= fullTitle.length) clearInterval(iv);
    }, 45);
    return () => clearInterval(iv);
  }, []);

  return (
    <>
      {renderTrigger && (
        <button
          type="button"
          onClick={handleSelect}
          onDoubleClick={handleOpenWindow}
          className="flex cursor-pointer flex-col items-center gap-1 bg-transparent border-0"
        >
          <Image
            src="/windows.png"
            alt="Welcome"
            width={38}
            height={38}
            draggable={false}
          />

          <span
            className={cn(
              "font-normal text-sm text-white px-2 bg-[#0c7f80] max-w-full",
              isActive && "bg-[#010f80]",
            )}
          >
            Welcome
          </span>
        </button>
      )}

      <WindowWrapper
        id={28}
        title="Welcome"
        icon="/windows.png"
        controls={{ close: true, minimize: true, maximize: false }}
        className="!w-[600px]"
      >
        <div className="flex flex-col w-full h-full  select-none">
          <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0 bg-black">
            <div className="relative w-10 h-10 flex-shrink-0">
              <div className="absolute inset-0 grid grid-cols-2 gap-0.5">
                <div style={{ background: "#ff0000" }} />
                <div style={{ background: "#00aa00" }} />
                <div style={{ background: "#0000ff" }} />
                <div style={{ background: "#ffaa00" }} />
              </div>
            </div>
            <div>
              <h1 className="text-white font-bold text-[16px]">
                {typedTitle}
                {typedTitle.length < fullTitle.length && (
                  <span className="animate-pulse">_</span>
                )}
              </h1>
              <p className="text-slate-300 text-[10px]">
                Full-stack developer • Windows 98 enthusiast
              </p>
            </div>
          </div>

          <div className="flex flex-1 min-h-0 overflow-hidden">
            <div className="w-36 flex-shrink-0 flex py-4 flex-col border-r bg-white">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActive(section.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 text-[12px] text-left cursor-pointer mb-2",

                    active === section.id && "text-[#000080]",
                  )}
                >
                  <Image
                    src={section.icon}
                    alt={section.label}
                    width={16}
                    height={16}
                    draggable={false}
                  />

                  <span>{section.label}</span>
                </button>
              ))}
            </div>

            <div className="flex-1 min-h-0 overflow-hidden bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.12 }}
                  className="h-full overflow-y-auto p-4"
                >
                  {CONTENT[active]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div
            className="flex items-center justify-between px-3 py-1 border-t flex-shrink-0"
            style={{ borderColor: "#808080", background: "#c0c0c0" }}
          >
            <label className="flex items-center gap-1.5 text-[11px] cursor-default w-full">
              <input
                type="checkbox"
                checked={showOnStart}
                onChange={(e) => setShowOnStart(e.target.checked)}
                className="cursor-default"
              />
              Show this screen each time Windows starts
            </label>

            <Button
              type="button"
              variant="w98"
              className="max-w-20 h-6"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </div>
      </WindowWrapper>
    </>
  );
}
