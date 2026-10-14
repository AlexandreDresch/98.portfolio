import { ExplorerItem } from "./types";

export const ITEMS: ExplorerItem[] = [
  {
    id: "a",
    name: "3½ Floppy (A:)",
    type: "drive",
    icon: "/icons/floppy-drive.png",
    description: "3½-inch floppy disk",
  },
  {
    id: "c",
    name: "Main hd (C:)",
    type: "drive",
    icon: "/icons/hard-drive.png",
    description: "Local Disk",
    capacity: "5.95 GB",
    used: "755 MB",
    free: "5.21 GB",
  },
  {
    id: "d",
    name: "(D:)",
    type: "drive",
    icon: "/icons/cd-drive.png",
    description: "CD Drive",
  },
  {
    id: "printers",
    name: "Printers",
    type: "folder",
    icon: "/icons/printer.png",
    description: "System printers",
  },
  {
    id: "dial-up",
    name: "Dial-Up Networking",
    type: "folder",
    icon: "/icons/network.png",
    description: "Dial-Up Networking",
  },
  {
    id: "scheduled",
    name: "Scheduled Tasks",
    type: "folder",
    icon: "/icons/scheduled-tasks.png",
    description: "Scheduled tasks",
  },
  {
    id: "web",
    name: "Web Folders",
    type: "folder",
    icon: "/icons/web-folders.png",
    description: "Web folders",
  },
  {
    id: "removable",
    name: "Removable Disk (E:)",
    type: "drive",
    icon: "/icons/removable-disk.png",
    description: "Removable disk",
  },
];

export const MENU_ITEMS = {
  File: [
    "Open",
    "Explore",
    "Create Shortcut",
    "Delete",
    "Rename",
    "Properties",
  ],
  Edit: ["Undo", "Cut", "Copy", "Paste", "Select All"],
  View: ["Large Icons", "List", "Details"],
  Go: ["Back", "Forward", "Up One Level", "Home"],
  Favorites: ["Add to Favorites", "Organize Favorites"],
  Help: ["Help Topics", "About My Computer"],
};

export const NAVIGATION_ACTIONS = [
  { label: "Back", icon: "/arrow-left.svg" },
  { label: "Forward", icon: "/arrow-right.svg" },
  { label: "Up", icon: "/icons/arrow-up.svg" },
  { label: "Cut", icon: "/icons/scissor.png" },
  { label: "Copy", icon: "/icons/copy.png" },
  { label: "Paste", icon: "/icons/paste.png" },
  { label: "Undo", icon: "/icons/undo.png" },
  { label: "Delete", icon: "/icons/delete.png" },
  { label: "Properties", icon: "/icons/info.png" },
  { label: "Views", icon: "/icons/grid.png" },
];
