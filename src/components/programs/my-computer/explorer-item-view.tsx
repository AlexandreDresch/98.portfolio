import { cn } from "@/lib/utils";
import Image from "next/image";
import { ExplorerItem, ViewMode } from "./types";

interface ExplorerItemViewProps {
  item: ExplorerItem;
  selected: boolean;
  viewMode: ViewMode;
  onSelect: () => void;
  onOpen: () => void;
}

export function ExplorerItemView({
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
          alt={item.name}
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
          alt={item.name}
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
          alt={item.name}
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
