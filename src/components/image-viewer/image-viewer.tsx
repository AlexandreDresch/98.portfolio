import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import FolderFooterMessage from "../folder/folder-footer-message";
import ImageSlider from "./image-slider";
import { useAppSelector } from "@/store/store";
import Draggable from "react-draggable";
import WindowHeader from "../shared/window-header";
import WindowNavigationMenu from "../shared/window-navigation-menu/window-navigation-menu";
import { folderNavigationMenuItems, FooterMessages } from "@/constants";
import { MenuItemProps, MenuSubItemProps } from "@/types";

export default function ImageViewer({ name }: { name: string }) {
  const { selectedFile } = useAppSelector((state) => state.folders);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex flex-col items-center cursor-pointer gap-1 mt-3"
        >
          <Image
            src="/icons/kodak-image.png"
            alt={name}
            width={38}
            height={38}
          />

          <span className="font-normal text-sm">{name}</span>
        </Button>
      </DialogTrigger>
      <Draggable handle=".dragger1">
        <DialogContent className="border-[1px] border-solid border-black border-t-white border-l-white bg-[#C0C0C0] p-[1px]">
          <>
            <WindowHeader
              icon="/icons/kodak-image.png"
              title="Image Viewer"
              onClose={() => {}}
              onMaximize={() => {}}
              onMinimize={() => {}}
            />
            <div className="size-full min-h-[500px] crt">
              <div className="border-[1px] border-[#808080] flex flex-col min-h-max flex-1 mt-[-15px]">
                <WindowNavigationMenu
                  menuItems={
                    folderNavigationMenuItems as unknown as
                      | MenuItemProps
                      | MenuSubItemProps
                  }
                  messages={FooterMessages}
                />
                <div className="size-full relative bg-white h-[540px]">
                  {selectedFile?.images && (
                    <ImageSlider images={selectedFile?.images} />
                  )}
                </div>

                <FolderFooterMessage
                  folderName={name}
                  icon="/icons/kodak-image.png"
                />
              </div>
            </div>
          </>
        </DialogContent>
      </Draggable>
    </Dialog>
  );
}
