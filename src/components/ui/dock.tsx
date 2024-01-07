"use client";

import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { Button } from "./button";
import Image from "next/image";

export default function Dock() {
  return (
    <Card className="w-full h-7 flex bg-[#C0C0C0] fixed bottom-0 left-0 rounded-none border-white border-0 border-t-2 z-50 ">
      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="w98"
            className="flex items-center w-full h-auto"
          >
            <Image
              width={0}
              height={0}
              alt="Windows logo"
              src={"/windows.png"}
              className="w-full"
            />
            <span className="font-semibold">Start</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="bottom"
          className="w-[300px] h-96 bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-2 border-solid border-black border-t-white border-l-white border-b-transparent rounded-none"
        ></SheetContent>
      </Sheet>

      <div></div>

      <div>
        <span></span>
      </div>
    </Card>
  );
}
