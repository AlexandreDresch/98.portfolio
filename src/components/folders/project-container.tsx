"use client";

import { cn } from "@/lib/utils";
import { selectProject } from "@/store/projects-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Project, ProjectContainerProps } from "@/types";
import Image from "next/image";
import { useState } from "react";
import ImageSlider from "../shared/image-slider";

export default function ProjectContainer({ projects }: ProjectContainerProps) {
  const dispatch = useAppDispatch();
  const { selectedProject } = useAppSelector((state) => state.projects);
  const [openedProject, setOpenedProject] = useState(false);

  const handleSelectProject = (project: Project) => {
    dispatch(selectProject(project));
  };

  const handleOpenProject = () => {
    setOpenedProject((prevOpenedProject) => !prevOpenedProject);
  };

  const handleCloseProject = () => {
    setOpenedProject(false);
  };

  return (
    <div className="w-full h-[400px]">
      {openedProject && selectedProject ? (
        <div>
          {selectedProject.images && (
            <ImageSlider images={selectedProject.images} />
          )}
          <button onClick={handleCloseProject}>Close Project</button>
        </div>
      ) : (
        <div className={`grid grid-cols-4 grid-rows-4 gap-4 gap-y-0 p-4 ${openedProject && "hidden"}`}>
          {projects.map((project) => (
            <div
              key={project.id}
              className={`flex flex-col items-center cursor-pointer ${openedProject && "hidden"}`}
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
                  selectedProject?.id === project.id && "brightness-75"
                )}
              />

              <p
                className={cn(
                  "text-sm",
                  selectedProject?.id === project.id &&
                    "text-white bg-[#010f80]"
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
