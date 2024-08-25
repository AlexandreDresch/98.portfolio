import Image from "next/image";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  clearSelectedFile,
  closeFolder,
  minimizeFolder,
} from "@/store/folders-slice";
import { Separator } from "../ui/separator";
import FolderNavigationMenu from "../folder/folder-navigation-menu";

export default function ImageViewerContentHeader() {
  const dispatch = useAppDispatch();

  const { selectedFile, isFileOpen } = useAppSelector((state) => state.folders);

  function handleClose() {
    dispatch(clearSelectedFile());
    //dispatch(closeFolder(folder.id));
  }

  function handleMinimize() {
    //dispatch(minimizeFolder(folder.id));
  }
  return (
    <div className="h-7 flex items-center px-[2px] border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] gap-1">
      <Separator
        orientation="vertical"
        className="bg-[#C0C0C0] h-5 w-1 border-l-[1px] border-l-white border-r-[1px] border-r-[#808080]"
      />

      <FolderNavigationMenu />
    </div>
  );
}
