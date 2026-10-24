import { TrashItem } from "./types";

export const INITIAL_ITEMS: TrashItem[] = [
  {
    id: "1",
    name: "ie6_compatibility_patch",
    ext: "exe",
    location: "C:\\Program Files\\Internet Explorer",
    deletedOn: "1998-10-01",
    size: "64 KB",
  },
  {
    id: "2",
    name: "motivation",
    ext: "dll",
    location: "C:\\Windows\\System32",
    deletedOn: "2026-09-01",
    size: "2 KB",
  },
  {
    id: "3",
    name: "y2k_fix_final_v3_REAL_THIS_TIME",
    ext: "bat",
    location: "C:\\Windows",
    deletedOn: "1999-12-31",
    size: "4 KB",
  },
  {
    id: "4",
    name: "css_centering_solution",
    ext: "txt",
    location: "C:\\Projects\\portfolio\\src",
    deletedOn: "2026-03-15",
    size: "0 B",
  },
  {
    id: "5",
    name: "todo_refactor_later",
    ext: "tmp",
    location: "C:\\Temp",
    deletedOn: "2026-01-01",
    size: "1 KB",
  },
  {
    id: "6",
    name: "backup_before_rm_rf",
    ext: "zip",
    location: "C:\\Backups",
    deletedOn: "2026-07-22",
    size: "8.1 GB",
  },
  {
    id: "7",
    name: "null_pointer_fix",
    ext: "dll",
    location: "C:\\Windows\\System32",
    deletedOn: "2026-05-12",
    size: "3 KB",
  },
  {
    id: "8",
    name: "winamp_playlist_1998",
    ext: "mp3",
    location: "C:\\My Music\\WinAmp",
    deletedOn: "2026-09-25",
    size: "3.8 MB",
  },
  {
    id: "9",
    name: "clippy_uninstaller",
    ext: "exe",
    location: "C:\\Program Files\\Microsoft Office",
    deletedOn: "2001-06-10",
    size: "42 KB",
  },
  {
    id: "10",
    name: "merge_conflict_resolution",
    ext: "doc",
    location: "C:\\Projects\\main_branch",
    deletedOn: "2026-08-14",
    size: "128 B",
  },
  {
    id: "11",
    name: "technical_debt",
    ext: "tmp",
    location: "C:\\Projects\\legacy_app\\src",
    deletedOn: "2026-04-20",
    size: "4.2 GB",
  },
  {
    id: "12",
    name: "dialup_modem_drivers",
    ext: "exe",
    location: "C:\\Windows\\Drivers",
    deletedOn: "1998-04-01",
    size: "256 KB",
  },
];

export const RESTORE_QUIPS = [
  "Restored. Like IE6, it's back and nobody is happy about it.",
  "Item restored. Have you tried turning it off and on again?",
  "Back from the dead. Just like legacy code in production.",
  "Restored. Windows 98 has logged this event somewhere useless.",
  "Item recovered. The floppy drive is spinning up. Please wait.",
  "Restored. This is going to cause a segfault, isn't it.",
];

export const EMPTY_CONFIRMATIONS = [
  "Permanently delete all items?\n\nThis is irreversible.\nMuch like shipping to production on a Friday.",
  "Are you sure?\n\nOnce deleted, recovery requires a floppy disk.\nAnd we both know the drive makes a horrible noise.",
  "Confirm permanent deletion?\n\nFaster than waiting for Windows 98 to shut down properly.\nWhich is saying something.",
];

export const ICON_COLORS: Record<TrashItem["ext"], string> = {
  exe: "#4fc3f7",
  dll: "#ce93d8",
  txt: "#fff",
  tmp: "#808080",
  zip: "#ffcc02",
  mp3: "#a5d6a7",
  doc: "#4fc3f7",
  bat: "#ff6b35",
};
