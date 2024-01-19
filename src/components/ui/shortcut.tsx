"use client";
import Image from "next/image";
import Draggable from "react-draggable";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./dialog";
import { useState } from "react";

interface ShortcutProps {
  name: string;
  image: string;
}

export default function Shortcut({ name, image }: ShortcutProps) {
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
          width={0}
          height={0}
          alt={name}
          src={image}
          className="w-9 h-auto"
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
          title={name}
          isMaximized={isMaximized}
          toggleMaximized={toggleMaximize}
        >
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Draggable>
    </Dialog>
  );
}
