import Image from "next/image";
import { Button } from "./button";
import { Separator } from "./separator";

export default function Folder() {
  return (
    <div className="w-full min-h-dvh">
      <div className="border-[1px] border-[#808080] flex flex-col h-auto mt-[-15px]">
        <div className="h-7 flex items-center px-[2px] border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] gap-1">
          <Separator
            orientation="vertical"
            className="bg-[#C0C0C0] h-5 w-1 border-l-[1px] border-l-white border-r-[1px] border-r-[#808080]"
          />

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              className="w-max px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
            >
              <span className="first-letter:underline text-sm">File</span>
            </Button>

            <Button
              variant="ghost"
              className="w-max px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
            >
              <span className="first-letter:underline text-sm">Edit</span>
            </Button>

            <Button
              variant="ghost"
              className="w-max px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
            >
              <span className="first-letter:underline text-sm">View</span>
            </Button>

            <Button
              variant="ghost"
              className="w-max px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
            >
              <span className="first-letter:underline text-sm">Go</span>
            </Button>

            <Button
              variant="ghost"
              className="w-max px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
            >
              <span className="first-letter:underline text-sm">Favorites</span>
            </Button>

            <Button
              variant="ghost"
              className="w-max px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
            >
              <span className="first-letter:underline text-sm">Tools</span>
            </Button>

            <Button
              variant="ghost"
              className="w-max px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
            >
              <span className="first-letter:underline text-sm">Help</span>
            </Button>
          </div>
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
              <span className="text-xs">Foward</span>
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
                alt="Open folder icon"
                src="/open-folder.png"
                className="w-6 h-auto"
              />
            </div>
            <input
              className="w-full bg-white px-8 text-sm placeholder:text-black border-[2px] border-black border-b-white border-r-white outline-none"
              value={"BackEnd/"}
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

        <div className="flex h-[calc(100vh_-_469px)] bg-[url('/folder-background.jpg')] bg-contain m-[2px]">
          <div className="w-1/3">
            <div className="w-full pt-3">
              <Image
                width={100}
                height={100}
                quality={100}
                alt="Open folder icon"
                src="/open-folder.png"
                className="w-14 h-auto pl-3"
              />

              <h3 className="font-semibold text-xl pl-3">Themes</h3>

              <Separator className="h-[2px] bg-rainbow my-3" />

              <p className="pl-3 text-xs">Select an item to view its description.</p>
            </div>
          </div>

          <div className="w-2/3 bg-gradient-to-r from-transparent via-white to-white">
            
          </div>
        </div>
      </div>
    </div>
  );
}
