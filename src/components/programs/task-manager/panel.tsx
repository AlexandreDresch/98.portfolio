import { cn } from "@/lib/utils";

export function Panel({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <fieldset
      className={cn(
        "border border-[#808080] border-r-white border-b-white px-2 pb-2 pt-1",
        className,
      )}
      style={{ borderStyle: "solid" }}
    >
      <legend className="text-[11px] px-1">{label}</legend>
      {children}
    </fieldset>
  );
}
