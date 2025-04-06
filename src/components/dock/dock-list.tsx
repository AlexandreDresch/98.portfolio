import { ScrollArea } from "@/components/ui/scroll-area";
import { openFolder } from "@/store/folders-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button } from "../ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toggleProgram } from "@/store/programs-slice";
import { Folder } from "@/types";

export default function DockList() {
  const dispatch = useAppDispatch();

  const { dockFolders } = useAppSelector((state) => state.folders);
  const { dockPrograms } = useAppSelector((state) => state.programs);

  const dockItems = [...dockFolders, ...dockPrograms];

  function handleItemClick(item: { id: number; isFolder?: boolean }) {
    if (item.isFolder) {
      dispatch(openFolder(item.id));
    } else {
      dispatch(toggleProgram(item.id));
    }
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-max space-x-1 py-1">
        {dockItems.map((item) => {
          const isProgram = item.id >= 9;
          const isOpen = item.isOpen;

          return (
            <Button
              key={item.id}
              className={cn(
                "border-white border-solid border-b-black border-r-black border-[1px] w-44 h-6 py-0 px-2 rounded-none bg-transparent gap-2 items-center justify-start flex hover:bg-white hover:border-black hover:border-b-white hover:border-r-white",
                isOpen && "bg-white border-black border-b-white border-r-white"
              )}
              onClick={() =>
                handleItemClick({
                  id: item.id,
                  isFolder: !isProgram,
                })
              }
            >
              <Image
                src={item.image}
                alt={item.name}
                width={16}
                height={16}
              />
              <p className="text-black">{item.name}</p>
            </Button>
          );
        })}
      </div>
    </ScrollArea>
  );
}