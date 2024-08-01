"use client";

import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import HourglassLoading from "../shared/hourglass-loading";

export default function MarkdownViewer({
  documentPath,
}: {
  documentPath: string;
}) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/${documentPath}/main/README.md`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch README file");
        }
        const text = await response.text();
        setContent(text);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReadme();
  }, [documentPath]);

  if (loading) {
    return (
      <HourglassLoading className="w-full h-full flex mt-40 justify-center items-center" />
    );
  }
  return <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>;
}
