import { MessageContainerProps } from "@/types";
import Image from "next/image";

export default function MessageContainer({
  status,
  message,
  title,
}: MessageContainerProps) {
  return (
    <div className="w-50 gap-2 flex flex-col justify-start items-start">
      <div className="w-full h-6 gap-2 flex items-center bg-gradient-to-r mt-0 from-[#010f80] to-[#1084d0]">
        {status === "initial" || status === "pending" ? (
          <Image
            width={100}
            height={100}
            alt="Hourglass Loading Gif"
            src="/hourglass-loading.gif"
            quality={100}
            className="w-8"
          />
        ) : status === "fulfilled" ? (
          <Image
            width={100}
            height={100}
            alt="Computer Gif"
            src="/computer.gif"
            quality={100}
            className="w-5"
          />
        ) : (
          <Image
            width={100}
            height={100}
            alt="Error Icon"
            src="/error.png"
            quality={100}
            className="w-[18px] mr-2"
          />
        )}

        <p className="text-white font-semibold">{title}</p>
      </div>

      <div className="p-2">
      <p className="p-1 border border-dashed border-gray-400 max-w-40">
        {message}
      </p>
      </div>
    </div>
  );
}
