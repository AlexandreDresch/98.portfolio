export interface MyComputerProps {
  renderTrigger: boolean;
  windowId: number;
}

type ItemType = "drive" | "folder";

export type ExplorerItem = {
  id: string;
  name: string;
  type: ItemType;
  icon: string;
  description?: string;
  capacity?: string;
  free?: string;
  used?: string;
};

export type ViewMode = "icons" | "list" | "details";