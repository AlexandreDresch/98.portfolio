"use client";

import { useState, useEffect } from "react";
import WindowWrapper from "@/components/shared/window-wrapper";
import { cn } from "@/lib/utils";
import { Process, Tab } from "./types";
import { APPS, INITIAL_PROCESSES, TOTAL_MEM, TOTAL_PF } from "./constants";
import { TabBar } from "./tab-bar";
import { Panel } from "./panel";
import { MiniMeter } from "./mini-meter";
import { HistoryGraph } from "./history-graph";
import { Stat } from "./stat";

export default function TaskManager() {
  const [tab, setTab] = useState<Tab>("Performance");
  const [cpu, setCpu] = useState(0);
  const [pf, setPf] = useState(756_000);
  const [cpuHist, setCpuHist] = useState<number[]>(Array(60).fill(0));
  const [pfHist, setPfHist] = useState<number[]>(Array(60).fill(30));
  const [netHist, setNetHist] = useState<number[]>(Array(60).fill(0));
  const [processes, setProcesses] = useState<Process[]>(INITIAL_PROCESSES);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [selectedProc, setSelectedProc] = useState<number | null>(null);
  const [apps, setApps] = useState(APPS);
  const [sortProc, setSortProc] = useState<keyof Process>("cpu");
  const [handles] = useState(12_472);
  const [threads] = useState(552);

  useEffect(() => {
    const iv = setInterval(() => {
      setCpu((prev) => {
        const spike = Math.random() < 0.08;
        const target = spike ? Math.random() * 70 + 15 : Math.random() * 12;
        const next = Math.round(
          Math.max(0, Math.min(100, prev * 0.4 + target * 0.6)),
        );
        setCpuHist((h) => [...h.slice(1), next]);
        return next;
      });

      setPf((prev) => {
        const delta = (Math.random() - 0.48) * 8_000;
        const next = Math.max(600_000, Math.min(1_800_000, prev + delta));
        setPfHist((h) => [...h.slice(1), (next / TOTAL_PF) * 100]);
        return next;
      });

      setNetHist((h) => {
        const v =
          Math.random() < 0.15 ? Math.random() * 40 + 5 : Math.random() * 3;
        return [...h.slice(1), v];
      });

      setProcesses((prev) =>
        prev
          .map((p) => {
            if (p.pid === 0) return p;
            const drift = (Math.random() - 0.5) * 2;
            return {
              ...p,
              cpu: Math.max(0, Math.min(50, Math.round(p.cpu + drift))),
            };
          })
          .map((p, _, arr) => {
            if (p.pid !== 0) return p;
            const used = arr
              .filter((x) => x.pid !== 0)
              .reduce((a, b) => a + b.cpu, 0);
            return { ...p, cpu: Math.max(0, 100 - used) };
          }),
      );
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const availableMem = TOTAL_MEM - 580_000 - Math.round((pf - 600_000) * 0.02);
  const systemCache = 596_816;
  const commitTotal = Math.round(pf / 1024);
  const commitPeak = 834_508;
  const kernelTotal = 66_384;
  const kernelPaged = 55_824;
  const kernelNonp = 10_560;

  const sortedProcs = [...processes].sort((a, b) => {
    if (sortProc === "name") return a.name.localeCompare(b.name);
    return (b[sortProc] as number) - (a[sortProc] as number);
  });

  const endTask = () => {
    if (!selectedApp) return;
    setApps((prev) => prev.filter((a) => a.name !== selectedApp));
    setSelectedApp(null);
  };

  const endProcess = () => {
    if (selectedProc === null) return;
    setProcesses((prev) => prev.filter((p) => p.pid !== selectedProc));
    setSelectedProc(null);
  };

  const colHdr = (label: string, key: keyof Process) => (
    <th
      className="text-left font-bold px-2 py-0.5 border-b border-[#808080] cursor-default hover:bg-[#d0d0d0]"
      onClick={() => setSortProc(key)}
    >
      {label}
      {sortProc === key ? " ▼" : ""}
    </th>
  );

  const statusCpu = Math.max(
    0,
    100 - (processes.find((p) => p.pid === 0)?.cpu ?? 97),
  );
  const statusMem = `${Math.round(pf / 1024)}M / ${Math.round(TOTAL_PF / 1024)}M`;

  return (
    <WindowWrapper
      id={26}
      title="Windows Task Manager"
      icon="/icons/task-manager.png"
      controls={{ close: true, minimize: true, maximize: false }}
      className="!w-[480px]"
      crtEffect={true}
    >
      <div
        className="flex flex-col w-full h-full bg-[#c0c0c0] select-none"
        style={{ fontFamily: "Arial, sans-serif", fontSize: 12 }}
      >
        <div className="flex h-6 items-center px-1 border-b border-[#808080] flex-shrink-0 text-[12px]">
          {["File", "Options", "View", "Help"].map((m) => (
            <button
              key={m}
              className="px-2 py-px cursor-default hover:bg-[#000080] hover:text-white"
            >
              {m}
            </button>
          ))}
        </div>

        <TabBar
          tabs={["Applications", "Processes", "Performance", "Networking"]}
          active={tab}
          onChange={setTab}
        />

        <div className="flex-1 min-h-0 overflow-hidden p-2">
          {tab === "Applications" && (
            <div className="flex flex-col h-full gap-2">
              <div
                className="flex-1 min-h-0 bg-white overflow-auto"
                style={{
                  border: "2px solid",
                  borderColor: "#808080 #fff #fff #808080",
                }}
              >
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="bg-[#c0c0c0] border-b border-[#808080]">
                      <th className="text-left px-2 py-0.5 font-bold border-r border-[#808080]">
                        Task
                      </th>
                      <th className="text-left px-2 py-0.5 font-bold w-24">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {apps.map((app) => (
                      <tr
                        key={app.name}
                        className={cn(
                          "cursor-default border-b border-gray-100",
                          selectedApp === app.name
                            ? "bg-[#010f80] text-white"
                            : "hover:bg-[#e8e8ff]",
                        )}
                        onClick={() => setSelectedApp(app.name)}
                      >
                        <td className="px-2 py-0.5 border-r border-gray-100">
                          {app.name}
                        </td>
                        <td className="px-2 py-0.5 text-[10px]">
                          {app.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-0.5 text-[11px] bg-[#c0c0c0] cursor-default"
                  style={{
                    border: "2px solid",
                    borderColor: "#fff #808080 #808080 #fff",
                  }}
                >
                  Switch To
                </button>
                <button
                  className="px-4 py-0.5 text-[11px] bg-[#c0c0c0] cursor-default"
                  style={{
                    border: "2px solid",
                    borderColor: "#fff #808080 #808080 #fff",
                  }}
                >
                  New Task…
                </button>
                <button
                  disabled={!selectedApp}
                  onClick={endTask}
                  className={cn(
                    "px-4 py-0.5 text-[11px] bg-[#c0c0c0] cursor-default",
                    !selectedApp && "opacity-40",
                  )}
                  style={{
                    border: "2px solid",
                    borderColor: "#fff #808080 #808080 #fff",
                  }}
                >
                  End Task
                </button>
              </div>
            </div>
          )}

          {tab === "Processes" && (
            <div className="flex flex-col h-full gap-2">
              <div
                className="flex-1 min-h-0 bg-white overflow-auto"
                style={{
                  border: "2px solid",
                  borderColor: "#808080 #fff #fff #808080",
                }}
              >
                <table className="w-full text-[11px]">
                  <thead className="sticky top-0">
                    <tr className="bg-[#c0c0c0] text-[11px]">
                      {colHdr("Image Name", "name")}
                      {colHdr("PID", "pid")}
                      {colHdr("CPU", "cpu")}
                      {colHdr("Mem Usage", "mem")}
                    </tr>
                  </thead>
                  <tbody>
                    {sortedProcs.map((proc) => (
                      <tr
                        key={proc.pid}
                        className={cn(
                          "cursor-default border-b border-gray-100",
                          selectedProc === proc.pid
                            ? "bg-[#010f80] text-white"
                            : "hover:bg-[#e8e8ff]",
                        )}
                        onClick={() => setSelectedProc(proc.pid)}
                      >
                        <td className="px-2 py-px border-r border-gray-100">
                          {proc.name}
                        </td>
                        <td className="px-2 py-px border-r border-gray-100 tabular-nums">
                          {proc.pid}
                        </td>
                        <td className="px-2 py-px border-r border-gray-100 tabular-nums">
                          {proc.cpu === 0
                            ? "00"
                            : String(proc.cpu).padStart(2, "0")}
                        </td>
                        <td className="px-2 py-px tabular-nums text-right pr-2">
                          {(proc.mem / 1024).toFixed(0)} KB
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center">
                <label className="text-[11px] flex items-center gap-1 cursor-default">
                  <input
                    type="checkbox"
                    className="cursor-default"
                    defaultChecked
                  />
                  Show processes from all users
                </label>
                <button
                  disabled={selectedProc === null}
                  onClick={endProcess}
                  className={cn(
                    "px-4 py-0.5 text-[11px] bg-[#c0c0c0] cursor-default",
                    selectedProc === null && "opacity-40",
                  )}
                  style={{
                    border: "2px solid",
                    borderColor: "#fff #808080 #808080 #fff",
                  }}
                >
                  End Process
                </button>
              </div>
            </div>
          )}

          {tab === "Performance" && (
            <div className="flex flex-col gap-2 h-full overflow-auto">
              <div className="flex gap-2">
                <Panel label="CPU Usage" className="flex-none">
                  <div
                    style={{
                      border: "2px solid",
                      borderColor: "#808080 #fff #fff #808080",
                    }}
                  >
                    <MiniMeter value={cpu} unit="%" />
                  </div>
                </Panel>
                <Panel label="CPU Usage History" className="flex-1">
                  <div
                    style={{
                      border: "2px solid",
                      borderColor: "#808080 #fff #fff #808080",
                      height: 80,
                    }}
                  >
                    <HistoryGraph history={cpuHist} height={80} />
                  </div>
                </Panel>
              </div>

              <div className="flex gap-2">
                <Panel label="PF Usage" className="flex-none">
                  <div
                    style={{
                      border: "2px solid",
                      borderColor: "#808080 #fff #fff #808080",
                    }}
                  >
                    <MiniMeter
                      value={Math.round(pf / 1024)}
                      max={Math.round(TOTAL_PF / 1024)}
                      unit="MB"
                    />
                  </div>
                </Panel>
                <Panel label="Page File Usage History" className="flex-1">
                  <div
                    style={{
                      border: "2px solid",
                      borderColor: "#808080 #fff #fff #808080",
                      height: 80,
                    }}
                  >
                    <HistoryGraph history={pfHist} height={80} />
                  </div>
                </Panel>
              </div>

              <div className="flex gap-2 text-[11px]">
                <Panel label="Totals" className="flex-1">
                  <Stat label="Handles" value={handles} />
                  <Stat label="Threads" value={threads} />
                  <Stat label="Processes" value={processes.length} />
                </Panel>
                <Panel label="Physical Memory (K)" className="flex-1">
                  <Stat label="Total" value={TOTAL_MEM.toLocaleString()} />
                  <Stat
                    label="Available"
                    value={availableMem.toLocaleString()}
                  />
                  <Stat
                    label="System Cache"
                    value={systemCache.toLocaleString()}
                  />
                </Panel>
              </div>

              <div className="flex gap-2 text-[11px]">
                <Panel label="Commit Charge (K)" className="flex-1">
                  <Stat
                    label="Total"
                    value={(commitTotal * 1024).toLocaleString()}
                  />
                  <Stat label="Limit" value={TOTAL_PF.toLocaleString()} />
                  <Stat label="Peak" value={commitPeak.toLocaleString()} />
                </Panel>
                <Panel label="Kernel Memory (K)" className="flex-1">
                  <Stat label="Total" value={kernelTotal.toLocaleString()} />
                  <Stat label="Paged" value={kernelPaged.toLocaleString()} />
                  <Stat label="Nonpaged" value={kernelNonp.toLocaleString()} />
                </Panel>
              </div>
            </div>
          )}

          {tab === "Networking" && (
            <div className="flex flex-col h-full gap-2">
              <Panel label="Network Utilization History" className="flex-1">
                <div
                  style={{
                    border: "2px solid",
                    borderColor: "#808080 #fff #fff #808080",
                    height: 140,
                  }}
                >
                  <HistoryGraph history={netHist} height={140} />
                </div>
              </Panel>
              <div
                className="bg-white overflow-auto text-[11px]"
                style={{
                  border: "2px solid",
                  borderColor: "#808080 #fff #fff #808080",
                }}
              >
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#c0c0c0] border-b border-[#808080]">
                      {[
                        "Adapter Name",
                        "Network Util.",
                        "Link Speed",
                        "State",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left px-2 py-0.5 font-bold border-r border-[#808080]"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="px-2 py-0.5 border-r border-gray-100">
                        Local Area Connection
                      </td>
                      <td className="px-2 py-0.5 border-r border-gray-100 tabular-nums">
                        {netHist[netHist.length - 1].toFixed(1)}%
                      </td>
                      <td className="px-2 py-0.5 border-r border-gray-100">
                        10 Mbps
                      </td>
                      <td className="px-2 py-0.5 text-green-700 font-bold">
                        Operational
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div
          className="flex-shrink-0 flex text-[10px] border-t border-[#808080]"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          {[
            `Processes: ${processes.length}`,
            `CPU Usage: ${statusCpu}%`,
            `Commit Charge: ${statusMem}`,
          ].map((text, i) => (
            <div
              key={i}
              className="flex-1 px-2 py-0.5 border-r border-[#808080] last:border-r-0"
              style={{ borderTop: "1px solid #fff" }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    </WindowWrapper>
  );
}
