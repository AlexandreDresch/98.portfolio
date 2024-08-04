"use client";

import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import HourglassLoading from "../shared/hourglass-loading";
import { ScrollArea } from "../ui/scroll-area";
import { fetchReadme } from "@/services/README-api";
import "github-markdown-css/github-markdown-light.css";

export default function MarkdownViewer({
  documentPath,
}: {
  documentPath: string;
}) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const readme = await fetchReadme(documentPath);

        setContent(readme);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [documentPath]);

  if (loading) {
    return (
      <HourglassLoading className="w-full h-full flex justify-center items-center" />
    );
  }
  return (
    <ScrollArea className="w-full h-full px-3 pt-2">
      <Markdown className="markdown-body" remarkPlugins={[remarkGfm]}>
        {content}
      </Markdown>
    </ScrollArea>
  );
}
