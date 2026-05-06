import { JSX } from "react";
import { Tool } from "./types";

export const ICONS: Record<Tool, () => JSX.Element> = {
  freeselect: () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <path
        d="M10 2C6 3 2 6 2 10C2 14 6 18 10 18C14 18 18 14 18 10C18 6 14 3 10 2Z"
        fill="none"
        stroke="#000"
        strokeWidth="1.2"
        strokeDasharray="2 1.5"
      />
    </svg>
  ),
  select: () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <rect
        x="3"
        y="3"
        width="14"
        height="14"
        fill="none"
        stroke="#000"
        strokeWidth="1.2"
        strokeDasharray="3 2"
      />
      {[
        [2, 2],
        [8.5, 2],
        [15, 2],
        [2, 8.5],
        [15, 8.5],
        [2, 15],
        [8.5, 15],
        [15, 15],
      ].map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="3"
          height="3"
          fill="white"
          stroke="#000"
          strokeWidth="0.8"
        />
      ))}
    </svg>
  ),
  eraser: () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <rect
        x="2"
        y="10"
        width="16"
        height="8"
        rx="1"
        fill="#FFB6C1"
        stroke="#888"
        strokeWidth="1"
      />
      <rect x="2" y="10" width="8" height="8" rx="1" fill="#ddd" />
      <line x1="10" y1="10" x2="10" y2="18" stroke="#888" strokeWidth="0.5" />
    </svg>
  ),
  fill: () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <path
        d="M4 17L8 5L11 8L15 4L17 10L13 14L10 17Z"
        fill="white"
        stroke="#000"
        strokeWidth="1"
      />
      <path d="M4 17L7 19Q3 21 2 18Q1 15 4 14Z" fill="#0000CC" />
      <circle
        cx="15"
        cy="15"
        r="3"
        fill="#FF0000"
        stroke="#000"
        strokeWidth="0.8"
      />
    </svg>
  ),
  eyedropper: () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <path
        d="M14 3L17 6L8 15L5 12Z"
        fill="#e0e0e0"
        stroke="#000"
        strokeWidth="1"
      />
      <path d="M5 12L3 16L4 18L7 18L8 15Z" fill="#888" />
      <circle cx="5" cy="17" r="1.5" fill="#FF0000" />
    </svg>
  ),
  magnifier: () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <circle
        cx="9"
        cy="9"
        r="5"
        fill="white"
        stroke="#000"
        strokeWidth="1.5"
      />
      <line
        x1="13"
        y1="13"
        x2="18"
        y2="18"
        stroke="#000"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <text x="6.5" y="12" fontSize="8" fontWeight="bold" fill="#000">
        +
      </text>
    </svg>
  ),
  pencil: () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <path
        d="M4 16L13 5L16 8L7 19Z"
        fill="#FFFF80"
        stroke="#000"
        strokeWidth="0.8"
      />
      <path
        d="M13 5L15 3L17 5L16 8Z"
        fill="#aaa"
        stroke="#000"
        strokeWidth="0.8"
      />
      <path d="M4 16L7 19L5 20Z" fill="#444" />
    </svg>
  ),
  brush: () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <path
        d="M11 2L18 9L10 17L3 12Z"
        fill="#ddd"
        stroke="#000"
        strokeWidth="0.8"
      />
      <path
        d="M3 12L8 17L6 20Q3 22 1 19Q0 16 2 14Z"
        fill="#8B4513"
        stroke="#000"
        strokeWidth="0.8"
      />
    </svg>
  ),
  airbrush: () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <rect
        x="1"
        y="9"
        width="11"
        height="8"
        rx="2"
        fill="#aaa"
        stroke="#000"
        strokeWidth="0.8"
      />
      <rect
        x="10"
        y="11"
        width="5"
        height="4"
        rx="1"
        fill="#ccc"
        stroke="#000"
        strokeWidth="0.5"
      />
      <circle
        cx="15"
        cy="5"
        r="2"
        fill="#aaa"
        stroke="#000"
        strokeWidth="0.8"
      />
      <line x1="13" y1="6" x2="11" y2="11" stroke="#000" strokeWidth="0.8" />
      <circle cx="17" cy="2" r="0.8" fill="#555" />
      <circle cx="18" cy="6" r="0.8" fill="#555" />
      <circle cx="16" cy="1" r="0.8" fill="#555" />
    </svg>
  ),
  text: () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <text
        x="2"
        y="17"
        fontSize="17"
        fontWeight="bold"
        fontFamily="Times New Roman,serif"
        fill="#000"
      >
        A
      </text>
    </svg>
  ),
  line: () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <line x1="2" y1="18" x2="18" y2="2" stroke="#000" strokeWidth="2" />
    </svg>
  ),
  curve: () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <path
        d="M2 17C5 4 15 4 18 17"
        fill="none"
        stroke="#000"
        strokeWidth="2"
      />
    </svg>
  ),
  rect: () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <rect
        x="2"
        y="4"
        width="16"
        height="12"
        fill="none"
        stroke="#000"
        strokeWidth="1.5"
      />
    </svg>
  ),
  polygon: () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <polygon
        points="10,2 18,8 15,17 5,17 2,8"
        fill="none"
        stroke="#000"
        strokeWidth="1.5"
      />
    </svg>
  ),
  ellipse: () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <ellipse
        cx="10"
        cy="10"
        rx="8"
        ry="6"
        fill="none"
        stroke="#000"
        strokeWidth="1.5"
      />
    </svg>
  ),
  roundrect: () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <rect
        x="2"
        y="4"
        width="16"
        height="12"
        rx="4"
        fill="none"
        stroke="#000"
        strokeWidth="1.5"
      />
    </svg>
  ),
};

