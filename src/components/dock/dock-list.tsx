import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button } from "../ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toggleWindow, openWindow } from "@/store/window-manager-slice";

export default function DockList() {
  const dispatch = useAppDispatch();

  const { dockItems } = useAppSelector((state) => state.windows);

  function handleItemClick(id: number) {
    dispatch(toggleWindow(id));
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-max space-x-1 py-1">
        {dockItems.map((item) => {
          const isOpen = item.isOpen;

          return (
            <Button
              key={item.id}
              className={cn(
                "border-white border-solid border-b-black border-r-black border-[1px] w-44 h-6 py-0 px-2 rounded-none bg-transparent gap-2 items-center justify-start flex hover:bg-white hover:border-black hover:border-b-white hover:border-r-white",
                isOpen && "bg-white border-black border-b-white border-r-white"
              )}
              onClick={() => handleItemClick(item.id)}
            >
              <Image src={item.image} alt={item.name} width={16} height={16} />
              <p className="text-black">{item.name}</p>
            </Button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
