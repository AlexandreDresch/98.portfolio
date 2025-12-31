"use client";

import type { WindowItem, Folder } from "@/types";
import MarkdownViewer from "../folder/markdown-viewer";
import PdfViewer from "../folder/pdf-viewer";
import ProgramsContainer from "../folder/programs-container";
import ProjectContainer from "../folder/project-container";
import { useAppSelector } from "@/store/store";
import NotAvailable from "./not-available";

export default function WindowContentRouter({
  window,
}: {
  window: WindowItem;
}) {
  const { frontend, backend, status } = useAppSelector(
    (state) => state.projects
  );

  if (window.type === "program") {
    return <ProgramsContainer programs={[window]} />;
  }

  const folder = window as Folder;
  console.log(status);

  if (folder.isDocument && folder.documentType && folder.documentPath) {
    if (folder.documentType === "markdown") {
      return <MarkdownViewer documentPath={folder.documentPath} />;
    }

    if (folder.documentType === "pdf") {
      return <PdfViewer documentPath={folder.documentPath} />;
    }
  }

  if (folder.name === "Backend") {
    return <ProjectContainer projects={backend} />;
  }

  if (folder.name === "Frontend") {
    return <ProjectContainer projects={frontend} />;
  }

  return <NotAvailable message="Not available yet." />;
}