export const PALETTE = [
  "#000000",
  "#808080",
  "#800000",
  "#808000",
  "#008000",
  "#008080",
  "#000080",
  "#800080",
  "#C0C0C0",
  "#FFFFFF",
  "#FF0000",
  "#FFFF00",
  "#00FF00",
  "#00FFFF",
  "#0000FF",
  "#FF00FF",
  "#FF8040",
  "#804000",
  "#808040",
  "#004040",
  "#004080",
  "#8080FF",
  "#FF8080",
  "#80FF80",
  "#FFFF80",
  "#80FFFF",
  "#FF0080",
  "#FF4040",
] as const;

export const CANVAS_W = 540,
  CANVAS_H = 390;

export const TOOL_ROWS: Tool[][] = [
  ["freeselect", "select"],
  ["eraser", "fill"],
  ["eyedropper", "magnifier"],
  ["pencil", "brush"],
  ["airbrush", "text"],
  ["line", "curve"],
  ["rect", "polygon"],
  ["ellipse", "roundrect"],
];

export const TOOL_LABELS: Record<Tool, string> = {
  freeselect: "Free Select",
  select: "Select",
  eraser: "Eraser",
  fill: "Fill With Color",
  eyedropper: "Pick Color",
  magnifier: "Magnifier",
  pencil: "Pencil",
  brush: "Brush",
  airbrush: "Airbrush",
  text: "Text",
  line: "Line",
  curve: "Curve",
  rect: "Rectangle",
  polygon: "Polygon",
  ellipse: "Ellipse",
  roundrect: "Rounded Rectangle",
};

export const SHAPE_TOOLS: Tool[] = ["rect", "ellipse", "roundrect", "polygon"];
export const LINE_TOOLS: Tool[] = [
  "pencil",
  "brush",
  "eraser",
  "airbrush",
  "line",
  "curve",
  ...SHAPE_TOOLS,
];
export const PREVIEW_TOOLS: Tool[] = [
  "line",
  "rect",
  "ellipse",
  "roundrect",
  "select",
  "freeselect",
];

export const menuMessages = [
  { name: "File", message: "File operations" },
  { name: "Edit", message: "Edit operations" },
  { name: "View", message: "View options" },
  { name: "Image", message: "Image manipulations" },
  { name: "Colors", message: "Color options" },
  { name: "Help", message: "Help and about" },
  { name: "New", message: "Creates a new document" },
  { name: "Save", message: "Saves the current image" },
  { name: "Exit", message: "Exits Paint" },
  { name: "Undo", message: "Undoes the last action" },
  { name: "Redo", message: "Redoes the last undone action" },
  { name: "SelectAll", message: "Selects the entire canvas" },
  { name: "ClearSelection", message: "Clears the current selection" },
  { name: "ZoomIn", message: "Zooms in for more detail" },
  { name: "ZoomOut", message: "Zooms out to see more" },
  { name: "NormalSize", message: "Returns to normal 1x zoom" },
  { name: "ShowGrid", message: "Toggles the grid overlay" },
  { name: "FlipHorizontal", message: "Flips the image horizontally" },
  { name: "FlipVertical", message: "Flips the image vertically" },
  { name: "Rotate90", message: "Rotates the image 90 degrees" },
  { name: "InvertColors", message: "Inverts all colors" },
  { name: "Grayscale", message: "Converts to grayscale" },
  { name: "FillwithForeground", message: "Fills canvas with foreground color" },
  { name: "FillwithBackground", message: "Fills canvas with background color" },
  {
    name: "AboutPaint",
    message: "Displays program information, version number, and copyright",
  },
];
