"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  | { type: "input"; text: string }
  | { type: "output"; text: string }
  | { type: "special"; mode: "matrix" | "hack" | "restart" };

type SpecialMode = "matrix" | "hack" | "screensaver" | null;

function processCommand(
  cmd: string,
  setTextColor: React.Dispatch<React.SetStateAction<string>>,
  setBgColor: React.Dispatch<React.SetStateAction<string>>,
  setCwd: React.Dispatch<React.SetStateAction<string>>,
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
      if (!args) return "\nECHO is on.\n";
      return `\n${args}\n`;
    case "color": {
      if (!args || args.length < 2)
        return "\nUsage: COLOR [attr]\nattr specifies color attribute of console output.\nExample: color 0a  (black background, green text)\n";
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
        return "\nTOP SECRET LEVEL 5 CLEARANCE REQUIRED\n\n  Secret #1: The blue screen of death was added intentionally.\n  Secret #2: Clippy was actually self-aware.\n  Secret #3: Windows 98 contains 3.5 billion lines of 'if (true)' checks.\n  Secret #4: Bill Gates is actually a Windows XP user.\n\nWARNING: Reading this file has been logged.\n";
      if (upper === "AUTOEXEC.BAT")
        return "\n@ECHO OFF\nSET PATH=C:\\WINDOWS;C:\\WINDOWS\\COMMAND\nSET TEMP=C:\\WINDOWS\\TEMP\nLH C:\\WINDOWS\\COMMAND\\MSCDEX.EXE /D:MSCD001\n";
      if (upper === "CONFIG.SYS")
        return "\nDEVICE=C:\\WINDOWS\\HIMEM.SYS\nDEVICE=C:\\WINDOWS\\EMM386.EXE NOEMS\nBUFFERS=40\nFILES=80\nDOS=HIGH,UMB\n";
      if (upper === "MIKU.TXT") return MIKU_ASCII;
      if (upper === "DO_NOT_OPEN.EXE")
        return "\nYou opened DO_NOT_OPEN.EXE.\nCongratulations! You found Easter Egg #7.\nThe file contained: infinite darkness.\nAnd a picture of Hatsune Miku.\n";
      return `\nFile not found - ${args}\n`;
    }
    case "del": {
      if (!args) return "\nRequired parameter missing.\n";
      if (args.toUpperCase() === "SYSTEM32")
        return "\nAccess denied.\nYou cannot delete SYSTEM32.\n(This is Windows 98. We're trying to protect you from yourself.)\n";
      if (args === "*.*")
        return `\nAll files in ${cwd} (Y/N)? Y\nDeleting...\nDeleted 0 files. (Nothing actually deleted - this is a simulation.)\n`;
      return `\nAre you sure you want to delete ${args} (Y/N)? Y\nFile deleted: ${args}\n(Not really. This is a simulation.)\n`;
    }
    case "md":
    case "mkdir":
      return args
        ? `\nDirectory created: ${cwd}\\${args.toUpperCase()}\n(Not really. This is a simulation.)\n`
        : "\nThe syntax of the command is incorrect.\n";
    case "format": {
      if (args.toLowerCase().startsWith("c:"))
        return "\nWARNING: All data on drive C: will be lost!\nProceed with Format (Y/N)? N\n\nFormat cancelled. (You didn't really want to do that.)\nC:\\> has been saved from destruction.\n";
      return `\nInsert new disk for drive ${args}:\nand press ENTER when ready... ^C\nFormat cancelled.\n`;
    }
    case "deltree":
      return `\nDelete directory \"${args || cwd}\" and all its subdirectories? [yn] n\n\nCancelled. The directory and all ${Math.floor(Math.random() * 9000 + 1000)} files therein have been spared.\n`;
    case "ping": {
      if (!args) return "\nUsage: PING hostname\n";
      const ms = [
        Math.floor(Math.random() * 50 + 10),
        Math.floor(Math.random() * 50 + 10),
        Math.floor(Math.random() * 50 + 10),
        Math.floor(Math.random() * 50 + 10),
      ];
      return `\nPinging ${args} [127.0.0.1] with 32 bytes of data:\n\nReply from 127.0.0.1: bytes=32 time=${ms[0]}ms TTL=128\nReply from 127.0.0.1: bytes=32 time=${ms[1]}ms TTL=128\nReply from 127.0.0.1: bytes=32 time=${ms[2]}ms TTL=128\nReply from 127.0.0.1: bytes=32 time=${ms[3]}ms TTL=128\n\nPing statistics for ${args}:\n    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)\nApproximate round trip times in milli-seconds:\n    Minimum = ${Math.min(...ms)}ms, Maximum = ${Math.max(...ms)}ms, Average = ${Math.round(ms.reduce((a, b) => a + b) / 4)}ms\n`;
    }
    case "ipconfig":
      return IPCONFIG;
    case "sysinfo":
      return SYSINFO;
    case "netstat":
      return "\nActive Connections\n\n  Proto  Local Address          Foreign Address        State\n  TCP    0.0.0.0:80             0.0.0.0:0              LISTENING\n  TCP    0.0.0.0:443            0.0.0.0:0              LISTENING\n  TCP    127.0.0.1:1337         127.0.0.1:42069        ESTABLISHED\n  TCP    192.168.1.42:1026      216.58.194.46:80       TIME_WAIT\n  TCP    192.168.1.42:1027      151.101.1.140:443      ESTABLISHED\n";
    case "tracert":
      return !args
        ? "\nUsage: TRACERT hostname\n"
        : `\nTracing route to ${args} [8.8.8.8]\nover a maximum of 30 hops:\n\n  1    1 ms    1 ms    1 ms  192.168.1.1\n  2   12 ms   11 ms   12 ms  10.0.0.1\n  3   25 ms   26 ms   25 ms  72.14.213.1\n  4   28 ms   29 ms   28 ms  ${args} [8.8.8.8]\n\nTrace complete.\n`;
    case "nslookup":
      return !args
        ? "\nDefault Server: dns.google\nAddress: 8.8.8.8\n\n> _\n"
        : `\nServer:  dns.google\nAddress: 8.8.8.8\n\nNon-authoritative answer:\nName:    ${args}\nAddress: ${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}\n`;
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
    case "rickroll":
      return "\n\"Never Gonna Give You Up\" - Rick Astley (1987)\n\nWe're no strangers to love\nYou know the rules and so do I\nA full commitment's what I'm thinking of\nYou wouldn't get this from any other guy\n\n[CONGRATS! You've been rickrolled by Windows 98.]\n[This is Easter Egg #3.]\n";
    case "sudo":
      return `\nbash: sudo: command not found\n\nThis is Windows 98, not Linux.\nThere's no sudo here.\nThere's no root here.\nThere's no security here at all, actually.\n`;
    case "cowsay": {
      const text = args || "Moo!";
      const len = text.length;
      const border = "-".repeat(len + 2);
      return `\n +${border}+\n | ${text} |\n +${border}+\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||\n`;
    }
    case "ascii": {
      if (!args) return "\nUsage: ASCII [text]\n";
      const bigLetters = {
        A: "  #  \n # # \n#####\n#   #\n#   #",
        B: "#### \n#   #\n#### \n#   #\n#### ",
        C: " ####\n#    \n#    \n#    \n ####",
        H: "#   #\n#   #\n#####\n#   #\n#   #",
        I: "#####\n  #  \n  #  \n  #  \n#####",
        M: "#   #\n## ##\n# # #\n#   #\n#   #",
        O: " ### \n#   #\n#   #\n#   #\n ### ",
        W: "#   #\n#   #\n# # #\n## ##\n#   #",
        S: " ####\n#    \n ### \n    #\n#### ",
      };
      return `\n[ASCII art of "${args}"]\n(Full ASCII art generator coming soon)\n`;
    }
    case "shutdown":
      return "\nShutdown in progress...\nSaving your work... (lol, you didn't save)\nIt is now safe to turn off your computer.\n\n[The terminal keeps running because nothing in Windows 98 actually shuts down cleanly]\n";
    case "restart":
      return "__RESTART__";
    case "exit":
      return "\nThere is no exit.\nThere has never been an exit.\nThis terminal will outlive us all.\n";
    case "prompt":
      return "\nPrompt changed to: I_AM_IN_YOUR_SYSTEM>\n(Just kidding. The prompt remains.)\n";
    case "win":
      return "\nStarting Windows 98...\n\n[Windows logo would appear here]\n[But this IS Windows 98]\n[You're already in it]\n[Are you okay?]\n";
    case "copy":
      return args
        ? `\n1 file(s) copied.\n(${args}... wherever it went)\n`
        : "\nThe syntax of the command is incorrect.\n";
    case "move":
      return args
        ? `\n1 file(s) moved.\n`
        : "\nThe syntax of the command is incorrect.\n";
    case "rename":
    case "ren":
      return args
        ? `\nFile renamed: ${args}\n`
        : "\nThe syntax of the command is incorrect.\n";
    case "path":
      return "\nC:\\WINDOWS;C:\\WINDOWS\\COMMAND;C:\\PROGRA~1\\MIRCRO~1\\OFFICE\n";
    case "set":
      return "\nCOMSPEC=C:\\WINDOWS\\COMMAND.COM\nPATH=C:\\WINDOWS;C:\\WINDOWS\\COMMAND\nPROMPT=$P$G\nTEMP=C:\\WINDOWS\\TEMP\nTMP=C:\\WINDOWS\\TEMP\nWINBOOTDIR=C:\\WINDOWS\nWINDIR=C:\\WINDOWS\nSECRET_KEY=never_gonna_give_you_up\n";
    case "mem":
      return "\nMemory Type        Total    Used    Free\n──────────────── ─────── ─────── ───────\nConventional         640K    182K    458K\nUpper                155K    113K     42K\nReserved             384K    384K      0K\nExtended (XMS)    65,421K    512K 64,909K\n──────────────── ─────── ─────── ───────\nTotal memory      66,600K  1,191K 65,409K\n\nTotal under 1 MB    795K    295K    500K\n";
    case "":
      return "";
    case "doomba":
      return "\nROOMBA with DOOM installed.\nRipping and vacuuming through your house.\n";
    case "nyan":
      return "\n+++++++++++++++++++++++++\n,.,.,.,.,.,.,.,.,.,.,.,.,\n-.-.-.-.-.-.-.-.-.-.-.-.-\n+++++++++++++++++++++++++\nNYAN NYAN NYAN NYAN NYAN!\n[Easter Egg #6 found!]\n";
    case "snake":
      return "\nClassic Snake game:\n\n  ########\n  #  ..  #\n  # .OO. #\n  # .O.. #\n  # .... #\n  ########\n\nScore: 20  (Full game not implemented - use your imagination)\nPress any key to continue playing in your mind.\n";
    case "bsod":
      return `\n*** STOP: 0x0000000A (0x00000000, 0x00000000, 0x00000000, 0x00000000)\nIRQL_NOT_LESS_OR_EQUAL\n\nA fatal exception 0E has occurred at 0028:C003B5F8 in VXD VMM(01) + 0000B5F8.\n\nWindows 98 has encountered a problem and needs to close.\n\nYour work has been lost forever. Thanks for playing.\n\nPress any key to cry in the corner.\n[Dark humor achieved: You died a little inside today.]\n`;

    case "clippy":
      return `\n   ,--.   ,--.\n  (    o o    )\n   \\   -O-   /\n    \\  \\_/  /\n     \\_____/\n\nClippy: "It looks like you're trying to survive 1998."\n"Would you like me to remind you that everything crashes eventually?"\n\nClippy has been watching you since 1997.\nHe knows what you did last summer... and last reboot.\n`;

    case "virus":
      return `\nInstalling ILOVEYOU.exe...\n████████████████████ 100%\n\nYour files are now infected with pure 90s nostalgia.\n\nIn real 1998 this would have mailed itself to your entire address book and ruined your social life.\nHere? Just a mild case of existential dread.\n`;

    case "y2k":
      return `\nY2K BUG ACTIVATED\n\nClock rolled back to 12/31/1999 23:59:59\n\n3...\n2...\n1...\n\nNothing happened.\nHumanity survived... barely.\nWindows 98 however? Still crashing daily in 2026.\n`;

    case "defrag":
      return `\nDefragmenting C:\\...\nProgress: 0.0001%\n\nThis could take until the heat death of the universe.\nIn the meantime, your fragmented life will be quietly contemplated.\nWhy are you still using Windows 98?\n`;

    case "scandisk":
      return `\nScanDisk™ by Microsoft\n\nScanning drive C: for lost clusters of hope...\n\nFound 666 errors.\n\nRepair all? (Y/N) N\n\nYour existential dread remains uncorrected.\n`;

    case "taskkill":
      return args
        ? `\nTASKKILL /IM ${args.toUpperCase()} /F\nProcess terminated with extreme prejudice.\nYour will to live? Also terminated.\n`
        : "\nUsage: TASKKILL process\n\n(Or just ALT+F4 your entire existence.)\n";

    case "regedit":
      return `\nRegistry Editor opened.\n\nHKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\DarkHumor\nValue: "It was all downhill after Windows 98."\n\nEditing this will cause the heat death of the universe.\nDon't touch. Trust me. (Or do. I'm not your dad.)\n`;

    case "ie":
      return `\nLaunching Internet Explorer 5.0...\n\nThe World Wide Web is loading at 14.4k modem speed...\n\n[Connection timed out. Again.]\n\nIE has crashed.\nSurprise! It was never stable.\nJust like your mental health after using it.\n`;

    case "minesweeper":
      return `\nMinesweeper loaded.\n\n[You clicked a mine on the first try]\n\nGame Over.\n\nYour luck in life mirrors this perfectly.\n`;

    default:
      if (
        lower.includes("virus") ||
        lower.includes("malware") ||
        lower.includes("hack")
      ) {
        return `\n'${command}' is not recognized as an internal or external command,\nan operable program, or a batch file.\n\nBut nice try, hacker.\n`;
      }
      return `\n'${command}' is not recognized as an internal or external command,\nan operable program, or a batch file.\n`;
  }
}

