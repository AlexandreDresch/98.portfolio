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
import { Calendar } from "../ui/calendar";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { getProjectsData } from "@/store/projects-slice";
import MessageContainer from "./message-container";
import Link from "next/link";
import DockList from "./dock-list";
import { openWindow } from "@/store/window-manager-slice";

export default function Dock() {
  const dispatch = useAppDispatch();

  const projectsStatus = useAppSelector((state) => state.projects.status);

  const handleOpen = (id: number) => {
    dispatch(openWindow(id));
  };

  useEffect(() => {
    if (projectsStatus === "initial") {
      dispatch(getProjectsData());
    }
  }, [projectsStatus, dispatch]);

  return (
    <Card className="crt w-full h-8 flex items-center bg-[#C0C0C0] fixed bottom-0 left-0 rounded-none border-white border-0 border-t-[1px] z-[100]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="w98"
            className="flex items-center w-[70px] h-6"
          >
            <Image
              width={0}
              height={0}
              alt="Windows logo"
              src={"/windows.png"}
              className="w-auto"
            />
            <span className="font-semibold">Start</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="crt w-[300px] p-0 flex gap-2 shadow-none h-96 bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-2 border-solid border-black border-t-white border-l-white border-b-transparent rounded-none"
          align="start"
        >
          <div className="w-5 h-full bg-gradient-to-b mt-0 from-[#1084d0] to-[#010f80] flex items-end">
            <h1 className="-rotate-90 text-white w-full font-semibold">
              98.portfolio
            </h1>
          </div>
          <div className="w-full pr-2">
            <DropdownMenuLabel>Alexandre Dresch</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleOpen(3)}>
                BackEnd
                <DropdownMenuShortcut>⇧⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleOpen(4)}>
                FrontEnd
                <DropdownMenuShortcut>⌘F</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleOpen(5)}>
                Mobile
                <DropdownMenuShortcut>⌘M</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleOpen(7)}>
                About
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleOpen(2)}>
                Settings
                <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="data-[state=open]:text-white">
                  My Resume
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="crt flex px-0 flex-col bg-[#C0C0C0] border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white rounded-none">
                    <DropdownMenuItem onClick={() => handleOpen(6)}>
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
              <Link href="https://github.com/AlexandreDresch" target="_blank">
                GitHub
              </Link>

              <DropdownMenuShortcut>⌘G</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="https://www.linkedin.com/in/alexandre-dresch/"
                target="_blank"
              >
                LinkedIn
              </Link>

              <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator
        orientation="vertical"
        className="mx-1 bg-[#808080] w-[2px] border-white border-r-[1px] h-6"
      />

      <div className="w-full">
        <DockList />
      </div>

      <Separator
        orientation="vertical"
        className="mx-[1px] bg-[#808080] w-[2px] border-white border-r-[1px] h-6"
      />

      <div className="bg-[#C0C0C0] border border-solid border-[#808080] w-44 h-6 flex items-center p-1">
        <DropdownMenu>
          <DropdownMenuTrigger>
            {projectsStatus === "initial" || projectsStatus === "pending" ? (
              <Image
                width={100}
                height={100}
                alt="Hourglass Loading Gif"
                src="/hourglass-loading.gif"
                quality={100}
                className="w-8"
              />
            ) : projectsStatus === "fulfilled" ? (
              <Image
                width={100}
                height={100}
                alt="Computer Gif"
                src="/computer.gif"
                quality={100}
                className="w-[18px] mr-2"
              />
            ) : (
              <Image
                width={100}
                height={100}
                alt="Error Icon"
                src="/error.png"
                quality={100}
                className="w-[18px] mr-2"
              />
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="crt w-auto mb-0.5 p-0 border-2 border-t-white border-l-white border-r-black border-b-transparent  rounded-none bg-[#C0C0C0]"
            align="center"
          >
            <MessageContainer
              status={projectsStatus}
              title={
                projectsStatus === "initial" || projectsStatus === "pending"
                  ? "Please wait..."
                  : projectsStatus === "fulfilled"
                  ? "Success!"
                  : "Oops!"
              }
              message={
                projectsStatus === "initial" || projectsStatus === "pending"
                  ? "Loading projects, it could take a while (Free Tier API)..."
                  : projectsStatus === "fulfilled"
                  ? "Projects received successfully. You can check the folders now."
                  : "Something went wrong! Please try again."
              }
            />
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="flex items-center w-auto h-auto hover:cursor-pointer"
            >
              <Image
                width={0}
                height={0}
                alt="calendar"
                src={"/calendar-3.png"}
                className="w-4"
              />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="crt w-auto mb-0.5 mr-2 p-0 border-2 border-t-white border-l-white border-r-black border-b-transparent  rounded-none bg-[#C0C0C0]"
            align="center"
          >
            <Calendar
              mode="single"
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="flex items-center w-auto h-auto mx-2"
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
            className="crt w-[130px] h-56 bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-2 border-solid border-black border-t-white border-l-white border-b-transparent rounded-none mb-1 mr-2"
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
