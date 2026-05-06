import { MenuName, MenuItems } from "./types";
import { setFooterMessage } from "@/store/footer-message-slice";
import { useAppDispatch } from "@/store/store";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef } from "react";

interface MenuBarProps {
  menus: MenuItems;
  activeMenu: MenuName | null;
  onMenuClick: (name: MenuName) => void;
  onMenuItemClick: () => void;
  messages?: {
    name: string;
    message: string;
  }[];
}

export function MenuBar({
  menus,
  activeMenu,
  onMenuClick,
  onMenuItemClick,
  messages,
}: MenuBarProps) {
  const dispatch = useAppDispatch();
  const menuBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuBarRef.current &&
        !menuBarRef.current.contains(event.target as Node)
      ) {
        if (activeMenu !== null) {
          onMenuClick(null as any);
          dispatch(setFooterMessage(""));
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeMenu, onMenuClick, dispatch]);

  const handleMessage = (itemLabel: string) => {
    if (!messages) return;

    const cleanLabel = itemLabel.replace(/\s+/g, "").replace(/[×]/g, "");
    const messageObj = messages.find((m) => m.name === cleanLabel);

    if (messageObj) {
      dispatch(setFooterMessage(messageObj.message));
    } else {
      dispatch(setFooterMessage(itemLabel));
    }
  };

  const clearMessage = () => {
    dispatch(setFooterMessage(""));
  };

  return (
    <div className="flex items-center gap-1" ref={menuBarRef}>
      <div className="h-7 w-full flex items-center px-[2px] border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] gap-1">
        <Separator
          orientation="vertical"
          className="bg-[#C0C0C0] h-5 w-1 border-l-[1px] border-l-white border-r-[1px] border-r-[#808080]"
        />

        {(Object.keys(menus) as MenuName[]).map((name) => (
          <div key={name} className="relative">
            <div
              onMouseDown={(e) => {
                e.stopPropagation();
                onMenuClick(name);
                handleMessage(name);
              }}
              onMouseEnter={() => handleMessage(name)}
              onMouseLeave={clearMessage}
              className={`px-2 py-0.5 cursor-default text-sm first-letter:underline border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white `}
            >
              {name}
            </div>
            {activeMenu === name && (
              <div
                onClick={(e) => e.stopPropagation()}
                onMouseLeave={clearMessage}
                className="absolute crt top-full left-0 bg-[#c0c0c0] border-[1px] border-solid border-b-black border-r-black border-t-white border-l-white min-w-[185px] z-[1000] shadow-md"
              >
                {menus[name].map((item, idx) => {
                  if (item.d && item.l === "─") {
                    return (
                      <div key={idx} className="h-px bg-[#808080] mx-2 my-1" />
                    );
                  }

                  if (item.d || item.dis) {
                    return (
                      <div
                        key={idx}
                        className="py-0.5 px-4 pl-5 flex justify-between gap-3 whitespace-nowrap cursor-default text-[#808080]"
                        onMouseEnter={() => handleMessage(item.l)}
                        onMouseLeave={clearMessage}
                      >
                        <span>{item.l}</span>
                        {item.s && (
                          <span className="opacity-70 text-[11px]">
                            {item.s}
                          </span>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        if (!item.d && !item.dis && item.a) {
                          item.a();
                          onMenuItemClick();
                          clearMessage();
                        }
                      }}
                      onMouseEnter={() => handleMessage(item.l)}
                      onMouseLeave={clearMessage}
                      className="py-0.5 px-4 pl-5 flex justify-between gap-3 whitespace-nowrap cursor-pointer text-black hover:bg-[#000080] hover:text-white"
                    >
                      <span>{item.l}</span>
                      {item.s && (
                        <span className="opacity-70 text-[11px]">{item.s}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
