import Image from "next/image";
import { Button } from "../../ui/button";

interface IEInternalNavigationProps {
  canBack: boolean;
  canForward: boolean;
  loading: boolean;
  onBack: () => void;
  onForward: () => void;
  onStop: () => void;
  onRefresh: () => void;
  onHome: () => void;
}

export default function IEInternalNavigation({
  canBack,
  canForward,
  loading,
  onBack,
  onForward,
  onStop,
  onRefresh,
  onHome,
}: IEInternalNavigationProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        className="w-20 flex flex-col px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
        disabled={!canBack}
        onClick={onBack}
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
        disabled={!canForward}
        onClick={onForward}
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

      <Button
        variant="ghost"
        className="w-20 flex flex-col px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
        disabled={!loading}
        onClick={onStop}
      >
        <Image
          width={24}
          height={24}
          alt="Stop"
          src="/icons/x.png"
          className="w-6 h-auto"
        />
        <span className="text-xs">Stop</span>
      </Button>

      <Button
        variant="ghost"
        className="w-20 flex flex-col px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
        onClick={onRefresh}
      >
        <Image
          width={24}
          height={24}
          alt="Refresh"
          src="/icons/refresh.png"
          className="w-6 h-auto"
        />
        <span className="text-xs">Refresh</span>
      </Button>

      <Button
        variant="ghost"
        className="w-20 flex flex-col px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
        onClick={onHome}
      >
        <Image
          width={24}
          height={24}
          alt="Home"
          src="/icons/homepage.png"
          className="w-6 h-auto"
        />
        <span className="text-xs">Home</span>
      </Button>
    </div>
  );
}
