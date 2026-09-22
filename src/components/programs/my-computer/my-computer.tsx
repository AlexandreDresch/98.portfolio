"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { openWindow, selectProgram } from "@/store/window-manager-slice";
import WindowWrapper from "@/components/shared/window-wrapper";
import { cn } from "@/lib/utils";

interface MyComputerProps {
  renderTrigger: boolean;
  windowId: number;
}

type ItemType = "drive" | "folder";

type ExplorerItem = {
  id: string;
  name: string;
  type: ItemType;
  icon: string;
  description?: string;
  capacity?: string;
  free?: string;
  used?: string;
};

type ViewMode = "icons" | "list" | "details";

const items: ExplorerItem[] = [
  {
    id: "a",
    name: "3½ Floppy (A:)",
    type: "drive",
    icon: "/icons/floppy-drive.png",
    description: "3½-inch floppy disk",
  },
  {
    id: "c",
    name: "Main hd (C:)",
    type: "drive",
    icon: "/icons/hard-drive.png",
    description: "Local Disk",
    capacity: "5.95 GB",
    used: "755 MB",
    free: "5.21 GB",
  },
  {
    id: "d",
    name: "(D:)",
    type: "drive",
    icon: "/icons/cd-drive.png",
    description: "CD Drive",
  },
  {
    id: "printers",
    name: "Printers",
    type: "folder",
    icon: "/icons/printer.png",
    description: "System printers",
  },
  {
    id: "dial-up",
    name: "Dial-Up Networking",
    type: "folder",
    icon: "/icons/network.png",
    description: "Dial-Up Networking",
  },
  {
    id: "scheduled",
    name: "Scheduled Tasks",
    type: "folder",
    icon: "/icons/scheduled-tasks.png",
    description: "Scheduled tasks",
  },
  {
    id: "web",
    name: "Web Folders",
    type: "folder",
    icon: "/icons/web-folders.png",
    description: "Web folders",
  },
  {
    id: "removable",
    name: "Removable Disk (E:)",
    type: "drive",
    icon: "/icons/removable-disk.png",
    description: "Removable disk",
  },
];

