import Image from "next/image";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import FolderNavigationMenu from "../shared/folder-navigation-menu";
import PdfViewer from "./pdf-viewer";
import Link from "next/link";
import MarkdownViewer from "./markdown-viewer";
import { DocumentViewerProps } from "@/types";
import FolderFooterMessage from "../shared/folder-footer-message";

export default function DocumentViewer({
  documentType,
  documentPath,
  folderName,
  icon,
}: DocumentViewerProps) {

  return (
    <div className="crt w-full">
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
        <div className="flex h-[calc(100vh_-_438px)] m-[2px]">
          <div className="w-full bg-white">
            {documentType === "pdf" ? (
              <PdfViewer documentPath={documentPath} />
            ) : (
              <MarkdownViewer documentPath={documentPath} />
            )}
          </div>
        </div>

        <FolderFooterMessage folderName={folderName} icon={icon} />
      </div>
    </div>
  );
}
