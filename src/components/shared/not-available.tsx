import Image from "next/image";

export default function NotAvailable({ message }: { message: string }) {
  return (
    <div className="flex size-full justify-center items-center flex-col space-y-2">
      <Image
        src="/images/98-computer.gif"
        width={300}
        height={300}
        alt="Dead Computer Gif"
      />
      <p className="font-semibold">{message}</p>
    </div>
  );
}
