"use client";

import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { useAppDispatch } from "@/store/store";
import { openWindow } from "@/store/window-manager-slice";

interface DesktopContextMenuProps {
  children: React.ReactNode;
}

export default function DesktopContextMenu({
  children,
}: DesktopContextMenuProps) {
  const dispatch = useAppDispatch();

  const handleOpenProgram = (id: number) => {
    dispatch(openWindow(id));
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>

      <ContextMenuContent className="crt min-w-[180px] bg-[#c0c0c0] text-black p-1 rounded-none shadow-none border-[2px] border-black border-t-white border-l-white select-none">
        <ContextMenuItem className="p-1 rounded-none text-sm cursor-default data-[state=open]:bg-[#010f80] focus:bg-[#010f80] focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          Refresh
        </ContextMenuItem>

        <ContextMenuSeparator className="h-0.5 mx-1 my-0.5 bg-[#808080] border-b border-white" />

        <ContextMenuItem className="p-1 rounded-none text-sm cursor-default data-[state=open]:bg-[#010f80] focus:bg-[#010f80] focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          Arrange Icons
        </ContextMenuItem>

        <ContextMenuItem className="p-1 rounded-none text-sm cursor-default data-[state=open]:bg-[#010f80] focus:bg-[#010f80] focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          Line Up Icons
        </ContextMenuItem>

        <ContextMenuSeparator className="h-0.5 mx-1 my-0.5 bg-[#808080] border-b border-white" />

        <ContextMenuItem className="p-1 rounded-none text-sm cursor-default data-[state=open]:bg-[#010f80] focus:bg-[#010f80] focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          New Folder
        </ContextMenuItem>

        <ContextMenuSeparator className="h-0.5 mx-1 my-0.5 bg-[#808080] border-b border-white" />

        <ContextMenuItem
          className="p-1 rounded-none text-sm cursor-default data-[state=open]:bg-[#010f80] focus:bg-[#010f80] focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          onClick={() => handleOpenProgram(18)}
        >
          Properties
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
