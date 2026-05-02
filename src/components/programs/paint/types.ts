export type Tool =
  | "freeselect"
  | "select"
  | "eraser"
  | "fill"
  | "eyedropper"
  | "magnifier"
  | "pencil"
  | "brush"
  | "airbrush"
  | "text"
  | "line"
  | "curve"
  | "rect"
  | "polygon"
  | "ellipse"
  | "roundrect";

export type FillMode = 0 | 1 | 2;
export type LineWidth = 1 | 2 | 3 | 4;
export type ZoomLevel = number;
export type MenuName = "File" | "Edit" | "View" | "Image" | "Colors" | "Help";

export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface TextState {
  x: number;
  y: number;
  value: string;
}

export interface MenuItem {
  l: string;
  a?: () => void;
  s?: string;
  d?: boolean;
  dis?: boolean;
}

export type MenuItems = Record<MenuName, MenuItem[]>;
