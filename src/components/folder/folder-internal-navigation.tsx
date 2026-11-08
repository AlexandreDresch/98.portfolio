import Image from "next/image";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { closeFile, reOpenFile } from "@/store/folders-slice";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";

export default function FolderInternalNavigation() {
  const dispatch = useAppDispatch();
  const { isFileOpen, lastFileOpened, selectedFile } = useAppSelector(
    (state) => state.folders,
  );

  const handleReOpenProject = () => {
    dispatch(reOpenFile());
  };

  const handleCloseProject = () => {
    dispatch(closeFile());
  };

  return (
    <div className="flex items-center gap-0.5 overflow-hidden">
      <Button
        variant="ghost"
        className="w-20 flex flex-col px-0 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
        disabled={!isFileOpen || selectedFile === null}
        onClick={handleCloseProject}
      >
        <Image
          width={0}
          height={0}
          alt="Go back"
          src="/icons/back.svg"
          className={
            cn(
              "w-6 h-auto hover:grayscale-0 transition duration-300",
              !isFileOpen || selectedFile === null ? "grayscale" : "",
            ) as string
          }
        />
        <span className="text-xs">Back</span>
      </Button>

      <Button
        variant="ghost"
        className="w-20 flex flex-col px-0 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
        disabled={
          isFileOpen || lastFileOpened === null || selectedFile === null
        }
        onClick={handleReOpenProject}
      >
        <Image
          width={0}
          height={0}
          alt="Go forward"
          src="/icons/forward.svg"
          className={
            cn(
              "w-6 h-auto hover:grayscale-0 transition duration-300",
              isFileOpen || lastFileOpened === null || selectedFile === null
                ? "grayscale"
                : "",
            ) as string
          }
        />
        <span className="text-xs">Forward</span>
      </Button>

      <Button
        variant="ghost"
        className="w-20 flex flex-col px-0 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
        disabled={true}
      >
        <Image
          width={0}
          height={0}
          alt="Go Up"
          src="/icons/up.svg"
          className={
            cn(
              "w-6 h-auto hover:grayscale-0 transition duration-300 grayscale",
            ) as string
          }
        />
        <span className="text-xs">Up</span>
      </Button>

      <Separator
        orientation="vertical"
        className="bg-[#C0C0C0] h-11 w-1 border-l-[1px] border-l-white border-r-[1px] border-r-[#808080]"
      />

      <Button
        variant="ghost"
        className="w-20 flex flex-col px-0 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
        disabled={true}
      >
        <Image
          width={0}
          height={0}
          alt="Cut"
          src="/icons/cut.svg"
          className={
            cn(
              "w-6 h-auto hover:grayscale-0 transition duration-300 grayscale",
            ) as string
          }
        />
        <span className="text-xs">Cut</span>
      </Button>

      <Button
        variant="ghost"
        className="w-20 flex flex-col px-0 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
        disabled={true}
      >
        <Image
          width={0}
          height={0}
          alt="Copy"
          src="/icons/copy.svg"
          className={
            cn(
              "w-6 h-auto hover:grayscale-0 transition duration-300 grayscale",
            ) as string
          }
        />
        <span className="text-xs">Copy</span>
      </Button>

      <Button
        variant="ghost"
        className="w-20 flex flex-col px-0 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
        disabled={true}
      >
        <Image
          width={0}
          height={0}
          alt="Paste"
          src="/icons/paste.svg"
          className={
            cn(
              "w-6 h-auto hover:grayscale-0 transition duration-300 grayscale",
            ) as string
          }
        />
        <span className="text-xs">Paste</span>
      </Button>

      <Separator
        orientation="vertical"
        className="bg-[#C0C0C0] h-11 w-1 border-l-[1px] border-l-white border-r-[1px] border-r-[#808080]"
      />

      <Button
        variant="ghost"
        className="w-20 flex flex-col px-0 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
        disabled={true}
      >
        <Image
          width={0}
          height={0}
          alt="Undo"
          src="/icons/undo.svg"
          className={
            cn(
              "w-6 h-auto hover:grayscale-0 transition duration-300 grayscale",
            ) as string
          }
        />
        <span className="text-xs">Undo</span>
      </Button>

      <Separator
        orientation="vertical"
        className="bg-[#C0C0C0] h-11 w-1 border-l-[1px] border-l-white border-r-[1px] border-r-[#808080]"
      />

      <Button
        variant="ghost"
        className="w-20 flex flex-col px-0 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
        disabled={true}
      >
        <Image
          width={0}
          height={0}
          alt="Delete"
          src="/icons/delete.svg"
          className={
            cn(
              "w-6 h-auto hover:grayscale-0 transition duration-300 grayscale",
            ) as string
          }
        />
        <span className="text-xs">Delete</span>
      </Button>

      <Button
        variant="ghost"
        className="w-20 flex flex-col px-0 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
        disabled={true}
      >
        <Image
          width={0}
          height={0}
          alt="Properties"
          src="/icons/properties.svg"
          className={
            cn(
              "w-6 h-auto hover:grayscale-0 transition duration-300 grayscale",
            ) as string
          }
        />
        <span className="text-xs">Properties</span>
      </Button>

      <Separator
        orientation="vertical"
        className="bg-[#C0C0C0] h-11 w-1 border-l-[1px] border-l-white border-r-[1px] border-r-[#808080]"
      />

      <Button
        variant="ghost"
        className="w-20 flex flex-col px-0 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
        disabled={true}
      >
        <Image
          width={0}
          height={0}
          alt="Views"
          src="/icons/views.svg"
          className={
            cn(
              "w-6 h-auto hover:grayscale-0 transition duration-300 grayscale",
            ) as string
          }
        />
        <span className="text-xs">Views</span>
      </Button>
    </div>
  );
}
