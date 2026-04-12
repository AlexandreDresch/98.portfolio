"use client";

import WindowWrapper from "@/components/shared/window-wrapper";
import FolderFooterMessage from "@/components/folder/folder-footer-message";
import DoomGame from "./doom-game";

export default function Doom() {
  return (
    <WindowWrapper
      id={15}
      title="98.DOOM"
      icon="/icons/98.doom.png"
      className="w-[800px] h-[600px]"
      controls={{ maximize: false, minimize: true, close: true }}
    >
      <div className="flex flex-col flex-1 min-h-0 border border-[#808080] overflow-hidden">
        <DoomGame />

        <FolderFooterMessage folderName="DOOM" icon="/icons/98.doom.png" />
      </div>
    </WindowWrapper>
  );
}
