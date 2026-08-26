"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import WindowWrapper from "@/components/shared/window-wrapper";

import {
  HELP_TEXT,
  HIDDEN_COMMANDS,
  BOOT_MESSAGES,
  CAT_ASCII,
  COFFEE_ASCII,
  COLORS,
  CREDITS,
  DOOM_ASCII,
  FAKE_FILES,
  IPCONFIG,
  JOKES,
  LOVE_ASCII,
  MATRIX_CHARS,
  MIKU_ASCII,
  SKILLS,
  SYSINFO,
} from "./data";

type HistoryItem =
  | { type: "input"; text: string; id: number }
  | { type: "output"; text: string; id: number }
  | { type: "special"; mode: "matrix" | "hack" | "restart"; id: number };

const ALL_COMMANDS = [
  "help",
  "ver",
  "cls",
  "clear",
  "date",
  "time",
  "echo",
  "color",
  "dir",
  "ls",
  "cd",
  "type",
  "del",
  "md",
  "mkdir",
  "format",
  "deltree",
  "ping",
  "ipconfig",
  "sysinfo",
  "netstat",
  "tracert",
  "nslookup",
  "telnet",
  "miku",
  "coffee",
  "cat",
  "love",
  "doom",
  "skills",
  "credits",
  "joke",
  "hack",
  "matrix",
  "screensaver",
  "rickroll",
  "sudo",
  "cowsay",
  "ascii",
  "snake",
  "shutdown",
  "restart",
  "exit",
  "prompt",
  "win",
  "copy",
  "move",
  "rename",
  "ren",
  "path",
  "set",
  "mem",
  "google",
  "chatgpt",
  "bitcoin",
  "napster",
  "geocities",
  "limewire",
  "netscape",
  "millennium",
  "whoami",
  "regedit",
  "aol",
];

