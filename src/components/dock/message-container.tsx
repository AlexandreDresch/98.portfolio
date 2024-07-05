import { MessageContainerProps } from "@/types";
import Image from "next/image";

export default function MessageContainer({ status }: MessageContainerProps) {
  return (
    <div className="w-50 p-2 gap-4 flex flex-col justify-start items-start">
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
          className="w-9"
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

      <p className="p-1 border border-dashed border-gray-400 max-w-40">
        {status === "initial" || status === "pending"
          ? "Loading projects, it could take a while..."
          : status === "fulfilled"
          ? "Projects received successfully."
          : "Something went wrong!"}
      </p>
    </div>
  );
}
