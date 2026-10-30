import { Process } from "./types";

export const INITIAL_PROCESSES: Process[] = [
  { name: "System Idle Process", pid: 0, cpu: 97, mem: 16 },
  { name: "System", pid: 8, cpu: 0, mem: 228 },
  { name: "smss.exe", pid: 152, cpu: 0, mem: 352 },
  { name: "csrss.exe", pid: 212, cpu: 0, mem: 1824 },
  { name: "winlogon.exe", pid: 232, cpu: 0, mem: 2756 },
  { name: "services.exe", pid: 260, cpu: 0, mem: 3248 },
  { name: "lsass.exe", pid: 272, cpu: 0, mem: 1564 },
  { name: "svchost.exe", pid: 428, cpu: 0, mem: 4892 },
  { name: "explorer.exe", pid: 1004, cpu: 0, mem: 15872 },
  { name: "taskmgr.exe", pid: 1248, cpu: 1, mem: 3840 },
  { name: "node.exe", pid: 1352, cpu: 2, mem: 45280 },
  { name: "code.exe", pid: 1420, cpu: 1, mem: 89600 },
  { name: "chrome.exe", pid: 1512, cpu: 3, mem: 156800 },
  { name: "winamp.exe", pid: 1624, cpu: 0, mem: 8192 },
  { name: "iexplore.exe", pid: 1780, cpu: 0, mem: 24576 },
];

export const APPS = [
  { name: "98.portfolio — Internet Explorer", status: "Running" },
  { name: "My Computer", status: "Running" },
  { name: "Winamp 2.95", status: "Running" },
  { name: "MS-DOS Prompt", status: "Running" },
  { name: "Paint", status: "Running" },
  { name: "98.DOOM", status: "Running" },
  { name: "Recycle Bin", status: "Running" },
];

export const TOTAL_MEM = 1_048_048; 
export const TOTAL_PF = 2_463_232; 
