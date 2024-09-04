import { setFooterMessage } from "@/store/footer-message-slice";
import { useAppDispatch } from "@/store/store";
import Dropdown from "./dropdown";
import { MenuItemProps, MenuSubItemProps } from "@/types";

interface WindowNavigationMenuProps {
  menuItems: (MenuItemProps | MenuSubItemProps);
}

export default function WindowNavigationMenu({
  menuItems,
}: WindowNavigationMenuProps) {
  const dispatch = useAppDispatch();

  function handleSetMessage(event: React.MouseEvent) {
    const message = (event.target as HTMLElement).innerText;
    dispatch(setFooterMessage(message));
  }

  return (
    <div className="flex items-center gap-1">
      {Object.entries(menuItems).map(([key, items]) => (
        <Dropdown
          key={key}
          title={key.charAt(0).toUpperCase() + key.slice(1)}
          items={items}
          handleSetMessage={handleSetMessage}
        />
      ))}
    </div>
  );
}