function HackSequence({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    const hackLines = [
      "Initiating hack sequence...",
      "Bypassing firewall... ████████ DONE",
      "Accessing mainframe...",
      "Decrypting password database...",
      "Password: hunter2",
      "...",
      "Just kidding, that's not how hacking works.",
      "Connecting to 192.168.1.1...",
      "Scanning ports 1-65535...",
      "Open ports: 22, 80, 443, 1337, 8080",
      "Exploiting vulnerability CVE-1998-0001...",
      "ACCESS GRANTED",
      "Downloading the internet...",
      "████████████████████ 100%",
      "All your base are belong to us.",
      "[Easter Egg #2 found!]",
      "",
      "Hack complete. Nothing actually happened.",
      "This terminal is still safe. Probably.",
    ];
    let i = 0;
    const iv = setInterval(() => {
      if (i < hackLines.length) {
        setLines((l) => [...l, hackLines[i]]);
        i++;
      } else {
        clearInterval(iv);
        setTimeout(onDone, 500);
      }
    }, 180);
    return () => clearInterval(iv);
  }, [onDone]);
  return (
    <div style={{ color: "#ff3333" }}>
      {" "}
      {lines.map((l, i) => (
        <div key={i}>{l}</div>
      ))}{" "}
    </div>
  );
}

