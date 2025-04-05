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
import {
  addToDock,
  closeProgram,
  minimizeAndAddToDock,
  openProgram,
} from "@/store/programs-slice";
import { useEffect, useState } from "react";
import { removeDockFolder } from "@/store/folders-slice";

export default function VSCode() {
  const dispatch = useAppDispatch();

  const { selectedFile } = useAppSelector((state) => state.folders);
  const program = useAppSelector((state) =>
    state.programs.programs.find((p) => p.id === 9)
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [firstOpen, setFirstOpen] = useState(true);

  useEffect(() => {
    setIsDialogOpen(program?.isOpen ?? false);
  }, [program?.isOpen]);

  const handleOpen = () => {
    dispatch(openProgram(9));
    
    if (firstOpen) {
      dispatch(addToDock(9));
      setFirstOpen(false);
    }
  };

  const handleClose = () => {
    dispatch(closeProgram(9));
    dispatch(removeDockFolder(9));
  };

  const handleMinimize = () => {
    dispatch(minimizeAndAddToDock(9));
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => (open ? handleOpen() : handleMinimize())}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex flex-col items-center cursor-pointer gap-1 mt-3"
        >
          <Image
            src="/icons/vscode.png"
            alt="VSCode Editor Icon"
            width={38}
            height={38}
          />

          <span className="font-normal text-sm">{selectedFile?.name}</span>
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
