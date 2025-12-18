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
    <div className="flex flex-1 min-h-0 w-full min-w-0 crt">
      <div className="flex flex-col flex-1 min-h-0 border border-[#808080] box-border">
        <div className="flex-none shrink-0">
          <FolderContentHeader folder={folder} />
        </div>

        <div
          className={cn(
            "flex flex-1 min-h-0 bg-[url('/folder-background.jpg')] bg-contain p-[2px] box-border",
            isFileOpen && "bg-white"
          )}
        >
          <FolderContentLeft folder={folder} />

          <div
            className={cn(
              "flex flex-1 min-h-0 bg-gradient-to-r from-transparent via-white to-white",
              isFileOpen && "w-full",
              windowItem?.isMaximized && "w-full"
            )}
          >
            {children}
          </div>
        </div>

        <div className="flex-none shrink-0">
          <FolderFooterMessage folderName={folder.name} icon={folder.image} />
        </div>
      </div>
    </div>
  );
}
