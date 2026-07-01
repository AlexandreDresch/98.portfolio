import { cn } from "@/lib/utils";
import { useState } from "react";

export function ToolbarButton({
  onClick,
  disabled,
  title,
  children,
  wide,
}: {
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <button
      title={title}
      disabled={disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-0.5 px-1 py-0.5 cursor-default select-none min-w-[44px] text-[10px] font-sans",
        wide && "min-w-[56px]",
        disabled
          ? "opacity-40 pointer-events-none"
          : pressed
            ? "border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white bg-[#c0c0c0]"
            : hovered
              ? "border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#c0c0c0]"
              : "border-2 border-transparent bg-[#c0c0c0]",
      )}
    >
      {children}
    </button>
  );
}
