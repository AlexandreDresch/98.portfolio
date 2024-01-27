import Image from "next/image";
import { Button } from "./button";
import { Separator } from "./separator";
import FolderNavigationMenu from "./folder-navigation-menu";
import PdfViewer from "./pdf-viewer";
import Link from "next/link";

interface DocumentViewerProps {
  documentType: "pdf" | "markdown";
  documentPath: string;
  isMaximized: boolean;
}

export default function DocumentViewer({
  documentType,
  documentPath,
  isMaximized,
}: DocumentViewerProps) {
  return (
    <div className="w-full min-h-dvh">
      <div className="border-[1px] border-[#808080] flex flex-col h-auto mt-[-15px]">
        <div className="h-7 flex items-center px-[2px] border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] gap-1">
          <Separator
            orientation="vertical"
            className="bg-[#C0C0C0] h-5 w-1 border-l-[1px] border-l-white border-r-[1px] border-r-[#808080]"
          />

          <FolderNavigationMenu />
        </div>

        <div className="h-14 flex items-center px-[2px] border-t-[1px] border-t-white border-b-[1px] border-b-[#808080] gap-1">
          <Separator
            orientation="vertical"
            className="bg-[#C0C0C0] h-11 w-1 border-l-[1px] border-l-white border-r-[1px] border-r-[#808080]"
          />

          <div className="flex items-center gap-1">
            <Link href={documentPath} target="_blank">
              <Button
                variant="ghost"
                className="w-20 flex flex-col px-1 py-0 h-max rounded-none border-[1px] border-transparent hover:border-black hover:border-t-white hover:border-l-white"
              >
                <Image
                  width={0}
                  height={0}
                  alt="Download Document"
                  src="/download.svg"
                  className="w-6 h-auto"
                />
                <span className="text-xs">Download</span>
              </Button>
            </Link>
          </div>
        </div>
        <div
          className={`flex ${
            isMaximized ? "h-[calc(100vh_-_150px)]" : "h-[calc(100vh_-_438px)]"
          } m-[2px]`}
        >
          <div className="w-full bg-white">
            {documentType === "pdf" ? (
              <PdfViewer documentPath={documentPath} />
            ) : (
              <p>Not available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
