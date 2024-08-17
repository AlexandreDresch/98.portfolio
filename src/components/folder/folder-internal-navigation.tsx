import Image from "next/image";
import { Button } from "../ui/button";

export default function FolderInternalNavigation() {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        className="w-20 flex flex-col px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
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
