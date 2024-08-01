"use client";

import Clippy from "../shared/clippy";
import Shortcut from "../dock/shortcut";
import { useAppSelector } from "@/store/store";
import ProjectContainer from "../folders/project-container";

export default function Desktop() {
  const { frontend, backend, mobile } = useAppSelector(
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
            <div className="flex h-[400px] justify-center items-center">
              <p>Not available yet.</p>
            </div>
          )}
          {folder.name === "My Computer" && (
            <div className="flex h-[400px] justify-center items-center">
              <p>Not available yet.</p>
            </div>
          )}
          {folder.name === "Mobile" && (
            <div className="flex h-[400px] justify-center items-center">
              <p>Not available yet.</p>
            </div>
          )}
          {folder.name === "Contact me" && (
            <div className="flex h-[400px] justify-center items-center">
              <p>Not available yet.</p>
            </div>
          )}
        </Shortcut>
      ))}

      <Clippy />
    </div>
  );
}
