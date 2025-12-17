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
  const windowItem = useAppSelector((state) =>
    state.windows.windows.find((w) => w.id === folder.id)
  );

  return (
    <div className="size-full min-h-[500px] crt">
      <div className="border-[1px] border-[#808080] flex flex-col h-full flex-1">
        <FolderContentHeader folder={folder} />

        <div
          className={cn(
            "flex h-full bg-[url('/folder-background.jpg')] bg-contain m-[2px]",
            isFileOpen && "bg-white"
          )}
        >
          <FolderContentLeft folder={folder} />

          <div
            className={cn(
              "w-2/3 h-full bg-gradient-to-r from-transparent via-white to-white",
              isFileOpen && "w-full",
              windowItem?.isMaximized && "w-full"
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
