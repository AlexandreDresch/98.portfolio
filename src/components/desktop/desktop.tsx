"use client";

import Clippy from "../shared/clippy";
import Shortcut from "../dock/shortcut";
import { useAppSelector } from "@/store/store";
import ProjectContainer from "../folders/project-container";
import NotAvailable from "../shared/not-available";

export default function Desktop() {
  const { frontend, backend } = useAppSelector(
    (state) => state.projects
  );
  const folders = useAppSelector((state) => state.folders.folders);

  return (
    <div className="pt-4 flex flex-col gap-8 min-w-[100dvw] min-h-[100dvh] relative overflow-hidden">
      {folders.map((folder) => (
        <Shortcut
          id={folder.id}
          key={folder.id}
          image={folder.image}
          name={folder.name}
          isOpen={folder.isOpen}
          isDocument={folder.isDocument}
          documentPath={folder.documentPath}
          documentType={folder.documentType}
        >
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
