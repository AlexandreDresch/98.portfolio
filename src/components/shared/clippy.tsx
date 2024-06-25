"use client";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Clippy() {
  return (
    <div className="absolute bottom-14 right-14">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            width={0}
            height={0}
            alt="folder"
            src={"/clippy.gif"}
            className="w-auto h-14 cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top">
          Can I help you?
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
