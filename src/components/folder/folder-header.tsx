import Image from "next/image";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  clearSelectedFile,
  closeFolder,
  minimizeFolder,
} from "@/store/folders-slice";
import { FolderHeaderProps } from "@/types";

export default function FolderHeader({ folder }: FolderHeaderProps) {
  const dispatch = useAppDispatch();

  const { selectedFile, isFileOpen } = useAppSelector((state) => state.folders);

  function handleClose() {
    dispatch(clearSelectedFile());
    dispatch(closeFolder(folder.id));
  }

  function handleMinimize() {
    dispatch(minimizeFolder(folder.id));
  }
  return (
    <div className="dragger w-full h-6 relative bg-gradient-to-r mt-0 from-[#010f80] to-[#1084d0]">
      <div className="absolute w-full flex justify-between px-1 top-[2px]">
        <div className="flex gap-1 items-center">
          <Image
            width={16}
            height={16}
            alt={selectedFile && isFileOpen ? selectedFile.name : folder.name}
            src={
              selectedFile && isFileOpen
                ? selectedFile.type === "BACKEND"
                  ? "/icons/backend-icon.png"
                  : "/icons/frontend-icon.png"
                : folder.image
            }
            className="w-4 h-4"
          />
          <span className="text-white text-sm">
            {selectedFile && isFileOpen ? selectedFile.name : folder.name}
          </span>
        </div>

        <div className="flex gap-[3px] items-center">
          <Button
            variant="w98"
            className="bg-[#C0C0C0] w-6 h-5 p-1 pb-0 flex place-items-baseline"
            onClick={handleMinimize}
          >
            <Image
              width={0}
              height={0}
              alt="minimize icon"
              src="/minimize.svg"
              className="w-3 h-auto"
            />
          </Button>

          <Button
            variant="w98"
            className="bg-[#C0C0C0] w-6 h-5 p-1 flex items-center justify-center"
          >
            <Image
              width={0}
              height={0}
              alt="maximize icon"
              src="/maximize.svg"
              className="w-3 h-auto"
            />
          </Button>

          <Button
            variant="w98"
            className="bg-[#C0C0C0] w-6 h-5 p-1 flex items-center justify-center"
            onClick={handleClose}
          >
            <Image
              width={0}
              height={0}
              alt="close icon"
              src="/close.svg"
              className="w-3 h-auto"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
