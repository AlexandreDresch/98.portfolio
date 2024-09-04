import {
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuSubItemProps } from "@/types";
import MenuItem from "./menu-item";

export default function MenuSubItem({
  label,
  items,
  handleSetMessage,
}: MenuSubItemProps) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="hover:bg-transparent data-[state=open]:text-white data-[state=open]:bg-[#010f80] py-0.5 rounded-none hover:cursor-pointer">
        {label}
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="crt bg-[#C0C0C0] rounded-none p-0 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white">
          {items.map((item, index) => (
            <MenuItem
              key={index}
              {...item}
              handleSetMessage={handleSetMessage}
            />
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
