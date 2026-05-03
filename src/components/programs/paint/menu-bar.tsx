import { MenuName, MenuItems } from "./types";

interface MenuBarProps {
  menus: MenuItems;
  activeMenu: MenuName | null;
  onMenuClick: (name: MenuName) => void;
  onMenuItemClick: () => void;
}

export function MenuBar({
  menus,
  activeMenu,
  onMenuClick,
  onMenuItemClick,
}: MenuBarProps) {
  return (
    <div className="flex border-b border-[#808080] relative z-50">
      {(Object.keys(menus) as MenuName[]).map((name) => (
        <div key={name} className="relative">
          <div
            onMouseDown={(e) => {
              e.stopPropagation();
              onMenuClick(name);
            }}
            className={`px-2 py-0.5 cursor-default ${
              activeMenu === name
                ? "bg-[#000080] text-white"
                : "bg-transparent text-black"
            }`}
          >
            {name}
          </div>
          {activeMenu === name && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute top-full left-0 bg-[#c0c0c0] border border-[#808080] shadow-[2px_2px_0_#000] min-w-[185px] z-999"
            >
              {menus[name].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (!item.d && !item.dis && item.a) {
                      item.a();
                      onMenuItemClick();
                    }
                  }}
                  className={`py-0.5 px-4 pl-5 flex justify-between gap-3 whitespace-nowrap ${
                    item.d || item.dis
                      ? "cursor-default text-[#808080]"
                      : "cursor-pointer text-black hover:bg-[#000080] hover:text-white"
                  }`}
                >
                  <span>{item.l}</span>
                  {item.s && (
                    <span className="opacity-70 text-[11px]">{item.s}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