function processCommand(
  cmd: string,
  setTextColor: (c: string) => void,
  setBgColor: (c: string) => void,
  setCwd: (p: string) => void,
  cwd: string,
): string {
  const trimmed = cmd.trim();
  const lower = trimmed.toLowerCase();
  const parts = trimmed.split(" ");
  const command = parts[0].toLowerCase();
  const args = parts.slice(1).join(" ");

  if (HIDDEN_COMMANDS[lower]) return HIDDEN_COMMANDS[lower];

  switch (command) {
    case "help":
      return HELP_TEXT;
    case "ver":
      return "\nMicrosoft Windows 98 [Version 4.10.1998]\nCopyright (C) Microsoft Corporation 1981-1998. All rights reserved.\n";
    case "cls":
    case "clear":
      return "__CLEAR__";
    case "date":
      return `\nCurrent date is: ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}\n`;
    case "time":
      return `\nCurrent time is: ${new Date().toLocaleTimeString("en-US")}\n`;
    case "echo":
      return args ? `\n${args}\n` : "\nECHO is on.\n";
    case "whoami":
      return "\nUser\n(Not Administrator. Never Administrator.)\n";
    case "color": {
      if (!args || args.length < 2)
        return "\nUsage: COLOR [attr]\nExample: color 0a (black background, green text)\n";
      const bg = args[0]?.toLowerCase();
      const fg = args[1]?.toLowerCase();
      if (COLORS[bg]) setBgColor(COLORS[bg]);
      if (COLORS[fg]) setTextColor(COLORS[fg]);
      return "";
    }
    case "dir":
    case "ls": {
      let out = `\n Directory of ${cwd}\n\n`;
      let total = 0;
      FAKE_FILES.forEach((f) => {
        out += `${f.date}  02:34 PM              ${f.size.padStart(10)}  ${f.name}\n`;
        total += parseInt(f.size.replace(/,/g, "")) || 0;
      });
      out += `\n        ${FAKE_FILES.length} File(s)    ${total.toLocaleString()} bytes\n        0 Dir(s)    3,221,225,472 bytes free\n`;
      return out;
    }
    case "cd": {
      if (!args || args === "..") {
        setCwd("C:\\");
        return "";
      }
      if (args === "\\") {
        setCwd("C:\\");
        return "";
      }
      const newPath = args.startsWith("\\")
        ? `C:${args}`
        : `${cwd}\\${args.toUpperCase()}`;
      setCwd(newPath);
      return "";
    }
    case "type": {
      if (!args) return "\nRequired parameter missing.\n";
      const upper = args.toUpperCase();
      if (upper === "SECRETS.TXT")
        return "\nTOP SECRET — LEVEL 5 CLEARANCE REQUIRED\n\n  #1: The blue screen of death was, in a sense, the feature.\n  #2: Clippy was self-aware. The team knew.\n  #3: This file has been accessed.\n";
      if (upper === "AUTOEXEC.BAT")
        return "\n@ECHO OFF\nSET PATH=C:\\WINDOWS;C:\\WINDOWS\\COMMAND\nSET TEMP=C:\\WINDOWS\\TEMP\n";
      if (upper === "CONFIG.SYS")
        return "\nDEVICE=C:\\WINDOWS\\HIMEM.SYS\nDEVICE=C:\\WINDOWS\\EMM386.EXE NOEMS\nBUFFERS=40\nFILES=80\nDOS=HIGH,UMB\n";
      if (upper === "MIKU.TXT") return MIKU_ASCII;
      if (upper === "DO_NOT_OPEN.EXE")
        return "\nYou opened DO_NOT_OPEN.EXE.\nThe file contained: a picture of Hatsune Miku.\n[Easter Egg #7 found]\n";
      return `\nFile not found - ${args}\n`;
    }
    case "del": {
      if (!args) return "\nRequired parameter missing.\n";
      if (args.toUpperCase() === "SYSTEM32") return "\nAccess denied.\n";
      if (args === "*.*")
        return `\nAll files in ${cwd} (Y/N)? Y\nDeleted 0 files.\n`;
      return `\nAre you sure you want to delete ${args} (Y/N)? Y\n${args}: deleted.\n(Not really.)\n`;
    }
    case "md":
    case "mkdir":
      return args
        ? `\nDirectory created: ${cwd}\\${args.toUpperCase()}\n`
        : "\nThe syntax of the command is incorrect.\n";
    case "format": {
      if (args.toLowerCase().startsWith("c:"))
        return "\nWARNING: All data on drive C: will be lost!\nProceed with Format (Y/N)? N\n\nFormat cancelled.\n";
      return `\nInsert new disk for drive ${args}:\nand press ENTER when ready... ^C\nFormat cancelled.\n`;
    }
    case "deltree":
      return `\nDelete directory "${args || cwd}" and all its subdirectories? [yn] n\n\nCancelled. ${Math.floor(Math.random() * 9000 + 1000)} files spared.\n`;
    case "ping": {
      if (!args) return "\nUsage: PING hostname\n";
      const ms = Array.from({ length: 4 }, () =>
        Math.floor(Math.random() * 50 + 10),
      );
      return `\nPinging ${args} [127.0.0.1] with 32 bytes of data:\n\n${ms.map((m) => `Reply from 127.0.0.1: bytes=32 time=${m}ms TTL=128`).join("\n")}\n\nPing statistics for ${args}:\n    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)\n    Min = ${Math.min(...ms)}ms, Max = ${Math.max(...ms)}ms, Avg = ${Math.round(ms.reduce((a, b) => a + b) / 4)}ms\n`;
    }
    case "ipconfig":
      return IPCONFIG;
    case "sysinfo":
      return SYSINFO;
    case "netstat":
      return "\nActive Connections\n\n  Proto  Local Address          Foreign Address        State\n  TCP    0.0.0.0:80             0.0.0.0:0              LISTENING\n  TCP    127.0.0.1:1337         127.0.0.1:42069        ESTABLISHED\n  TCP    192.168.1.42:1027      151.101.1.140:443      ESTABLISHED\n";
    case "tracert":
      return !args
        ? "\nUsage: TRACERT hostname\n"
        : `\nTracing route to ${args}:\n\n  1    1 ms  192.168.1.1\n  2   12 ms  10.0.0.1\n  3   28 ms  ${args}\n\nTrace complete.\n`;
    case "nslookup":
      return !args
        ? "\nDefault Server: dns.google\nAddress: 8.8.8.8\n\n> _\n"
        : `\nServer:  dns.google\nAddress: 8.8.8.8\n\nName: ${args}\nAddress: ${Array.from({ length: 4 }, () => Math.floor(Math.random() * 255)).join(".")}\n`;
    case "telnet":
      return !args
        ? "\nUsage: TELNET hostname [port]\n"
        : `\nConnecting to ${args}...\n\nConnection established.\n\nWelcome to ${args}.\nLogin: _\n\n(Connection reset by peer.)\n`;
    case "miku":
      return MIKU_ASCII;
    case "coffee":
      return COFFEE_ASCII;
    case "cat":
      return CAT_ASCII;
    case "love":
      return LOVE_ASCII;
    case "doom":
      return DOOM_ASCII;
    case "skills":
      return SKILLS;
    case "credits":
      return CREDITS;
    case "joke":
      return "\n" + JOKES[Math.floor(Math.random() * JOKES.length)];
    case "hack":
      return "__HACK__";
    case "matrix":
      return "__MATRIX__";
    case "screensaver":
      return "__SCREENSAVER__";
    case "restart":
      return "__RESTART__";
    case "rickroll":
      return "\n\"Never Gonna Give You Up\" — Rick Astley, 1987\n\nWe're no strangers to love\nYou know the rules and so do I\nA full commitment's what I'm thinking of\nYou wouldn't get this from any other guy\n\n[Easter Egg #3 found]\n";
    case "cowsay": {
      const text = args || "Moo.";
      const border = "-".repeat(text.length + 2);
      return `\n +${border}+\n | ${text} |\n +${border}+\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||\n`;
    }
    case "snake":
      return "\nClassic Snake:\n\n  ########\n  #  ..  #\n  # .OO. #\n  # .O.. #\n  # .... #\n  ########\n\nScore: 20  (Full game not implemented.)\n";
    case "shutdown":
      return "\nShutdown in progress...\nIt is now safe to turn off your computer.\n\n[The terminal keeps running. This is authentic.]\n";
    case "exit":
      return "\nThere is no exit.\nThis terminal will outlive us all.\n";
    case "prompt":
      return "\nPrompt updated. Nothing visible has changed.\n";
    case "win":
      return "\nYou are already in Windows 98.\nAre you okay?\n";
    case "copy":
      return args
        ? `\n1 file(s) copied.\n`
        : "\nThe syntax of the command is incorrect.\n";
    case "move":
      return args
        ? `\n1 file(s) moved.\n`
        : "\nThe syntax of the command is incorrect.\n";
    case "rename":
    case "ren":
      return args
        ? `\nFile renamed.\n`
        : "\nThe syntax of the command is incorrect.\n";
    case "path":
      return "\nC:\\WINDOWS;C:\\WINDOWS\\COMMAND\n";
    case "set":
      return "\nCOMSPEC=C:\\WINDOWS\\COMMAND.COM\nPATH=C:\\WINDOWS;C:\\WINDOWS\\COMMAND\nPROMPT=$P$G\nTEMP=C:\\WINDOWS\\TEMP\nSECRET_KEY=never_gonna_give_you_up\n";
    case "mem":
      return "\nMemory Type           Total      Used      Free\n──────────────────── ──────── ──────── ────────\nConventional            640K      182K      458K\nExtended (XMS)       65,421K      512K   64,909K\n──────────────────── ──────── ──────── ────────\nTotal memory         66,600K    1,191K   65,409K\n";
    case "google":
      return "\nERROR: 'google' is not recognized as a valid search engine.\nPlease try AltaVista, Lycos, or Ask Jeeves.\n\nHint: www.altavista.com\n";
    case "chatgpt":
      return "\nConnecting to AI assistant...\n\nERROR: Model weights require hardware from approximately 2023.\nYour 450MHz Pentium II is 25 years and 1,000× too slow.\n\nPlease try again after the singularity.\n";
    case "bitcoin":
      return "\nCryptocurrency Terminal v0.1\n\nMining 1 Bitcoin...\n████████████████████ 100%\n\nResult: 1 BTC mined successfully.\nCurrent market value: $0.00\n\nSaved to C:\\bitcoin\\myfuture.dat\n\n(Estimated future value: classified.)\n";
    case "napster": {
      const songs = [
        "Metallica - Enter Sandman",
        "Dr. Dre - Still D.R.E.",
        "Eminem - The Real Slim Shady",
        "Limp Bizkit - Break Stuff",
        "Linkin Park - One Step Closer",
      ];
      const song = songs[Math.floor(Math.random() * songs.length)];
      return `\nNapster v2.0 Beta\n\nSearching for: "${song}"...\nFound 847 sources.\n\nDownloading at 4.2 KB/s (14.4k modem)...\n██░░░░░░░░░░░░░░ 12%\n\nEstimated time remaining: 47 minutes.\n\n(Note: Metallica's lawyers are aware of this activity.)\n`;
    }
    case "geocities":
      return "\nConnecting to GeoCities...\n\nWelcome to ~~*~~ MIKE'S AWESOME HOMEPAGE ~~*~~\n\n[UNDER CONSTRUCTION]\n\n★ Best viewed in Internet Explorer 4.0 at 800×600 ★\n★ Visitor #: 00000042                             ★\n★ Sign my guestbook!                              ★\n\n♫ MIDI: Final Fantasy Victory Theme is playing ♫\n";
    case "limewire":
      return "\nLimeWire 4.0\n\nSearching for: Shrek 2 (2004) [HD-DVD RIP].avi...\nFound 2,341 results.\n\nDownloading...\n\nFiles received:\n  - shrek2.exe                    (not a movie)\n  - shrek2_REAL_version.exe       (also not a movie)\n  - FREE_SCREENSAVER_INSTALL.exe  (definitely not a movie)\n\nNote: Your antivirus subscription expired in 1997.\n";
    case "netscape":
      return "\nNetscape Navigator 4.08\n\nLoading www.netscape.com...\n\n[Page contains 3 animated GIFs, a hit counter, and a Java applet]\n[Java applet has crashed]\n[Hit counter: 00000001]\n\nThis page best viewed in Netscape Navigator 4.0.\nYou are using Internet Explorer 5.0.\nYou have made a poor choice.\n";
    case "millennium":
      return "\nY2K READINESS ASSESSMENT\nDate: December 31, 1999 — 23:58:02\n\nCritical systems status:\n  Power grid ............. [UNKNOWN]\n  Banking system ......... [UNKNOWN]\n  Air traffic control .... [UNKNOWN]\n  Your PC ................ [WILL CRASH ANYWAY]\n\nCountdown: T-01:58\n\nRecommended action: go to sleep.\nActual outcome: everything was fine.\nAnticlimactic rating: 10/10\n";
    case "regedit":
      return '\nRegistry Editor\n\nHKEY_LOCAL_MACHINE\\\n  SOFTWARE\\\n    Microsoft\\\n      Windows\\\n        CurrentVersion\\\n          RunningOnVibes: REG_DWORD 0x00000001\n          StabilityLevel: REG_SZ    "theoretical"\n          LastCrashReason: REG_SZ   "unknown (as always)"\n\nDo not modify these values.\nThe system is already doing its best.\n';
    case "aol":
      return '\nAOL Instant Messenger v2.0\n\nDialing... *screeeee kkkkshhhhh gggggggg*\n\nConnected at 28.8 Kbps.\n\nYou\'ve got mail! (23 unread)\n  FROM: xXDragonSlayer99Xx — hey whats ur asl\n  FROM: coolkid2000 — wanna trade pokemon?\n  FROM: Mom — call me\n\nAway message set: "brb getting snacks"\n';
    case "":
      return "";
    default:
      return `\n'${command}' is not recognized as an internal or external command,\nan operable program, or a batch file.\n`;
  }
}

