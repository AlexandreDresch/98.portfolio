import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import Image from "next/image";

interface TooltipLinkProps {
  image: string;
  link: string;
  tooltip: string;
}

export default function TooltipLink({
  image,
  link,
  tooltip,
}: TooltipLinkProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={link} target="_blank">
            <Image
              width={100}
              height={100}
              quality={100}
              alt={tooltip}
              src={image}
              className="w-8 h-auto"
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <span>{tooltip}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
