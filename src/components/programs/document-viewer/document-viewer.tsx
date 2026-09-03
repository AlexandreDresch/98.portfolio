"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import WindowWrapper from "@/components/shared/window-wrapper";
import FolderNavigationMenu from "@/components/folder/folder-navigation-menu";
import FolderFooterMessage from "@/components/folder/folder-footer-message";
import PdfViewer from "./pdf-viewer";
import MarkdownViewer from "./markdown-viewer";
import { useAppSelector } from "@/store/store";

export default function DocumentViewer() {
  const { documentPath, documentType, title, folderName, icon } =
    useAppSelector((state) => state.documentViewer);

  return (
    <WindowWrapper
      id={25}
      title={title}
      icon={icon}
      controls={{ close: true, minimize: true, maximize: true }}
      className="!w-[860px]"
    >
      <div className="flex h-full min-h-0 w-full flex-col bg-[#C0C0C0]">
        <div className="flex h-7 flex-shrink-0 items-center gap-1 border-b border-[#808080] border-t-white px-0.5">
          <Separator
            orientation="vertical"
            className="h-5 w-1 border-l border-l-white border-r border-r-[#808080] bg-[#C0C0C0]"
          />
          <FolderNavigationMenu />
        </div>

        <div className="flex h-14 flex-shrink-0 items-center gap-1 border-b border-[#808080] border-t-white px-0.5">
          <Separator
            orientation="vertical"
            className="h-11 w-1 border-l border-l-white border-r border-r-[#808080] bg-[#C0C0C0]"
          />

          <div className="flex items-center gap-1">
            {documentPath && (
              <Link href={documentPath} target="_blank">
                <Button
                  variant="ghost"
                  className="flex h-max w-20 flex-col rounded-none border border-transparent px-1 py-0 hover:border-black hover:border-l-white hover:border-t-white"
                >
                  <Image
                    src="/download.svg"
                    alt="Download Document"
                    width={0}
                    height={0}
                    className="h-auto w-6"
                  />
                  <span className="text-xs">Download</span>
                </Button>
              </Link>
            )}

            {documentPath && (
              <div
                className="ml-2 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest"
                style={{
                  borderColor: "#808080 white white #808080",
                  background: "#fff",
                }}
              >
                {documentType === "pdf" ? "📄 PDF" : "📝 Markdown"}
              </div>
            )}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden">
          {!documentPath ? (
            <div className="flex h-full items-center justify-center bg-white">
              <div className="flex flex-col items-center gap-3 text-center">
                <Image
                  src="/icons/file.png"
                  alt="No document"
                  width={48}
                  height={48}
                  className="opacity-40"
                />
                <p className="text-sm text-[#808080]">No document loaded.</p>
                <p className="text-xs text-[#aaaaaa]">
                  Open a file to view it here.
                </p>
              </div>
            </div>
          ) : documentType === "pdf" ? (
            <PdfViewer documentPath={documentPath} />
          ) : (
            <MarkdownViewer documentPath={documentPath} />
          )}
        </div>

        <FolderFooterMessage folderName={folderName} icon={icon} />
      </div>
    </WindowWrapper>
  );
}
