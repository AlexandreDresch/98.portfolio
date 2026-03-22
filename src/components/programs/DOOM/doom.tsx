"use client";

import WindowWrapper from "@/components/shared/window-wrapper";
import FolderFooterMessage from "@/components/folder/folder-footer-message";

export default function Doom() {
  return (
    <WindowWrapper
      id={15}
      title="DOOM"
      icon="/doom.png"
      className="w-[800px] h-[600px]"
      controls={{ maximize: true, minimize: true, close: true }}
    >
      <div className="flex flex-col flex-1 min-h-0 border border-[#808080] overflow-hidden">
        <iframe
          src="https://admiring-davinci-152c0f.netlify.app"
          title="DOOM"
          className="flex-1 w-full min-h-0 outline-none border-none"
          allow="fullscreen"
        />

        <FolderFooterMessage folderName="DOOM" icon="/doom.png" />
      </div>
    </WindowWrapper>
  );
}
