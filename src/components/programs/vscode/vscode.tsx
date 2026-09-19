"use client";

import Image from "next/image";
import { Button } from "../../ui/button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import FolderFooterMessage from "../../folder/folder-footer-message";
import WindowNavigationMenu from "../../shared/window-navigation-menu/window-navigation-menu";
import WindowWrapper from "../../shared/window-wrapper";
import { vscodeNavigationMenuItems } from "@/constants";
import type { MenuItemProps, MenuSubItemProps } from "@/types";
import { openWindow } from "@/store/window-manager-slice";

interface VSCodeProps {
  renderTrigger: boolean;
  projectLink: string;
}

export default function VSCode({ renderTrigger = false, projectLink }: VSCodeProps) {
  const dispatch = useAppDispatch();

  const { selectedFile } = useAppSelector((state) => state.folders);

  const handleOpen = () => {
    dispatch(openWindow(9));
  };

  return (
    <>
      {renderTrigger && (
        <Button
          variant="ghost"
          className="flex flex-col items-center cursor-pointer gap-1 mt-3"
          onClick={handleOpen}
        >
          <Image
            src="/icons/vscode.png"
            alt="VSCode Editor Icon"
            width={38}
            height={38}
          />

          <span className="font-normal text-sm">
            {selectedFile?.name || "VS Code"}
          </span>
        </Button>
      )}

      <WindowWrapper
        id={9}
        title="Visual Studio Code"
        icon="/icons/vscode.png"
      >
        <div className="flex flex-col min-h-0 flex-1">
          <WindowNavigationMenu
            menuItems={
              vscodeNavigationMenuItems as unknown as
                | MenuItemProps
                | MenuSubItemProps
            }
          />

          <div className="flex-1 min-h-0 w-full">
            <iframe
              src={projectLink}
              title="Visual Studio Code"
              className="w-full h-full border-0"
            />
          </div>

          <FolderFooterMessage
            folderName="Visual Studio Code"
            icon="/icons/vscode.png"
          />
        </div>
      </WindowWrapper>
    </>
  );
}