"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { openWindow, selectProgram } from "@/store/window-manager-slice";
import WindowWrapper from "@/components/shared/window-wrapper";
import { cn } from "@/lib/utils";
import { DiskChart } from "./disk-chart";
import { Separator } from "@/components/ui/separator";
import NotAvailable from "@/components/shared/not-available";
import { ExplorerItemView } from "./explorer-item-view";
import { ToolbarButton } from "./toolbar-button";
import { ITEMS, MENU_ITEMS, NAVIGATION_ACTIONS } from "./constants";
import { ExplorerItem, MyComputerProps, ViewMode } from "./types";

export default function MyComputer({
  renderTrigger,
  windowId,
}: MyComputerProps) {
  const dispatch = useAppDispatch();
  const { selectedProgram } = useAppSelector((state) => state.windows);

  const [currentPath, setCurrentPath] = useState("My Computer");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("icons");

  const [history, setHistory] = useState<string[]>(["My Computer"]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [addressValue, setAddressValue] = useState("My Computer");

  const selectedItem = useMemo(
    () => ITEMS.find((item) => item.id === selectedId),
    [selectedId],
  );

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  const navigate = (path: string, addHistory = true) => {
    setCurrentPath(path);
    setAddressValue(path);
    setSelectedId(null);

    if (!addHistory) return;

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(path);

    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (!canGoBack) return;

    const newIndex = historyIndex - 1;

    setHistoryIndex(newIndex);
    setCurrentPath(history[newIndex]);
    setAddressValue(history[newIndex]);
    setSelectedId(null);
  };

  const goForward = () => {
    if (!canGoForward) return;

    const newIndex = historyIndex + 1;

    setHistoryIndex(newIndex);
    setCurrentPath(history[newIndex]);
    setAddressValue(history[newIndex]);
    setSelectedId(null);
  };

  const goUp = () => {
    if (currentPath === "My Computer") return;

    navigate("My Computer");
  };

  const handleOpen = (item: ExplorerItem) => {
    setSelectedId(item.id);

    if (item.type === "drive" || item.type === "folder") {
      navigate(item.name);
    }
  };

  const handleAddressSubmit = () => {
    const value = addressValue.trim();

    if (!value) {
      setAddressValue(currentPath);
      return;
    }

    if (
      value.toLowerCase() === "my computer" ||
      value.toLowerCase() === "my computer\\"
    ) {
      navigate("My Computer");
      return;
    }

    const foundItem = ITEMS.find(
      (item) =>
        item.name.toLowerCase() === value.toLowerCase() ||
        item.name.toLowerCase().startsWith(value.toLowerCase()),
    );

    if (foundItem) {
      navigate(foundItem.name);
      return;
    }

    setAddressValue(currentPath);
  };

  const handleMenuAction = (action: string) => {
    setOpenMenu(null);

    switch (action) {
      case "Back":
        goBack();
        break;

      case "Forward":
        goForward();
        break;

      case "Up One Level":
        goUp();
        break;

      case "Large Icons":
        setViewMode("icons");
        break;

      case "Small Icons":
        setViewMode("list");
        break;

      case "List":
        setViewMode("list");
        break;

      case "Details":
        setViewMode("details");
        break;

      case "Open":
      case "Explore":
        if (selectedItem) {
          handleOpen(selectedItem);
        }
        break;

      case "Select All":
        setSelectedId(ITEMS[0]?.id ?? null);
        break;

      default:
        break;
    }
  };

  const handleOpenWindow = () => {
    dispatch(openWindow(windowId));
  };

  const handleSelect = () => {
    dispatch(selectProgram(null));
    dispatch(selectProgram(windowId));
  };

  const isActive = selectedProgram?.id === windowId;

  return (
    <>
      {renderTrigger && (
        <button
          type="button"
          onClick={handleSelect}
          onDoubleClick={handleOpenWindow}
          className="flex cursor-pointer flex-col items-center gap-1 bg-transparent border-0"
        >
          <Image
            src="/computer-explorer.png"
            alt="My Computer"
            width={38}
            height={38}
            draggable={false}
          />

          <span
            className={cn(
              "font-normal text-sm text-white px-2 bg-[#0c7f80] truncate max-w-full",
              isActive && "bg-[#010f80]",
            )}
          >
            My Computer
          </span>
        </button>
      )}

      <WindowWrapper
        id={windowId}
        title="My Computer"
        icon="/computer-explorer.png"
        crtEffect={true}
        className="overflow-hidden"
      >
        <div
          className="flex min-h-0 flex-1 flex-col bg-[#c0c0c0] text-[12px] text-black select-none"
          onClick={() => setOpenMenu(null)}
        >
          <div
            className="relative flex h-[23px] shrink-0 items-center border-b border-[#808080] bg-[#c0c0c0]"
            onClick={(event) => event.stopPropagation()}
          >
            {Object.keys(MENU_ITEMS).map((menu) => (
              <div key={menu} className="relative">
                <button
                  type="button"
                  className={cn(
                    "h-[21px] px-[8px] text-left",
                    "hover:bg-[#000080] hover:text-white",
                    openMenu === menu && "bg-[#000080] text-white",
                  )}
                  onClick={() =>
                    setOpenMenu((current) => (current === menu ? null : menu))
                  }
                >
                  {menu}
                </button>

                {openMenu === menu && (
                  <div
                    className="crt absolute left-0 top-[21px] z-[1000] min-w-[170px] border border-black bg-[#c0c0c0] p-[2px] shadow-[2px_2px_0_#000]"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {MENU_ITEMS[menu as keyof typeof MENU_ITEMS].map(
                      (action) => (
                        <button
                          key={action}
                          type="button"
                          className="block w-full whitespace-nowrap px-5 py-[3px] text-left hover:bg-[#000080] hover:text-white disabled:text-[#808080] disabled:hover:bg-transparent disabled:hover:text-[#808080]"
                          disabled={
                            (action === "Back" && !canGoBack) ||
                            (action === "Forward" && !canGoForward) ||
                            (action === "Up One Level" &&
                              currentPath === "My Computer")
                          }
                          onClick={() => handleMenuAction(action)}
                        >
                          {action}
                        </button>
                      ),
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="shrink-0 border-b border-[#808080] bg-[#c0c0c0]">
            <div className="flex h-[39px] items-center gap-[2px] px-[5px]">
              {NAVIGATION_ACTIONS.slice(0, 2).map((action) => (
                <ToolbarButton
                  key={action.label}
                  label={action.label}
                  icon={action.icon}
                  disabled={
                    (action.label === "Back" && !canGoBack) ||
                    (action.label === "Forward" && !canGoForward)
                  }
                  onClick={() => handleMenuAction(action.label)}
                />
              ))}

              <Separator className="mx-[2px] h-[28px] w-[2px] border-l border-[#808080] border-r-white" />

              <ToolbarButton
                label={NAVIGATION_ACTIONS[2].label}
                disabled={currentPath === "My Computer"}
                icon={NAVIGATION_ACTIONS[2].icon}
                onClick={goUp}
              />

              <Separator className="mx-[2px] h-[28px] w-[2px] border-l border-[#808080] border-r-white" />
              {NAVIGATION_ACTIONS.slice(3, 6).map((action) => (
                <ToolbarButton
                  key={action.label}
                  label={action.label}
                  icon={action.icon}
                  onClick={() => handleMenuAction(action.label)}
                />
              ))}

              <Separator className="mx-[2px] h-[28px] w-[2px] border-l border-[#808080] border-r-white" />

              {NAVIGATION_ACTIONS.slice(6, 8).map((action) => (
                <ToolbarButton
                  key={action.label}
                  label={action.label}
                  icon={action.icon}
                  onClick={() => handleMenuAction(action.label)}
                />
              ))}

              <Separator className="mx-[2px] h-[28px] w-[2px] border-l border-[#808080] border-r-white" />

              <ToolbarButton
                label={NAVIGATION_ACTIONS[8].label}
                icon={NAVIGATION_ACTIONS[8].icon}
                onClick={() => handleMenuAction(NAVIGATION_ACTIONS[8].label)}
              />

              <Separator className="mx-[2px] h-[28px] w-[2px] border-l border-[#808080] border-r-white" />

              <ToolbarButton
                label={NAVIGATION_ACTIONS[9].label}
                icon={
                  viewMode === "icons"
                    ? "/icons/grid.png"
                    : viewMode === "list"
                      ? "/icons/list.png"
                      : "/icons/list-details.png"
                }
                onClick={() =>
                  setViewMode((mode) =>
                    mode === "icons"
                      ? "list"
                      : mode === "list"
                        ? "details"
                        : "icons",
                  )
                }
              />
            </div>
          </div>

          <div className="flex h-[27px] shrink-0 items-center gap-1 border-b border-[#808080] bg-[#c0c0c0] px-[5px]">
            <span className="text-[11px]">Address</span>

            <div className="relative flex min-w-0 flex-1">
              <div className="absolute left-[3px] top-[3px] z-10">
                <Image
                  src="/icons/my-computer.png"
                  alt=""
                  width={16}
                  height={16}
                  draggable={false}
                />
              </div>

              <input
                value={addressValue}
                onChange={(event) => setAddressValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleAddressSubmit();
                  }
                }}
                className="h-[21px] w-full border border-[#808080] border-t-black border-l-black bg-white pl-[23px] pr-[22px] outline-none"
                aria-label="Address"
              />

              <button
                type="button"
                className="absolute right-0 top-0 flex h-[20px] w-[20px] items-center justify-center border border-white border-b-black border-r-black bg-[#c0c0c0]"
                onClick={handleAddressSubmit}
              >
                <span className="text-[10px]">▼</span>
              </button>
            </div>
          </div>

          <div className="relative flex min-h-0 flex-1 overflow-auto bg-white">
            {currentPath === "My Computer" ? (
              <div className="flex min-h-full w-full flex-col">
                <div className="flex min-h-0 flex-1">
                  <aside className="hidden w-[195px] shrink-0 border-r border-[#c0c0c0] bg-white p-[15px] md:block">
                    <h1 className="mb-[2px] text-[20px] font-bold leading-[22px]">
                      My Computer
                    </h1>

                    <div className="mb-3 h-[1px] w-full bg-gradient-to-r from-[#000080] via-[#00a0ff] to-transparent" />

                    {selectedItem?.id === "c" || !selectedItem ? (
                      <DriveInfo />
                    ) : (
                      <div className="pt-2">
                        <div className="font-bold">{selectedItem.name}</div>
                        <div>{selectedItem.description}</div>
                      </div>
                    )}
                  </aside>

                  <main
                    className={cn(
                      "min-w-0 flex-1 p-[8px]",
                      viewMode === "icons"
                        ? "grid content-start grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-x-4 gap-y-3"
                        : "flex flex-col gap-0",
                    )}
                  >
                    {ITEMS.map((item) => (
                      <ExplorerItemView
                        key={item.id}
                        item={item}
                        selected={selectedId === item.id}
                        viewMode={viewMode}
                        onSelect={() => setSelectedId(item.id)}
                        onOpen={() => handleOpen(item)}
                      />
                    ))}
                  </main>
                </div>
              </div>
            ) : (
              <NotAvailable message="It seems that you found something now available yet, come back later c:" />
            )}
          </div>

          <div className="flex h-[21px] shrink-0 items-center border-t border-[#808080] bg-[#c0c0c0] px-[2px]">
            <div className="flex h-[17px] min-w-0 flex-1 items-center border border-[#808080] border-t-black border-l-black bg-[#c0c0c0] px-[5px]">
              {selectedItem
                ? selectedItem.description || selectedItem.name
                : currentPath === "My Computer"
                  ? `${ITEMS.length} object${ITEMS.length === 1 ? "" : "s"}`
                  : currentPath}
            </div>

            <div className="ml-[2px] flex h-[17px] w-[220px] items-center border border-[#808080] border-t-black border-l-black px-[5px]">
              {selectedItem?.id === "c" ? (
                <>Free Space: 5.21GB, Capacity: 5.95GB</>
              ) : (
                "My Computer"
              )}
            </div>

            <div className="ml-[2px] flex h-[17px] w-[220px] items-center border border-[#808080] border-t-black border-l-black px-[5px]">
              <Image
                src="/icons/my-computer.png"
                alt=""
                width={15}
                height={15}
                className="mr-1"
                draggable={false}
              />
              {currentPath}
            </div>
          </div>
        </div>
      </WindowWrapper>
    </>
  );
}

function DriveInfo() {
  return (
    <div className="text-[12px]">
      <div className="font-bold">Main hd (C:)</div>

      <div className="mb-3">Local Disk</div>

      <div className="mb-1">Capacity: 5.95 GB</div>

      <div className="mb-2 flex items-center gap-1">
        <span className="inline-block h-[12px] w-[12px] border border-black bg-[#c0c0c0]" />
        <span>Used: 755 MB</span>
      </div>

      <div className="flex items-center gap-1">
        <span className="inline-block h-[12px] w-[12px] border border-black bg-white" />
        <span>Free: 5335.04 MB</span>
      </div>

      <DiskChart />
    </div>
  );
}
