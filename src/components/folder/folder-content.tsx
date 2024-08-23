import { FolderContentProps } from "@/types";
import FolderContentHeader from "./folder-content-header";
import FolderContentLeft from "./folder-content-left";
import FolderFooterMessage from "./folder-footer-message";
import { useAppSelector } from "@/store/store";
import { cn } from "@/lib/utils";

export default function FolderContent({
  folder,
  children,
}: FolderContentProps) {
  const { isFileOpen } = useAppSelector((state) => state.folders);

  return (
    <div className="size-full min-h-[500px] crt">
      <div className="border-[1px] border-[#808080] flex flex-col min-h-max flex-1 mt-[-15px]">
        <FolderContentHeader folder={folder} />

        <div
          className={cn(
            "flex min-h-[450px] bg-[url('/folder-background.jpg')] bg-contain m-[2px]",
            isFileOpen && "bg-white"
          )}
        >
          <FolderContentLeft folder={folder} />

          <div
            className={cn(
              "w-2/3 h-full bg-gradient-to-r from-transparent via-white to-white",
              isFileOpen && "w-full"
            )}
          >
            {children}
          </div>
        </div>

        <FolderFooterMessage folderName={folder.name} icon={folder.image} />
      </div>
    </div>
  );
}