function HackSequence({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const hackLines = useMemo(
    () => [
      "Initiating hack sequence...",
      "Bypassing firewall...  ████████ DONE",
      "Accessing mainframe...",
      "Decrypting password database...",
      "Password: hunter2",
      "...",
      "That is not how hacking works.",
      "Scanning ports 1-65535...",
      "Open: 22, 80, 443, 1337, 8080",
      "ACCESS GRANTED",
      "Downloading the internet...",
      "████████████████████ 100%",
      "All your base are belong to us.",
      "[Easter Egg #2 found]",
      "",
      "Nothing actually happened. The terminal is safe.",
    ],
    [],
  );
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      if (i < hackLines.length) {
        setLines((l) => [...l, hackLines[i]]);
        i++;
      } else {
        clearInterval(iv);
        setTimeout(onDone, 500);
      }
    }, 160);
    return () => clearInterval(iv);
  }, [hackLines, onDone]);
  return (
    <div className="text-[#ff4444]">
      {lines.map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.1 }}
        >
          {l}
        </motion.div>
      ))}
    </div>
  );
}

function MatrixEffect() {
  const [rows, setRows] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let count = 0;
    const iv = setInterval(() => {
      const row = Array.from(
        { length: 58 },
        () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
      ).join("");
      setRows((r) => [...r, row]);
      count++;
      if (count > 22) {
        clearInterval(iv);
        setDone(true);
      }
    }, 70);
    return () => clearInterval(iv);
  }, []);

  return (
    <div
      className="font-mono text-[11px] leading-tight whitespace-pre"
      style={{ color: "#00ff41" }}
    >
      {rows.map((r, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.05 }}
        >
          {r}
        </motion.div>
      ))}
      {done && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white mt-2"
        >
          [Matrix mode exited.]{"\n"}[Easter Egg #1 found]
        </motion.div>
      )}
    </div>
  );
}

