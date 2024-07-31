import Image from "next/image";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import TooltipLink from "../shared/tooltip-link";
import { ReactNode } from "react";
import FolderNavigationMenu from "../shared/folder-navigation-menu";
import { useAppSelector } from "@/store/store";
import { cn } from "@/lib/utils";

interface FolderProps {
  folderName: string;
  icon: string;
  children: ReactNode;
  isMaximized: boolean;
}

export default function Folder({
  folderName,
  icon,
  children,
  isMaximized,
}: FolderProps) {
  const footerMessage = useAppSelector((state) => state.footerMessage.message);
  const { selectedProject } = useAppSelector((state) => state.projects);

  return (
    <div className="w-full h-full min-h-[500px] crt">
      <div className="border-[1px] border-[#808080] flex flex-col min-h-max flex-1 mt-[-15px]">
        <div className="h-7 flex items-center px-[2px] border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] gap-1">
          <Separator
            orientation="vertical"
            className="bg-[#C0C0C0] h-5 w-1 border-l-[1px] border-l-white border-r-[1px] border-r-[#808080]"
          />

          <FolderNavigationMenu />
        </div>

        <div className="h-14 flex items-center px-[2px] border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] gap-1">
          <Separator
            orientation="vertical"
            className="bg-[#C0C0C0] h-11 w-1 border-l-[1px] border-l-white border-r-[1px] border-r-[#808080]"
          />

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              className="w-20 flex flex-col px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
            >
              <Image
                width={0}
                height={0}
                alt="Go back"
                src="/arrow-left.svg"
                className="w-6 h-auto"
              />
              <span className="text-xs">Back</span>
            </Button>

            <Button
              variant="ghost"
              className="w-20 flex flex-col px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
            >
              <Image
                width={0}
                height={0}
                alt="Go forward"
                src="/arrow-right.svg"
                className="w-6 h-auto"
              />
              <span className="text-xs">Forward</span>
            </Button>
          </div>
        </div>

        <div className="h-8 flex items-center px-[2px] border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] gap-1">
          <Separator
            orientation="vertical"
            className="bg-[#C0C0C0] h-6 w-1 border-l-[1px] border-l-white border-r-[1px] border-r-[#808080]"
          />

          <span className="text-sm">Address</span>

          <div className="relative w-full">
            <div className="absolute top-2/4 left-2 h-5 w-5 -translate-y-2/4 place-items-center">
              <Image
                width={10}
                height={10}
                quality={100}
                alt={folderName}
                src={icon}
                className="w-6 h-auto mt-[2px] object-contain"
              />
            </div>
            <input
              className="w-full bg-white px-8 text-sm placeholder:text-black border-[2px] border-black border-b-white border-r-white outline-none"
              value={`${folderName.replace(/ /g, "_")}/`}
              readOnly
              name="Folder Path"
            />

            <div className="absolute top-2/4 right-[1px] h-5 w-5 -translate-y-2/4 mt-[2px]">
              <Button
                disabled
                variant="ghost"
                className="w-full flex flex-col bg-[#C0C0C0] px-1 py-0 h-5 rounded-none border-[1px] border-black border-t-white border-l-white place-items-center"
              >
                <Image
                  width={0}
                  height={0}
                  alt="Icon down"
                  src="/icon-down.svg"
                  className="w-3 h-auto"
                />
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`flex min-h-[400px] bg-[url('/folder-background.jpg')] bg-contain m-[2px]`}
        >
          <div className="w-1/3 min-h-max flex flex-col justify-between">
            <div className="w-full h-full pt-3 pl-3 pb-3">
              <Image
                width={100}
                height={100}
                quality={100}
                alt={selectedProject ? selectedProject.name : folderName}
                src={
                  selectedProject
                    ? selectedProject.type === "BACKEND"
                      ? "/icons/backend-icon.png"
                      : selectedProject.type === "FRONTEND"
                      ? "/icons/frontend-icon.png"
                      : "/icons/mobile-icon.png"
                    : icon
                }
                className="w-14 h-auto"
              />

              <h3 className="font-semibold text-xl">
                {selectedProject ? selectedProject.name : folderName}
              </h3>

              <Separator className="h-[2px] bg-rainbow my-3" />

              <p className="text-sm">
                {selectedProject === null
                  ? "Select an item to view its description."
                  : selectedProject.description}
              </p>
            </div>

            {selectedProject !== null && (
              <div
                className={cn(
                  "w-full flex justify-around pb-3",
                  selectedProject.deployment_url === null && "justify-start"
                )}
              >
                <TooltipLink
                  image="/github.svg"
                  link={selectedProject.github_url}
                  tooltip="Source Code"
                />

                {selectedProject.deployment_url !== null && (
                  <TooltipLink
                    image="/internet-explorer.png"
                    link={selectedProject.deployment_url}
                    tooltip="Visit Demo"
                  />
                )}
              </div>
            )}
          </div>

          <div
            className={`w-2/3 h-full bg-gradient-to-r from-transparent via-white to-white`}
          >
            {children}
          </div>
        </div>

        <div className="w-auto h-5 ml-[2px] bg-[#C0C0C0] flex items-center gap-1">
          <Image
            width={100}
            height={100}
            quality={100}
            alt={folderName}
            src={icon}
            className="w-4 h-auto"
          />

          <span className="text-xs">{footerMessage}</span>
        </div>
      </div>
    </div>
  );
}
