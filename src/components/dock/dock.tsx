"use client";

import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { Separator } from "../ui/separator";
import Clock from "./clock";
import VolumeSlider from "./volume-slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Dock() {
  return (
    <Card className="w-full h-8 flex items-center bg-[#C0C0C0] fixed bottom-0 left-0 rounded-none border-white border-0 border-t-[1px] z-50 ">
      <DropdownMenu>
        <Button
          asChild
          size="icon"
          variant="w98"
          className="flex items-center w-[70px] h-6"
        >
          <DropdownMenuTrigger>
            <Image
              width={0}
              height={0}
              alt="Windows logo"
              src={"/windows.png"}
              className="w-auto"
            />
            <span className="font-semibold">Start</span>
          </DropdownMenuTrigger>
        </Button>

        <DropdownMenuContent
          className="w-[300px] p-0 flex gap-2 shadow-none h-96 bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-2 border-solid border-black border-t-white border-l-white border-b-transparent rounded-none"
          align="start"
        >
          <div className="w-5 h-full bg-gradient-to-b mt-0 from-[#010f80] to-[#1084d0]" />
          <div className="w-full">
            <DropdownMenuLabel>Alexandre Dresch Portfolio</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                BackEnd
                <DropdownMenuShortcut>⇧⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                FrontEnd
                <DropdownMenuShortcut>⌘F</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Mobile
                <DropdownMenuShortcut>⌘M</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>My Resume</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      English
                      <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      Portuguese
                      <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              GitHub
              <DropdownMenuShortcut>⌘G</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              LinkedIn
              <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

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
            alt="calendar"
            src={"/calendar-3.png"}
            className="w-4"
          />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              asChild
              size="icon"
              variant="ghost"
              className="flex items-center w-auto h-auto"
            >
              <Image
                width={0}
                height={0}
                alt="speaker"
                src={"/loudspeaker_rays.png"}
                className="w-4"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[130px] h-56 bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-2 border-solid border-black border-t-white border-l-white border-b-transparent rounded-none mb-1 mr-2"
            align="start"
          >
            <VolumeSlider />
          </DropdownMenuContent>
        </DropdownMenu>

        <Clock className="font-light text-xs" showSeconds={false} />
      </div>
    </Card>
  );
}
