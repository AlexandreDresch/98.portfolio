import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { openFolder } from "@/store/folders-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button } from "../ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function DockList() {
  const dispatch = useAppDispatch();

  const { dockFolders } = useAppSelector((state) => state.folders);

  function handleOpenFolder(id: number) {
    dispatch(openFolder(id));
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-max space-x-1 py-1">
        {dockFolders.map((folder) => {
          return (
            <Button
              key={folder.id}
              className={cn(
                "border-white border-solid border-b-black border-r-black border-[1px] w-44 h-6 py-0 px-2 rounded-none bg-transparent gap-2 items-center justify-start flex hover:bg-white hover:border-black hover:border-b-white hover:border-r-white",
                folder.isOpen &&
                  "bg-white border-black border-b-white border-r-white"
              )}
              onClick={() => handleOpenFolder(folder.id)}
            >
              <Image
                src={folder.image}
                alt={folder.name}
                width={16}
                height={16}
              />
              <p className="text-black">{folder.name}</p>
            </Button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
