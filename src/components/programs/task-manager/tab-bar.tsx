import { cn } from "@/lib/utils";
import { Tab } from "./types";

export function TabBar({
  tabs,
  active,
  onChange,
}: {
  tabs: Tab[];
  active: Tab;
  onChange: (t: Tab) => void;
}) {
  return (
    <div className="flex border-b border-[#808080] px-1 pt-1 gap-0.5">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            "px-3 py-0.5 text-[12px] cursor-default border border-b-0 relative -mb-px",
            tab === active
              ? "bg-[#c0c0c0] crt border-t-white border-l-white border-r-[#808080] z-10"
              : "bg-[#b0b0b0] border-t-[#d0d0d0] border-l-[#d0d0d0] border-r-[#808080] top-px",
          )}
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
