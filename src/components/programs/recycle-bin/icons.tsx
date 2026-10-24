import Image from "next/image";
import { TrashItem } from "./types";
import { ICON_COLORS } from "./constants";

export function FileIconSmall({
  ext,
  selected,
}: {
  ext: TrashItem["ext"];
  selected: boolean;
}) {
  const colors = ICON_COLORS;
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" className="flex-shrink-0">
      <rect
        x="1"
        y="1"
        width="11"
        height="16"
        rx="1"
        fill={selected ? "#6688ff" : colors[ext]}
        stroke={selected ? "#fff" : "#808080"}
        strokeWidth="1"
      />
      <path d="M10 1 L15 6 L10 6 Z" fill={selected ? "#fff" : "#808080"} />
      <text
        x="6"
        y="14"
        textAnchor="middle"
        fontSize="4"
        fill={selected ? "#fff" : "#444"}
        fontFamily="monospace"
        fontWeight="bold"
      >
        {ext.toUpperCase().slice(0, 3)}
      </text>
    </svg>
  );
}

export function BinIcon({ full }: { full: boolean }) {
  return (
    <div className="flex items-center justify-center">
      {full ? (
        <Image
          src="/icons/recycle-bin-full.png"
          alt="Recycle Bin Full"
          width={48}
          height={48}
        />
      ) : (
        <Image
          src="/icons/recycle-bin-empty.png"
          alt="Recycle Bin Empty"
          width={48}
          height={48}
        />
      )}
    </div>
  );
}

export function FileIconBig({
  ext,
  selected,
  item,
}: {
  ext: TrashItem["ext"];
  selected: boolean;
  item: TrashItem;
}) {
  const colors = ICON_COLORS;
  return (
    <svg width="32" height="36" viewBox="0 0 16 18">
      <rect
        x="1"
        y="1"
        width="11"
        height="16"
        rx="1"
        fill={selected ? "#6688ff" : colors[ext]}
        stroke={selected ? "#fff" : "#808080"}
        strokeWidth="1"
      />
      <path d="M10 1 L15 6 L10 6 Z" fill={selected ? "#fff" : "#808080"} />
      <text
        x="6"
        y="14"
        textAnchor="middle"
        fontSize="4"
        fill={selected ? "#fff" : "#444"}
        fontFamily="monospace"
        fontWeight="bold"
      >
        {item.ext.toUpperCase().slice(0, 3)}
      </text>
    </svg>
  );
}
