import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownProps } from "@/types";
import MenuSubItem from "./menu-sub-item";
import MenuItem from "./menu-item";

export default function Dropdown({
  title,
  items,
  handleSetMessage,
}: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-fit px-1 py-0 rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white first-letter:underline text-sm">
        {title}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="crt w-auto py-[2px] px-0 flex gap-2 shadow-none bg-[#C0C0C0] data-[state=closed]:duration-100 data-[state=open]:duration-100 border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white rounded-none"
        align="start"
      >
        <div className="w-full">
          <DropdownMenuGroup>
            {items.map((item, index) => {
              if ("items" in item) {
                return (
                  <MenuSubItem
                    key={index}
                    {...item}
                    handleSetMessage={handleSetMessage}
                  />
                );
              }
              return (
                <MenuItem
                  key={index}
                  {...item}
                  handleSetMessage={handleSetMessage}
                />
              );
            })}
          </DropdownMenuGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
