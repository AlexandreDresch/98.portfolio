import Image from "next/image";
import FolderInternalNavigation from "./folder-internal-navigation";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  FolderContentHeaderProps,
  MenuItemProps,
  MenuSubItemProps,
} from "@/types";
import WindowNavigationMenu from "../shared/window-navigation-menu/window-navigation-menu";
import { folderNavigationMenuItems, FooterMessages } from "@/constants";

export default function FolderContentHeader({
  folder,
}: FolderContentHeaderProps) {
  return (
    <>
      <WindowNavigationMenu
        menuItems={
          folderNavigationMenuItems as unknown as
            | MenuItemProps
            | MenuSubItemProps
        }
        messages={FooterMessages}
      />

      <div className="h-14 flex items-center px-[2px] border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] gap-1">
        <Separator
          orientation="vertical"
          className="bg-[#C0C0C0] h-11 w-1 border-l-[1px] border-l-white border-r-[1px] border-r-[#808080]"
        />

        <FolderInternalNavigation />
      </div>

      <div className="h-8 flex items-center px-[2px] border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] gap-1">
        <Separator
          orientation="vertical"
          className="bg-[#C0C0C0] h-6 w-1 border-l-[1px] border-l-white border-r-[1px] border-r-[#808080]"
        />

        <span className="text-sm">Address</span>

        <div className="relative w-full">
          <div className="absolute top-2/4 left-2 h-5 w-5 -translate-y-2/4 place-items-center">
            <Image
              width={10}
              height={10}
              quality={100}
              alt={folder.name}
              src={folder.image}
              className="w-6 h-auto mt-[2px] object-contain"
            />
          </div>
          <input
            className="w-full bg-white px-8 text-sm placeholder:text-black border-[2px] border-black border-b-white border-r-white outline-none"
            value={`${folder.name.replace(/ /g, "_")}/`}
            readOnly
            name="Folder Path"
          />

          <div className="absolute top-2/4 right-[1px] h-5 w-5 -translate-y-2/4 mt-[2px]">
            <Button
              disabled
              variant="ghost"
              className="w-full flex flex-col bg-[#C0C0C0] px-1 py-0 h-5 rounded-none border-[1px] border-black border-t-white border-l-white place-items-center"
            >
              <Image
                width={0}
                height={0}
                alt="Icon down"
                src="/icon-down.svg"
                className="w-3 h-auto"
              />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
