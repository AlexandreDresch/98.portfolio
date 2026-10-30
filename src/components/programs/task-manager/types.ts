export type Tab = "Applications" | "Processes" | "Performance" | "Networking";

export interface Process {
  name: string;
  pid: number;
  cpu: number;
  mem: number;
}
