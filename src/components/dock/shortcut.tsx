"use client";

import Image from "next/image";
import Draggable from "react-draggable";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import Folder from "../desktop/folder";
import DocumentViewer from "../desktop/document-viewer";
import { useAppDispatch } from "@/store/store";
import { clearSelectedProject } from "@/store/projects-slice";
import { toggleFolder } from "@/store/folders-slice";
import { ShortcutProps } from "@/types";
import { cn } from "@/lib/utils";

export default function Shortcut({
  id,
  name,
  image,
  isOpen,
  isDocument,
  documentPath,
  documentType,
  children,
}: ShortcutProps) {
  const dispatch = useAppDispatch();

  function handleSelection() {
    dispatch(clearSelectedProject());
    dispatch(toggleFolder(id));
  }

  return (
    <Dialog onOpenChange={handleSelection} open={isOpen}>
      <DialogTrigger className="w-28 h-max flex flex-col justify-center items-center">
        <Image
          width={100}
          height={100}
          alt={name}
          src={image}
          quality={100}
          className="w-10 h-auto object-fill"
        />
        <span
          className={cn(
            "font-normal text-sm text-white px-2 bg-[#0c7f80]",
            isOpen && "bg-[#010f80]"
          )}
        >
          {name}
        </span>
      </DialogTrigger>
      <Draggable handle=".dragger">
        <DialogContent
          className="border-[1px] border-solid border-black border-t-white border-l-white bg-[#C0C0C0] p-[1px]"
          folderName={name}
          icon={image}
        >
          {isDocument && documentPath && documentType ? (
            <DocumentViewer
              folderName={name}
              icon={image}
              documentType={documentType}
              documentPath={documentPath}
            />
          ) : (
            <Folder folderName={name} icon={image}>
              {children}
            </Folder>
          )}
        </DialogContent>
      </Draggable>
    </Dialog>
  );
}
