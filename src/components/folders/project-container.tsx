"use client";

import { cn } from "@/lib/utils";
import { selectProject } from "@/store/projects-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Project, ProjectContainerProps } from "@/types";
import Image from "next/image";

export default function ProjectContainer({ projects }: ProjectContainerProps) {
  const dispatch = useAppDispatch();
  const { selectedProject } = useAppSelector((state) => state.projects);

  const handleSelectProject = (project: Project) => {
    dispatch(selectProject(project));
  };
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => handleSelectProject(project)}
        >
          <Image
            src={
              project.type === "FRONTEND"
                ? "/icons/frontend-icon.png"
                : "/icons/backend-icon.png"
            }
            alt={project.name}
            width={40}
            height={40}
            className={cn(selectedProject?.id === project.id && "brightness-75"
              )}
          />

          <p
            className={cn(
              "text-sm",
              selectedProject?.id === project.id && "text-white bg-[#010f80]"
            )}
          >
            {project.name}
          </p>
        </div>
      ))}
    </div>
  );
}