function RestartAnim({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    "Saving settings...",
    "Stopping processes...",
    "Writing to registry...",
    "Restarting Windows 98...",
    "",
  ];
  useEffect(() => {
    const iv = setInterval(() => {
      setStep((s) => {
        if (s >= steps.length - 1) {
          clearInterval(iv);
          setTimeout(onDone, 400);
          return s;
        }
        return s + 1;
      });
    }, 600);
    return () => clearInterval(iv);
  }, [onDone, steps.length]);
  return (
    <div>
      {steps.slice(0, step + 1).map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {s}
        </motion.div>
      ))}
    </div>
  );
}

let itemId = 0;
const nextId = () => ++itemId;

export default function Terminal() {
  const [history, setHistory] = useState<HistoryItem[]>(
    BOOT_MESSAGES.map((m) => ({ type: "output", text: m, id: nextId() })),
  );
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIdx, setCmdIdx] = useState(-1);
  const [cwd, setCwd] = useState("C:\\WINDOWS");
  const [textColor, setTextColor] = useState("#c8c8c8");
  const [bgColor, setBgColor] = useState("#000000");

  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = useCallback(() => {
    const cmd = input.trim();
    setInput("");
    setCmdIdx(-1);
    if (cmd) setCmdHistory((h) => [cmd, ...h]);

    setHistory((h) => [
      ...h,
      { type: "input", text: `${cwd}> ${cmd}`, id: nextId() },
    ]);

    const result = processCommand(cmd, setTextColor, setBgColor, setCwd, cwd);

    if (result === "__CLEAR__") {
      setHistory([]);
      return;
    }
    if (result === "__MATRIX__") {
      setHistory((h) => [
        ...h,
        { type: "special", mode: "matrix", id: nextId() },
      ]);
      return;
    }
    if (result === "__HACK__") {
      setHistory((h) => [
        ...h,
        { type: "special", mode: "hack", id: nextId() },
      ]);
      return;
    }
    if (result === "__RESTART__") {
      setHistory((h) => [
        ...h,
        { type: "special", mode: "restart", id: nextId() },
      ]);
      return;
    }
    if (result)
      setHistory((h) => [...h, { type: "output", text: result, id: nextId() }]);
  }, [input, cwd]);

  const handleTab = useCallback(() => {
    const partial = input.trim().toLowerCase();
    if (!partial) return;
    const matches = ALL_COMMANDS.filter((c) => c.startsWith(partial));
    if (matches.length === 1) {
      setInput(matches[0]);
    } else if (matches.length > 1) {
      setHistory((h) => [
        ...h,
        {
          type: "output",
          text: "\n" + matches.join("  ") + "\n",
          id: nextId(),
        },
      ]);
    }
  }, [input]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand();
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      handleTab();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length) {
        const ni = Math.min(cmdIdx + 1, cmdHistory.length - 1);
        setCmdIdx(ni);
        setInput(cmdHistory[ni]);
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIdx > 0) {
        const ni = cmdIdx - 1;
        setCmdIdx(ni);
        setInput(cmdHistory[ni]);
      } else {
        setCmdIdx(-1);
        setInput("");
      }
    }
    if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setHistory([]);
    }
  };

  return (
    <WindowWrapper
      id={16}
      title="MS-DOS Prompt"
      icon="/icons/console-prompt.png"
      controls={{ close: true, minimize: true, maximize: true }}
      className="!w-[700px] !h-[500px]"
      crtEffect={false}
    >
      <div
        onClick={() => inputRef.current?.focus()}
        className="relative w-full h-full overflow-y-auto p-2"
        style={{
          background: bgColor,
          color: textColor,
          fontSize: 13,
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
          lineHeight: 1.45,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
          }}
        />

        {history.map((item) => {
          if (item.type === "input") {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                style={{ color: "#c8c8c8" }}
              >
                {item.text}
              </motion.div>
            );
          }
          if (item.type === "special") {
            if (item.mode === "matrix") return <MatrixEffect key={item.id} />;
            if (item.mode === "hack")
              return <HackSequence key={item.id} onDone={() => {}} />;
            if (item.mode === "restart")
              return (
                <RestartAnim
                  key={item.id}
                  onDone={() =>
                    setHistory(
                      BOOT_MESSAGES.map((m) => ({
                        type: "output" as const,
                        text: m,
                        id: nextId(),
                      })),
                    )
                  }
                />
              );
            return null;
          }
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.08 }}
            >
              {item.text}
            </motion.div>
          );
        })}

        <div className="flex items-center">
          <span className="flex-shrink-0">{cwd}&gt;&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            className="flex-1 bg-transparent outline-none min-w-0"
            style={{
              color: textColor,
              caretColor: textColor,
              fontFamily: "inherit",
              fontSize: "inherit",
            }}
          />
        </div>

        <div ref={endRef} />
      </div>
    </WindowWrapper>
  );
}
