import { useAppSelector } from "@/store/store";
import { FolderFooterMessageProps } from "@/types";
import Image from "next/image";

export default function FolderFooterMessage({
  folderName,
  icon,
}: FolderFooterMessageProps) {
  const footerMessage = useAppSelector((state) => state.footerMessage.message);
  const { selectedFile, isFileOpen } = useAppSelector((state) => state.folders);

  return (
    <div className="flex-none shrink-0 h-5 px-1 bg-[#C0C0C0] flex items-center gap-1 box-border overflow-hidden">
      <Image
        width={16}
        height={16}
        alt={selectedFile && isFileOpen ? selectedFile.name : folderName}
        src={
          selectedFile && isFileOpen
            ? selectedFile.type === "BACKEND"
              ? "/icons/backend-icon.png"
              : "/icons/frontend-icon.png"
            : icon
        }
        className="w-4 h-4 flex-none"
      />

      <span className="text-xs leading-none whitespace-nowrap">
        {footerMessage}
      </span>
    </div>
  );
}
