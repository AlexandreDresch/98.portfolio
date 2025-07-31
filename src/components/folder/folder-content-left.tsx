import { useAppSelector } from "@/store/store";
import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import TooltipLink from "../shared/tooltip-link";
import { FolderContentLeftProps } from "@/types";

export default function FolderContentLeft({ folder }: FolderContentLeftProps) {
  const { selectedFile } = useAppSelector((state) => state.folders);
  const { selectedProgram } = useAppSelector((state) => state.windows);

  const selectedItem = selectedFile || selectedProgram || folder;

  const getImageSrc = () => {
    if (selectedFile) {
      switch (selectedFile.type) {
        case "BACKEND":
          return "/icons/backend-icon.png";
        case "FRONTEND":
          return "/icons/frontend-icon.png";
        default:
          return folder.image;
      }
    }
    return selectedProgram ? selectedProgram.image : folder.image;
  };

  const getDescription = () => {
    if (!selectedFile && !selectedProgram) {
      return "Select an item to view its description. Double click to open.";
    }
    if ("description" in selectedItem) {
      return selectedItem.description;
    }
    return "No description available.";
  };

  return (
    <div className="w-1/3 min-w-[295px] min-h-max flex flex-col justify-between">
      <div className="size-full pt-3 pl-3 pb-3">
        <Image
          width={100}
          height={100}
          quality={100}
          alt={selectedItem.name}
          src={getImageSrc()}
          className="w-14 h-auto"
        />

        <h3 className="font-semibold text-xl">{selectedItem.name}</h3>

        <Separator className="h-[2px] bg-rainbow my-3" />

        <p className="text-sm">{getDescription()}</p>
      </div>

      {selectedFile && (
        <div
          className={cn(
            "w-full relative -top-10 flex justify-around pb-3",
            selectedFile.deployment_url === null && "justify-start pl-3"
          )}
        >
          <TooltipLink
            image="/github.svg"
            link={selectedFile.github_url}
            tooltip="Source Code"
          />

          {selectedFile.deployment_url !== null && (
            <TooltipLink
              image="/internet-explorer.png"
              link={selectedFile.deployment_url}
              tooltip="Visit Demo"
            />
          )}
        </div>
      )}
    </div>
  );
}