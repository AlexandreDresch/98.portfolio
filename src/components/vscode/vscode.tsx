import Image from "next/image";
import Draggable from "react-draggable";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { useAppSelector } from "@/store/store";
import FolderHeader from "../folder/folder-header";
import { Folder } from "@/types";

export default function VSCode() {
  const { selectedFile } = useAppSelector((state) => state.folders);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex flex-col items-center cursor-pointer gap-1 mt-3"
        >
          <Image
            src="/icons/vscode.png"
            alt="VSCode Editor Icon"
            width={38}
            height={38}
          />

          <span className="font-normal text-sm">{selectedFile?.name}</span>
        </Button>
      </DialogTrigger>
      <Draggable handle=".dragger1">
        <DialogContent className="border-[1px] border-solid border-black border-t-white border-l-white bg-[#C0C0C0] p-[1px]">
          <>
            <FolderHeader
              folder={
                { id: 99, name: "VSCode", image: "/icons/vscode.png" } as Folder
              }
            />
            <div className="size-full min-h-[500px] crt">
              <iframe
                src="https://github1s.com/AlexandreDresch/98.portfolio/tree/main/src"
                title="VsCode"
                className="size-full"
              ></iframe>
            </div>
          </>
        </DialogContent>
      </Draggable>
    </Dialog>
  );
}
