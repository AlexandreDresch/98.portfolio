import { ReactNode } from "react";

export interface Project {
  id: number;
  name: string;
  description: string;
  done: boolean;
  images: string[];
  deployment_url: string | null;
  github_url: string;
  date: string;
  type: "BACKEND" | "FRONTEND";
}

type ProjectStatus = "initial" | "pending" | "fulfilled" | "rejected";

export interface MessageContainerProps {
  status: ProjectStatus;
  message?: string;
  title?: string;
}

export interface ProjectContainerProps {
  projects: Project[];
}

export interface Folder {
  id: number;
  name: string;
  isOpen: boolean;
  image: string;
  isDocument: boolean;
  documentType: "pdf" | "markdown" | null;
  documentPath: string | null;
}

export interface FolderProps {
  folder: Folder;
}

export interface FolderWithChildrenProps extends FolderProps {
  children: ReactNode;
}

export interface ShortcutProps extends FolderWithChildrenProps {}

export interface FolderLayoutProps extends FolderWithChildrenProps {}

export interface FolderHeaderProps extends FolderProps {}

export interface FolderContentProps extends FolderWithChildrenProps {}

export interface FolderContentHeaderProps extends FolderProps {}

export interface FolderContentLeftProps extends FolderProps {}

export interface FolderFooterMessageProps {
  folderName: string;
  icon: string;
}

export interface DocumentViewerProps {
  documentType: "pdf" | "markdown";
  documentPath: string;
  folderName: string;
  icon: string;
}

export interface ImageSliderProps {
  images: string[];
}

export interface ImageMagnifierProps {
  src: string;
  alt: string;
}
