import Image from "next/image";
import Draggable from "react-draggable";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import WindowHeader from "../shared/window-header";
import FolderFooterMessage from "../folder/folder-footer-message";
import WindowNavigationMenu from "../shared/window-navigation-menu/window-navigation-menu";
import { vscodeNavigationMenuItems } from "@/constants";
import { MenuItemProps, MenuSubItemProps } from "@/types";
import { openWindow, minimizeWindow, closeWindow } from "@/store/window-manager-slice";
import { useEffect, useState } from "react";

export default function VSCode() {
  const dispatch = useAppDispatch();
  const { selectedFile } = useAppSelector((state) => state.folders);
  const program = useAppSelector((state) =>
    state.windows.windows.find((p) => p.id === 9 && p.type === 'program')
  );

  const handleOpen = () => {
    console.log("Opening VSCode");
    if (!program?.isOpen) {
      dispatch(openWindow(9));
    }
  };

  const handleMinimize = () => {
    dispatch(minimizeWindow(9));
  };

  const handleClose = () => {
    dispatch(closeWindow(9));
  };

  return (
    <Dialog onOpenChange={(open) => {
      if (open) {
        handleOpen();
      } else {
        handleMinimize();
      }
    }}>
      <DialogTrigger asChild>
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
      </DialogTrigger>
      <Draggable handle={`.dragger`}>
        <DialogContent className="crt border-[1px] border-solid border-black border-t-white border-l-white bg-[#C0C0C0] p-[1px]">
          <>
            <WindowHeader
              icon="/icons/vscode.png"
              title="Visual Studio Code"
              onClose={handleClose}
              onMaximize={() => {}}
              onMinimize={handleMinimize}
            />
            <div className="size-full min-h-[500px]">
              <div className="border-[1px] border-[#808080] flex flex-col min-h-max flex-1 mt-[-15px]">
                <WindowNavigationMenu
                  menuItems={
                    vscodeNavigationMenuItems as unknown as
                      | MenuItemProps
                      | MenuSubItemProps
                  }
                />
                <div className="size-full h-[540px]">
                  <iframe
                    src="https://github1s.com/AlexandreDresch/98.portfolio/tree/main/src"
                    title="VsCode"
                    className="size-full"
                  ></iframe>
                </div>
                <FolderFooterMessage
                  folderName="Visual Studio Code"
                  icon="/icons/vscode.png"
                />
              </div>
            </div>
          </>
        </DialogContent>
      </Draggable>
    </Dialog>
  );
}