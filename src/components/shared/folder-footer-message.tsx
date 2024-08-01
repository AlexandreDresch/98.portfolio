import { useAppSelector } from "@/store/store";
import { FolderFooterMessageProps } from "@/types";
import Image from "next/image";

export default function FolderFooterMessage({
  folderName,
  icon,
}: FolderFooterMessageProps) {
  const footerMessage = useAppSelector((state) => state.footerMessage.message);

  return (
    <div className="w-auto h-5 ml-[2px] bg-[#C0C0C0] flex items-center gap-1">
      <Image
        width={100}
        height={100}
        quality={100}
        alt={folderName}
        src={icon}
        className="w-4 h-auto"
      />

      <span className="text-xs">{footerMessage}</span>
    </div>
  );
}
