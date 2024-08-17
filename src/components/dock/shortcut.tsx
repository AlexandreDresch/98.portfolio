"use client";

import Image from "next/image";
import Draggable from "react-draggable";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { useAppDispatch } from "@/store/store";
import { clearSelectedProject } from "@/store/projects-slice";
import { openFolder } from "@/store/folders-slice";
import { ShortcutProps } from "@/types";
import { cn } from "@/lib/utils";
import FolderLayout from "../folder/folder-layout";

export default function Shortcut({ folder, children }: ShortcutProps) {
  const dispatch = useAppDispatch();

  function handleSelection() {
    dispatch(clearSelectedProject());
    dispatch(openFolder(folder.id));
  }

  return (
    <Dialog onOpenChange={handleSelection} open={folder.isOpen}>
      <DialogTrigger className="w-28 h-max flex flex-col justify-center items-center">
        <Image
          width={100}
          height={100}
          alt={folder.name}
          src={folder.image}
          quality={100}
          className="w-10 h-auto object-fill"
        />
        <span
          className={cn(
            "font-normal text-sm text-white px-2 bg-[#0c7f80]",
            folder.isOpen && "bg-[#010f80]"
          )}
        >
          {folder.name}
        </span>
      </DialogTrigger>
      <Draggable handle=".dragger">
        <DialogContent className="border-[1px] border-solid border-black border-t-white border-l-white bg-[#C0C0C0] p-[1px]">
          <FolderLayout folder={folder}>{children}</FolderLayout>
        </DialogContent>
      </Draggable>
    </Dialog>
  );
}
