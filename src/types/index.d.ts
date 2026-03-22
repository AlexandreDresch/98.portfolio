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

export interface Program {
  id: number;
  name: string;
  isOpen: boolean;
  image: string;
  description?: string;
}

export interface ProgramsContainerProps {
  programs: Program[];
}

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
  isMaximized: boolean;
  isMinimized: boolean;
  image: string;
  isDocument: boolean;
  documentType: "pdf" | "markdown" | null;
  isProgram?: boolean;
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

export type WindowHeaderProps = {
  icon: string;
  title: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;

  controls?: {
    close?: boolean;
    minimize?: boolean;
    maximize?: boolean;
  };
};

export interface MenuItemProps {
  label: string;
  disabled?: boolean;
  shortcut?: string;
  handleSetMessage: (event: React.MouseEvent) => void;
}

export interface MenuSubItemProps {
  label: string;
  items: Array<MenuItemProps>;
  handleSetMessage: (event: React.MouseEvent) => void;
}

type MenuItemType = MenuItemProps | MenuSubItemProps;

interface MenuItems {
  [key: string]: MenuItemType[];
}

export interface DropdownProps {
  title: string;
  items: Array<MenuItemProps | MenuSubItemProps>;
  handleSetMessage: (event: React.MouseEvent) => void;
}

export interface WindowNavigationMenuProps {
  menuItems: MenuItemProps | MenuSubItemProps;
  messages?: {
    name: string;
    message: string;
  }[];
}

export interface Program {
  id: number;
  name: string;
  isOpen: boolean;
  isMaximized: boolean;
  isMinimized: boolean;
  image: string;
}

export type WindowItem = (Folder | Program) & {
  type: "folder" | "program";
};

export type WallpaperMode = "fill" | "tile";
export type Language = "en" | "pt" | "es" | "fr";
export type TimeFormat = "12h" | "24h";

export interface SettingsState {
  wallpaper: string;
  wallpaperMode: WallpaperMode;
  language: Language;
  timeFormat: TimeFormat;
  overrideDateTime: string | null;
}

export type WindowWrapperProps = {
  id: number;
  title: string;
  icon: string;
  children: React.ReactNode;

  className?: string;

  controls?: {
    close?: boolean;
    minimize?: boolean;
    maximize?: boolean;
  };
};
