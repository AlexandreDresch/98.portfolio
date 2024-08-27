import Image from "next/image";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { closeFile, reOpenFile } from "@/store/folders-slice";

export default function FolderInternalNavigation() {
  const dispatch = useAppDispatch();
  const { isFileOpen, lastFileOpened, selectedFile } = useAppSelector(
    (state) => state.folders
  );

  const handleReOpenProject = () => {
    dispatch(reOpenFile());
  };

  const handleCloseProject = () => {
    dispatch(closeFile());
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        className="w-20 flex flex-col px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
        disabled={!isFileOpen || selectedFile === null}
        onClick={handleCloseProject}
      >
        <Image
          width={0}
          height={0}
          alt="Go back"
          src="/arrow-left.svg"
          className="w-6 h-auto"
        />
        <span className="text-xs">Back</span>
      </Button>

      <Button
        variant="ghost"
        className="w-20 flex flex-col px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
        disabled={
          isFileOpen || lastFileOpened === null || selectedFile === null
        }
        onClick={handleReOpenProject}
      >
        <Image
          width={0}
          height={0}
          alt="Go forward"
          src="/arrow-right.svg"
          className="w-6 h-auto"
        />
        <span className="text-xs">Forward</span>
      </Button>
    </div>
  );
}