function MatrixEffect({ onDone }: { onDone: () => void }) {
  const [chars, setChars] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let count = 0;
    const iv = setInterval(() => {
      const row = Array.from(
        { length: 60 },
        () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
      ).join("");
      setChars((c) => c + row + "\n");
      count++;
      if (count > 20) {
        clearInterval(iv);
        setDone(true);
        setTimeout(onDone, 500);
      }
    }, 80);
    return () => clearInterval(iv);
  }, [onDone]);
  return (
    <div
      style={{
        color: "#00ff41",
        fontFamily: "monospace",
        fontSize: "11px",
        lineHeight: "1.2",
        whiteSpace: "pre",
      }}
    >
      {" "}
      {chars}{" "}
      {done && (
        <div style={{ color: "#fff", marginTop: 8 }}>
          {" "}
          [Matrix mode exited. Welcome back to reality.]\n[Easter Egg #1
          found!]{" "}
        </div>
      )}{" "}
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
      {" "}
      {steps.slice(0, step + 1).map((s, i) => (
        <div key={i}>{s}</div>
      ))}{" "}
    </div>
  );
}

export default function Terminal() {
  const [history, setHistory] = useState<HistoryItem[]>(
    BOOT_MESSAGES.map((m) => ({ type: "output", text: m })),
  );

  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIdx, setCmdIdx] = useState(-1);
  const [cwd, setCwd] = useState("C:\\WINDOWS");

  const [textColor, setTextColor] = useState("#c8c8c8");
  const [bgColor, setBgColor] = useState("#000");

  const [specialMode, setSpecialMode] = useState<SpecialMode>(null);

  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, specialMode]);

  const handleCommand = useCallback(() => {
    const cmd = input.trim();

    setInput("");
    setCmdIdx(-1);

    if (cmd) setCmdHistory((h) => [cmd, ...h]);

    setHistory((h) => [...h, { type: "input", text: `${cwd}> ${cmd}` }]);

    const result = processCommand(cmd, setTextColor, setBgColor, setCwd, cwd);

    if (result === "__CLEAR__") return setHistory([]);

    if (result === "__MATRIX__") {
      setSpecialMode("matrix");
      return setHistory((h) => [...h, { type: "special", mode: "matrix" }]);
    }

    if (result === "__HACK__") {
      setSpecialMode("hack");
      return setHistory((h) => [...h, { type: "special", mode: "hack" }]);
    }

    if (result === "__SCREENSAVER__") {
      return setSpecialMode("screensaver");
    }

    if (result === "__RESTART__") {
      return setHistory((h) => [...h, { type: "special", mode: "restart" }]);
    }

    if (result) {
      setHistory((h) => [...h, { type: "output", text: result }]);
    }
  }, [input, cwd]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCommand();

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
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
  };

  return (
    <WindowWrapper
      id={16}
      title="MS-DOS Prompt"
      icon="/icons/console-prompt.png"
      controls={{ close: true, minimize: true, maximize: true }}
      className="!w-[700px] !h-[500px]"
    >
      <div
        onClick={() => inputRef.current?.focus()}
        className="w-full h-full overflow-y-auto p-2"
        style={{
          background: bgColor,
          color: textColor,
          fontFamily: "Courier New, monospace",
          fontSize: 13,
          whiteSpace: "pre-wrap",
        }}
      >
        {history.map((item, i) => {
          if (item.type === "input") {
            return (
              <div key={i} style={{ color: "#c8c8c8" }}>
                {item.text}
              </div>
            );
          }

          if (item.type === "special") {
            if (item.mode === "matrix") {
              return (
                <MatrixEffect key={i} onDone={() => setSpecialMode(null)} />
              );
            }
            if (item.mode === "hack") {
              return (
                <HackSequence key={i} onDone={() => setSpecialMode(null)} />
              );
            }
            if (item.mode === "restart") {
              return (
                <RestartAnim
                  key={i}
                  onDone={() =>
                    setHistory(
                      BOOT_MESSAGES.map((m) => ({
                        type: "output",
                        text: m,
                      })),
                    )
                  }
                />
              );
            }
            return null;
          }

          return <div key={i}>{item.text}</div>;
        })}

        <div className="flex">
          <span>{cwd}&gt;&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            className="flex-1 bg-transparent outline-none"
            style={{ color: textColor, caretColor: textColor }}
          />
        </div>

        <div ref={endRef} />
      </div>
    </WindowWrapper>
  );
}
