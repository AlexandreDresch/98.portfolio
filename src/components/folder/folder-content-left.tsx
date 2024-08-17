import { useAppSelector } from "@/store/store";
import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import TooltipLink from "../shared/tooltip-link";
import { FolderContentLeftProps } from "@/types";

export default function FolderContentLeft({ folder }: FolderContentLeftProps) {
  const { selectedProject } = useAppSelector((state) => state.projects);

  return (
    <div className="w-1/3 min-h-max flex flex-col justify-between">
      <div className="size-full pt-3 pl-3 pb-3">
        <Image
          width={100}
          height={100}
          quality={100}
          alt={selectedProject ? selectedProject.name : folder.name}
          src={
            selectedProject
              ? selectedProject.type === "BACKEND"
                ? "/icons/backend-icon.png"
                : selectedProject.type === "FRONTEND"
                ? "/icons/frontend-icon.png"
                : "/icons/mobile-icon.png"
              : folder.image
          }
          className="w-14 h-auto"
        />

        <h3 className="font-semibold text-xl">
          {selectedProject ? selectedProject.name : folder.name}
        </h3>

        <Separator className="h-[2px] bg-rainbow my-3" />

        <p className="text-sm">
          {selectedProject === null
            ? "Select an item to view its description. Double click to open."
            : selectedProject.description}
        </p>
      </div>

      {selectedProject && (
        <div
          className={cn(
            "w-full flex justify-around pb-3",
            selectedProject.deployment_url === null && "justify-start pl-3"
          )}
        >
          <TooltipLink
            image="/github.svg"
            link={selectedProject.github_url}
            tooltip="Source Code"
          />

          {selectedProject.deployment_url !== null && (
            <TooltipLink
              image="/internet-explorer.png"
              link={selectedProject.deployment_url}
              tooltip="Visit Demo"
            />
          )}
        </div>
      )}
    </div>
  );
}