const menuItems = {
  File: [
    "Open",
    "Explore",
    "Create Shortcut",
    "Delete",
    "Rename",
    "Properties",
  ],
  Edit: ["Undo", "Cut", "Copy", "Paste", "Select All"],
  View: ["Large Icons", "Small Icons", "List", "Details"],
  Go: ["Back", "Forward", "Up One Level", "Home"],
  Favorites: ["Add to Favorites", "Organize Favorites"],
  Help: ["Help Topics", "About My Computer"],
};

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
    () => items.find((item) => item.id === selectedId),
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

    const foundItem = items.find(
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
        setSelectedId(items[0]?.id ?? null);
        break;

      case "About My Computer":
        window.alert(
          "My Computer\n\nWindows 98 Portfolio Edition\n\n© 1998 Microsoft Corporation",
        );
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
        icon="/icons/my-computer.png"
        crtEffect={false}
        className="overflow-hidden"
      >
        <div
          className="flex min-h-0 flex-1 flex-col bg-[#c0c0c0] text-[12px] text-black select-none"
          onClick={() => setOpenMenu(null)}
        >
          {/* MENU BAR */}
          <div
            className="relative flex h-[23px] shrink-0 items-center border-b border-[#808080] bg-[#c0c0c0]"
            onClick={(event) => event.stopPropagation()}
          >
            {Object.keys(menuItems).map((menu) => (
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
                    className="absolute left-0 top-[21px] z-[1000] min-w-[170px] border border-black bg-[#c0c0c0] p-[2px] shadow-[2px_2px_0_#000]"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {menuItems[menu as keyof typeof menuItems].map((action) => (
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
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* TOOLBAR */}
          <div className="shrink-0 border-b border-[#808080] bg-[#c0c0c0]">
            <div className="flex h-[39px] items-center gap-[2px] px-[5px]">
              <ToolbarButton
                label="Back"
                disabled={!canGoBack}
                icon={<BackIcon />}
                onClick={goBack}
              />

              <ToolbarButton
                label="Forward"
                disabled={!canGoForward}
                icon={<ForwardIcon />}
                onClick={goForward}
              />

              <ToolbarSeparator />

              <ToolbarButton
                label="Up"
                disabled={currentPath === "My Computer"}
                icon={<UpIcon />}
                onClick={goUp}
              />

              <ToolbarSeparator />

              <ToolbarButton
                label="Cut"
                icon={<ScissorsIcon />}
                onClick={() => handleMenuAction("Cut")}
              />

              <ToolbarButton
                label="Copy"
                icon={<CopyIcon />}
                onClick={() => handleMenuAction("Copy")}
              />

              <ToolbarButton
                label="Paste"
                icon={<PasteIcon />}
                onClick={() => handleMenuAction("Paste")}
              />

              <ToolbarSeparator />

              <ToolbarButton
                label="Undo"
                icon={<UndoIcon />}
                onClick={() => handleMenuAction("Undo")}
              />

              <ToolbarButton
                label="Delete"
                icon={<DeleteIcon />}
                onClick={() => handleMenuAction("Delete")}
              />

              <ToolbarSeparator />

              <ToolbarButton
                label="Properties"
                icon={<PropertiesIcon />}
                onClick={() => handleMenuAction("Properties")}
              />

              <ToolbarSeparator />

              <ToolbarButton
                label="Views"
                icon={<ViewIcon />}
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

          {/* ADDRESS BAR */}
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

          {/* CONTENT */}
          <div className="relative flex min-h-0 flex-1 overflow-auto bg-white">
            {currentPath === "My Computer" ? (
              <div className="flex min-h-full w-full flex-col">
                <div className="flex min-h-0 flex-1">
                  {/* LEFT INFO PANEL */}
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

                  {/* ITEMS */}
                  <main
                    className={cn(
                      "min-w-0 flex-1 p-[8px]",
                      viewMode === "icons"
                        ? "grid content-start grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-x-4 gap-y-3"
                        : "flex flex-col gap-0",
                    )}
                  >
                    {items.map((item) => (
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
              <FolderView path={currentPath} onBack={goBack} onUp={goUp} />
            )}
          </div>

          {/* STATUS BAR */}
          <div className="flex h-[21px] shrink-0 items-center border-t border-[#808080] bg-[#c0c0c0] px-[2px]">
            <div className="flex h-[17px] min-w-0 flex-1 items-center border border-[#808080] border-t-black border-l-black bg-[#c0c0c0] px-[5px]">
              {selectedItem
                ? selectedItem.description || selectedItem.name
                : currentPath === "My Computer"
                  ? `${items.length} object${items.length === 1 ? "" : "s"}`
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

interface ExplorerItemViewProps {
  item: ExplorerItem;
  selected: boolean;
  viewMode: ViewMode;
  onSelect: () => void;
  onOpen: () => void;
}

function ExplorerItemView({
  item,
  selected,
  viewMode,
  onSelect,
  onOpen,
}: ExplorerItemViewProps) {
  if (viewMode === "details") {
    return (
      <button
        type="button"
        className={cn(
          "grid w-full grid-cols-[32px_minmax(180px,1fr)_100px_140px] items-center border-b border-[#e0e0e0] px-2 py-1 text-left",
          selected && "bg-[#000080] text-white",
        )}
        onClick={onSelect}
        onDoubleClick={onOpen}
      >
        <Image
          src={item.icon}
          alt=""
          width={24}
          height={24}
          draggable={false}
        />

        <span>{item.name}</span>

        <span>{item.type === "drive" ? "Drive" : "Folder"}</span>

        <span>{item.capacity || ""}</span>
      </button>
    );
  }

  if (viewMode === "list") {
    return (
      <button
        type="button"
        className={cn(
          "flex w-full items-center gap-2 px-2 py-[2px] text-left",
          selected && "bg-[#000080] text-white",
        )}
        onClick={onSelect}
        onDoubleClick={onOpen}
      >
        <Image
          src={item.icon}
          alt=""
          width={24}
          height={24}
          draggable={false}
        />

        <span>{item.name}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={cn(
        "flex min-h-[75px] flex-col items-center justify-start gap-[3px] px-1 py-1 text-center",
        "outline-none",
      )}
      onClick={onSelect}
      onDoubleClick={onOpen}
    >
      <div
        className={cn(
          "flex h-[40px] w-[48px] items-center justify-center",
          selected && "bg-[#000080]",
        )}
      >
        <Image
          src={item.icon}
          alt=""
          width={36}
          height={36}
          draggable={false}
          className={cn(selected && "brightness-150")}
        />
      </div>

      <span
        className={cn(
          "max-w-[90px] break-words px-1 leading-[13px]",
          selected && "bg-[#000080] text-white",
        )}
      >
        {item.name}
      </span>
    </button>
  );
}

function FolderView({
  path,
  onBack,
  onUp,
}: {
  path: string;
  onBack: () => void;
  onUp: () => void;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 bg-white p-10 text-center">
      <Image
        src="/icons/folder-open.png"
        alt=""
        width={48}
        height={48}
        draggable={false}
      />

      <div className="text-[14px] font-bold">{path}</div>

      <div className="text-[#555]">
        This folder is part of the Windows 98 portfolio.
      </div>

      <div className="flex gap-2">
        <RetroButton onClick={onBack}>Back</RetroButton>
        <RetroButton onClick={onUp}>Up</RetroButton>
      </div>
    </div>
  );
}

function DriveInfo() {
  return (
    <div className="text-[12px]">
      <div className="font-bold">Mainhd (C:)</div>

      <div className="mb-3">Local Disk</div>

      <div className="mb-1">Capacity: 5.95 GB</div>

      <div className="mb-2 flex items-center gap-1">
        <span className="inline-block h-[12px] w-[12px] border border-black bg-[#c0c0c0]" />
        <span>Used: 755 MB</span>
      </div>

      <div className="flex items-center gap-1">
        <span className="inline-block h-[12px] w-[12px] border border-black bg-white" />
        <span>Free: 5.21 GB</span>
      </div>

      <DiskChart />
    </div>
  );
}

function DiskChart() {
  return (
    <div className="relative mx-auto mt-5 h-[62px] w-[105px]">
      <div className="absolute left-0 top-0 h-[45px] w-[100px] rounded-[50%] border border-black bg-white" />

      <div className="absolute left-0 top-[20px] h-[35px] w-[100px] rounded-[50%] border border-black bg-[#c0c0c0]" />

      <div className="absolute left-0 top-[20px] h-[1px] w-[100px] origin-left rotate-[18deg] bg-black" />

      <div className="absolute left-[49px] top-[5px] h-[20px] w-[1px] bg-black" />
    </div>
  );
}

function ToolbarButton({
  label,
  icon,
  disabled,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      title={label}
      onClick={onClick}
      className={cn(
        "group flex h-[35px] min-w-[38px] flex-col items-center justify-center gap-[1px] border border-transparent px-[3px]",
        "hover:border-white hover:border-r-[#808080] hover:border-b-[#808080]",
        "active:border-[#808080] active:border-t-black active:border-l-black",
        disabled && "opacity-40",
      )}
    >
      <span className="flex h-[20px] items-center justify-center">{icon}</span>
    </button>
  );
}

function ToolbarSeparator() {
  return (
    <div className="mx-[2px] h-[28px] w-[2px] border-l border-[#808080] border-r-white" />
  );
}

function RetroButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-w-[70px] border border-white border-r-black border-b-black bg-[#c0c0c0] px-3 py-1 active:border-black active:border-r-white active:border-b-white"
    >
      {children}
    </button>
  );
}

function BackIcon() {
  return <span className="text-[24px] leading-none text-[#555]">←</span>;
}

function ForwardIcon() {
  return <span className="text-[24px] leading-none text-[#555]">→</span>;
}

function UpIcon() {
  return (
    <span className="text-[20px] leading-none">
      <span className="block">↑</span>
    </span>
  );
}

function ScissorsIcon() {
  return <span className="text-[19px]">✂</span>;
}

function CopyIcon() {
  return (
    <span className="relative block h-[18px] w-[17px]">
      <span className="absolute left-0 top-[3px] h-[13px] w-[11px] border border-black bg-white" />
      <span className="absolute left-[5px] top-0 h-[13px] w-[11px] border border-black bg-[#c0c0c0]" />
    </span>
  );
}

function PasteIcon() {
  return (
    <span className="relative block h-[18px] w-[17px] border border-black bg-white">
      <span className="absolute left-[3px] top-[-4px] h-[6px] w-[9px] border border-black bg-[#c0c0c0]" />
    </span>
  );
}

function UndoIcon() {
  return <span className="text-[22px] leading-none">↶</span>;
}

function DeleteIcon() {
  return <span className="text-[20px] leading-none">✕</span>;
}

function PropertiesIcon() {
  return (
    <span className="flex h-[18px] w-[18px] items-center justify-center border border-black bg-white text-[11px] font-bold">
      i
    </span>
  );
}

function ViewIcon() {
  return (
    <span className="grid grid-cols-2 gap-[2px]">
      <span className="h-[7px] w-[7px] border border-black bg-white" />
      <span className="h-[7px] w-[7px] border border-black bg-white" />
      <span className="h-[7px] w-[7px] border border-black bg-white" />
      <span className="h-[7px] w-[7px] border border-black bg-white" />
    </span>
  );
}
