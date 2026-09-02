"use client";

import Clippy from "../clippy/clippy";
import Shortcut from "../dock/shortcut";
import { useAppSelector } from "@/store/store";
import ProjectContainer from "../folder/project-container";
import NotAvailable from "../shared/not-available";
import { Folder } from "@/types";
import ProgramsContainer from "../folder/programs-container";
import { programs } from "@/constants";
import Doom from "../programs/DOOM/doom";
import DesktopContextMenu from "./desktop-context-menu";
import ControlPanel from "../programs/control-panel";
import FolderContainer from "../folder/folder-container";
import WelcomeMessage from "./welcome-message";
import { DisplayProperties } from "../programs/display-properties/display-properties";
import Terminal from "../programs/terminal/terminal";
import Winamp from "../programs/winamp/winamp";
import InternetExplorer from "../programs/IE/internet-explorer";
import dynamic from "next/dynamic";
import { useMonitor } from "@/hooks/use-monitor";
import MonitorReceiver from "@/components/shared/monitor-receiver";
import ImageViewer from "../programs/image-viewer/image-viewer";
import DocumentViewer from "../programs/document-viewer/document-viewer";
import DocumentViewerShortcut from "../programs/document-viewer/document-viewer-shortcut";

const Paint = dynamic(() => import("../programs/paint/paint"), {
  ssr: false,
  loading: () => null,
});

export default function Desktop() {
  const { frontend, backend } = useAppSelector((state) => state.projects);
  const { windows } = useAppSelector((state) => state.windows);
  const folders = windows.filter((window) => window.type === "folder");

  const { isMonitor2 } = useMonitor();

  return (
    <DesktopContextMenu>
      <>
        {!isMonitor2 && (
          <div className="pt-4 grid grid-flow-col auto-cols-[96px] grid-rows-[repeat(auto-fit,96px)] gap-x-6 gap-y-8 size-full relative overflow-hidden">
            {folders.map((folder) => (
              <Shortcut folder={folder as Folder} key={folder.id}>
                {folder.name === "Backend" && (
                  <ProjectContainer projects={backend} />
                )}
                {folder.name === "Frontend" && (
                  <ProjectContainer projects={frontend} />
                )}
                {folder.name === "Games" && (
                  <ProgramsContainer
                    programs={[programs.find((p) => p.id === 15)!]}
                  />
                )}
                {folder.name === "Recycle Bin" && (
                  <NotAvailable message="Not available yet." />
                )}
                {folder.name === "My Computer" && (
                  <NotAvailable message="Not available yet." />
                )}
                {folder.name === "Mobile" && (
                  <NotAvailable message="Not available yet." />
                )}
                {folder.name === "Contact me" && (
                  <NotAvailable message="Not available yet." />
                )}
                {folder.name === "Control Panel" && (
                  <FolderContainer>
                    <ControlPanel />
                  </FolderContainer>
                )}
              </Shortcut>
            ))}

            <DocumentViewerShortcut
              id={25}
              title="98.portfolio"
              documentPath="/AlexandreDresch/98.portfolio"
              documentType="markdown"
              folderName="98.portfolio"
              icon="/icons/help-book.png"
            />

            <DocumentViewerShortcut
              id={25}
              title="My Resume"
              documentPath="./englishCV.pdf"
              documentType="pdf"
              folderName="My Resume"
              icon="/icons/file.png"
            />

            <Clippy />

            <WelcomeMessage />
          </div>
        )}

        <Doom />

        <DisplayProperties />

        <Terminal />

        <Winamp />

        <Paint />

        <InternetExplorer />

        <MonitorReceiver />

        <ImageViewer />

        <DocumentViewer />
      </>
    </DesktopContextMenu>
  );
}
