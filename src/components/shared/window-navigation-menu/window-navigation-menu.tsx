import { setFooterMessage } from "@/store/footer-message-slice";
import { useAppDispatch } from "@/store/store";
import Dropdown from "./dropdown";
import { WindowNavigationMenuProps } from "@/types";
import { Separator } from "@/components/ui/separator";
import { FooterMessages } from "@/constants";

export default function WindowNavigationMenu({
  menuItems,
  messages,
}: WindowNavigationMenuProps) {
  const dispatch = useAppDispatch();

  function handleSetMessage(event: React.MouseEvent) {
    if (messages) {
      const textContent = Array.from(event.currentTarget.childNodes)
        .map(
          (node) =>
            (node as HTMLElement).innerText || (node as HTMLElement).textContent
        )
        .join(" ")
        .replace(/\s+/g, "")
        .trim();
      const messageObject = FooterMessages.find(
        (item) => item.name === textContent
      );

      if (messageObject) {
        dispatch(setFooterMessage(messageObject.message));
      }
      return;
    }

    const message = (event.target as HTMLElement).innerText;
    dispatch(setFooterMessage(message));
  }

  return (
    <div className="flex items-center gap-1">
      <div className="h-7 w-full flex items-center px-[2px] border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] gap-1">
        <Separator
          orientation="vertical"
          className="bg-[#C0C0C0] h-5 w-1 border-l-[1px] border-l-white border-r-[1px] border-r-[#808080]"
        />

        {Object.entries(menuItems).map(([key, items]) => (
          <Dropdown
            key={key}
            title={key.charAt(0).toUpperCase() + key.slice(1)}
            items={items}
            handleSetMessage={handleSetMessage}
          />
        ))}
      </div>
    </div>
  );
}
