"use client";

import Image from "next/image";
import Draggable from "react-draggable";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import Folder from "../desktop/folder";
import DocumentViewer from "../desktop/document-viewer";
import { useAppDispatch } from "@/store/store";
import { clearSelectedProject } from "@/store/projects-slice";
import { closeFolder, minimizeFolder, openFolder } from "@/store/folders-slice";
import { ShortcutProps } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

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
    dispatch(openFolder(id));
  }

  function handleClose() {
    dispatch(closeFolder(id));
  }

  function handleMinimize() {
    dispatch(minimizeFolder(id));
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
        <DialogContent className="border-[1px] border-solid border-black border-t-white border-l-white bg-[#C0C0C0] p-[1px]">
          <div className="dragger w-full h-6 relative bg-gradient-to-r mt-0 from-[#010f80] to-[#1084d0]">
            <div className="absolute w-full flex justify-between px-1 top-[2px]">
              <div className="flex gap-1 items-center">
                <Image
                  width={0}
                  height={0}
                  alt="Open folder icon"
                  src={image}
                  className="w-4 h-4"
                />
                <span className="text-white text-sm">{name}</span>
              </div>

              <div className="flex gap-[3px] items-center">
                <Button
                  variant="w98"
                  className="bg-[#C0C0C0] w-6 h-5 p-1 pb-0 flex place-items-baseline"
                  onClick={handleMinimize}
                >
                  <Image
                    width={0}
                    height={0}
                    alt="minimize icon"
                    src="/minimize.svg"
                    className="w-3 h-auto"
                  />
                </Button>

                <Button
                  variant="w98"
                  className="bg-[#C0C0C0] w-6 h-5 p-1 flex items-center justify-center"
                >
                  <Image
                    width={0}
                    height={0}
                    alt="maximize icon"
                    src="/maximize.svg"
                    className="w-3 h-auto"
                  />
                </Button>

                <Button
                  variant="w98"
                  className="bg-[#C0C0C0] w-6 h-5 p-1 flex items-center justify-center"
                  onClick={handleClose}
                >
                  <Image
                    width={0}
                    height={0}
                    alt="close icon"
                    src="/close.svg"
                    className="w-3 h-auto"
                  />
                </Button>
              </div>
            </div>
          </div>
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
