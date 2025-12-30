"use client";

import type { WindowItem, Folder } from "@/types";
import MarkdownViewer from "../folder/markdown-viewer";
import PdfViewer from "../folder/pdf-viewer";
import ProgramsContainer from "../folder/programs-container";

export default function WindowContentRouter({
  window,
}: {
  window: WindowItem;
}) {
  if (window.type === "program") {
    return <ProgramsContainer programs={[window]} />;
  }

  const folder = window as Folder;

  if (folder.isDocument && folder.documentType && folder.documentPath) {
    if (folder.documentType === "markdown") {
      return <MarkdownViewer documentPath={folder.documentPath} />;
    }

    if (folder.documentType === "pdf") {
      return <PdfViewer documentPath={folder.documentPath} />;
    }
  }

  return (
    <div className="w-full h-full p-2 text-xs">
      <p>Contents of {folder.name}</p>
    </div>
  );
}
