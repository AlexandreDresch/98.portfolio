"use client";

import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { Button } from "./button";
import Image from "next/image";
import { Separator } from "./separator";
import Clock from "./clock";
import VolumeSlider from "./volume-slider";
import { useState } from "react";

export default function Dock() {
  const [open, setOpen] = useState(false);
  return (
    <Card className="w-full h-8 flex items-center bg-[#C0C0C0] fixed bottom-0 left-0 rounded-none border-white border-0 border-t-2 z-50 ">
      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="w98"
            className="flex items-center w-16 h-6"
          >
            <Image
              width={0}
              height={0}
              alt="Windows logo"
              src={"/windows.png"}
              className="w-9"
            />
            <span className="font-semibold">Start</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="w-[300px] h-96 bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-2 border-solid border-black border-t-white border-l-white border-b-transparent rounded-none"
        ></SheetContent>
      </Sheet>

      <Separator
        orientation="vertical"
        className="mx-[1px] bg-[#808080] w-[2px] border-white border-r-[1px] h-6"
      />

      <div className="w-full"></div>

      <Separator
        orientation="vertical"
        className="mx-[1px] bg-[#808080] w-[2px] border-white border-r-[1px] h-6"
      />

      <div className="bg-[#C0C0C0] border border-solid border-[#808080] w-28 h-6 flex gap-1 items-center p-1">
        <Button
          asChild
          size="icon"
          variant="ghost"
          className="flex items-center w-auto h-auto"
        >
          <Image
            width={0}
            height={0}
            alt="Windows logo"
            src={"/calendar-3.png"}
            className="w-4"
          />
        </Button>

        <Sheet open={open} onOpenChange={setOpen} modal>
          <SheetTrigger>
            <Button
              asChild
              size="icon"
              variant="ghost"
              className="flex items-center w-auto h-auto"
            >
              <Image
                width={0}
                height={0}
                alt="Windows logo"
                src={"/loudspeaker_rays.png"}
                className="w-4"
              />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[130px] h-56 bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-2 border-solid border-black border-t-white border-l-white border-b-transparent rounded-none"
          >
            <VolumeSlider />
          </SheetContent>
        </Sheet>

        <Clock className="font-light text-xs" showSeconds={false} />
      </div>
    </Card>
  );
}
