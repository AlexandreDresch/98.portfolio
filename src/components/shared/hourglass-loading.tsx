import Image from "next/image";

export default function HourglassLoading({ className }: { className: string }) {
  return (
    <div className={`${className}`}>
      <Image
        width={100}
        height={100}
        alt="Hourglass Loading Gif"
        src="/hourglass-loading.gif"
        quality={100}
        className="w-44 h-auto object-fill"
      />
    </div>
  );
}
