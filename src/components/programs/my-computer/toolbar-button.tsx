import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function ToolbarButton({
  label,
  icon,
  disabled,
  onClick,
}: {
  label: string;
  icon: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      disabled={disabled}
      title={label}
      onClick={onClick}
      className={cn(
        "bg-transparent hover:bg-transparent rounded-none group flex h-[35px] min-w-[38px] flex-col items-center justify-center gap-[1px] border border-transparent px-[3px]",
        "hover:border-white hover:border-r-[#808080] hover:border-b-[#808080]",
        "active:border-[#808080] active:border-t-black active:border-l-black",
        disabled && "opacity-40",
      )}
    >
      <Image
        src={icon}
        alt={label}
        width={18}
        height={18}
        className="flex items-center justify-center object-fit [image-rendering:pixelated]"
        draggable={false}
      />
    </Button>
  );
}
