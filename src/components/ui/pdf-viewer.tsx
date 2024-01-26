"use client";

import { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "./separator";
import HourglassLoading from "./hourglass-loading";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function PdfViewer({ documentPath }: { documentPath: string }) {
  const [numPages, setNumPages] = useState<number>();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <ScrollArea className="w-full h-full bg-white">
      <Document
        file={documentPath}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <HourglassLoading className="w-full h-full flex mt-40 justify-center items-center" />
        }
        noData={"Page not found."}
      >
        {(Array.apply(null, Array(numPages)) as number[])
          .map((_, i: number) => i + 1)
          .map((page: number) => {
            return (
              <div key={page} className="w-full flex flex-col items-center">
                <Page
                  pageNumber={page}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  scale={1.49}
                />
                {page === 1 && <Separator className="h-2" />}
              </div>
            );
          })}
      </Document>
    </ScrollArea>
  );
}
