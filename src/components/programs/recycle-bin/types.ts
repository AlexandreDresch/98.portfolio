export interface TrashItem {
  id: string;
  name: string;
  ext: "exe" | "dll" | "txt" | "tmp" | "zip" | "mp3" | "doc" | "bat";
  location: string;
  deletedOn: string;
  size: string;
}