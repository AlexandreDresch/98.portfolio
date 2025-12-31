"use client";

import { cn } from "@/lib/utils";
import { openFile, selectFile } from "@/store/folders-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import type { Project, ProjectContainerProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import ImageViewer from "../image-viewer/image-viewer";
import VSCode from "../vscode/vscode";

export default function ProjectContainer({ projects }: ProjectContainerProps) {
  const dispatch = useAppDispatch();
  const { selectedFile, isFileOpen } = useAppSelector((state) => state.folders);

  const handleSelectProject = (project: Project) => {
    dispatch(selectFile(project));
  };

  const handleOpenProject = () => {
    dispatch(openFile());
  };

  console.log(projects);

  return (
    <div className="size-full min-w-0 flex">
      {isFileOpen && selectedFile ? (
        <div className="grid w-full h-fit grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 p-4">
          <div className="flex flex-col items-center cursor-pointer gap-1">
            <Image
              src="/icons/notepad.png"
              alt="Project Image"
              width={38}
              height={38}
            />

            <span className={cn("font-normal text-sm")}>README.md</span>
          </div>

          {selectedFile.deployment_url && (
            <Link
              href={selectedFile.deployment_url}
              target="_blank"
              className="flex flex-col items-center cursor-pointer gap-1"
            >
              <Image
                src="/icons/internet-file.png"
                alt="Project Image"
                width={38}
                height={38}
              />

              <span className={cn("font-normal text-sm")}>
                {selectedFile.name}
              </span>
            </Link>
          )}

          {selectedFile.github_url && (
            <Link
              href={selectedFile.github_url}
              target="_blank"
              className="flex flex-col items-center cursor-pointer gap-1"
            >
              <Image
                src="/icons/github-file.png"
                alt="Project Image"
                width={38}
                height={38}
              />

              <span className={cn("font-normal text-sm")}>
                {selectedFile.name}
              </span>
            </Link>
          )}

          <VSCode renderTrigger={true} />

          {selectedFile.images &&
            selectedFile.images.map((image, index) => (
              <ImageViewer key={image} name={`Image ${index + 1}`} />
            ))}
        </div>
      ) : (
        <div className="grid w-full h-fit grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 p-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleSelectProject(project)}
              onDoubleClick={handleOpenProject}
            >
              <Image
                src={
                  project.type === "FRONTEND"
                    ? "/icons/frontend-icon.png"
                    : project.type === "BACKEND"
                    ? "/icons/backend-icon.png"
                    : "/icons/mobile-icon.png"
                }
                alt={project.name}
                width={40}
                height={40}
                className={cn(
                  selectedFile?.id === project.id && "brightness-75"
                )}
              />

              <p
                className={cn(
                  "text-sm",
                  selectedFile?.id === project.id && "text-white bg-[#010f80]"
                )}
              >
                {project.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
