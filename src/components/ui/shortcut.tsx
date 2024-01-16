"use client";

import Draggable, { DraggableCore } from "react-draggable";
import { Card } from "./card";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./dialog";
import Image from "next/image";
export default function Shortcut() {
  return (
    <Dialog modal={false} onOpenChange={() => {}}>
      <DialogTrigger className="w-max h-max flex flex-col justify-center items-center">
        <Image
          width={0}
          height={0}
          alt="folder"
          src={"/folder.png"}
          className="w-9 h-auto"
        />
        <span className="font-normal text-sm bg-[#0c7f80] text-white">
          BackEnd
        </span>
      </DialogTrigger>
      <Draggable>
        <DialogContent>
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
