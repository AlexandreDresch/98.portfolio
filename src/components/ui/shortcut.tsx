"use client";
import Image from "next/image";
import Draggable from "react-draggable";
import { Dialog, DialogTrigger, DialogContent } from "./dialog";
import { useState } from "react";
import Folder from "./folder";
import PdfViewer from "./pdf-viewer";

interface ShortcutPropsDocument {
  name: string;
  image: string;
  isDocument: boolean;
  documentPath: string;
}

interface ShortcutPropsNonDocument {
  name: string;
  image: string;
  isDocument: false;
  documentPath?: string;
}

type ShortcutProps = ShortcutPropsDocument | ShortcutPropsNonDocument;

export default function Shortcut({
  name,
  image,
  isDocument,
  documentPath,
}: ShortcutProps) {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  function handleSelection() {
    setIsSelected((prevIsSelected) => !prevIsSelected);
  }

  function toggleMaximize() {
    setIsMaximized((prevIsMaximized) => !prevIsMaximized);
  }

  return (
    <Dialog onOpenChange={handleSelection}>
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
          className={`font-normal text-sm  ${
            isSelected ? "bg-[#010f80]" : "bg-[#0c7f80]"
          } text-white px-2`}
        >
          {name}
        </span>
      </DialogTrigger>
      <Draggable>
        <DialogContent
          className="border-[1px] border-solid border-black border-t-white border-l-white bg-[#C0C0C0] p-[1px]"
          folderName={name}
          icon={image}
          isMaximized={isMaximized}
          toggleMaximized={toggleMaximize}
        >
          <Folder
            folderName={name}
            icon={image}
            isDocument={isDocument}
            isMaximized={isMaximized}
          >
            {
              isDocument && (
                <PdfViewer documentPath={documentPath as string} />
              ) 
            }
          </Folder>
        </DialogContent>
      </Draggable>
    </Dialog>
  );
}
