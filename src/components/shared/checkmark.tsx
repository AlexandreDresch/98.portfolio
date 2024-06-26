import { cn } from "@/lib/utils";

interface CheckmarkProps {
  className?: string;
}

export default function Checkmark({ className }: CheckmarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="7"
      height="7"
      fill="none"
      viewBox="0 0 7 7"
      className={cn("w-2 fill-[#0A0A0A]", className)}
    >
      <path
        fillRule="evenodd"
        d="M7 0H6v1H5v1H4v1H3v1H2V3H1V2H0v3h1v1h1v1h1V6h1V5h1V4h1V3h1V0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
