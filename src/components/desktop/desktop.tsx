"use client";

import Clippy from "../clippy/clippy";
import Shortcut from "../dock/shortcut";
import { useAppSelector } from "@/store/store";
import ProjectContainer from "../folder/project-container";
import NotAvailable from "../shared/not-available";
import { Folder } from "@/types";

export default function Desktop() {
  const { frontend, backend } = useAppSelector((state) => state.projects);
  const { windows } = useAppSelector((state) => state.windows);
  const folders = windows.filter((window) => window.type === "folder");

  return (
    <div className="pt-4 flex flex-col gap-8 min-w-[100dvw] min-h-[100dvh] relative overflow-hidden">
      {folders.map((folder) => (
        <Shortcut folder={folder as Folder} key={folder.id}>
          {folder.name === "Backend" && <ProjectContainer projects={backend} />}
          {folder.name === "Frontend" && (
            <ProjectContainer projects={frontend} />
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
        </Shortcut>
      ))}

      <Clippy />
    </div>
  );
}
