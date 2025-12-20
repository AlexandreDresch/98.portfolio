"use client";

import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useEffect } from "react";
import { Toast } from "../ui/toast";

export default function StartScreen() {
  const { toast, showToast } = useToast();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "f") {
        showToast(
          <div className="flex items-center gap-2 crt font-mono">
            <Image
              src="/images/pay-respect.gif"
              alt="Press F"
              width={24}
              height={24}
              className="w-24 h-auto pixelated"
            />

            <div className="text-xs text-slate-400">
              <p className="text-slate-100 font-semibold">Respect paid.</p>
              <p>You will be remembered.</p>
            </div>
          </div>,
          4000
        );
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showToast]);

  return (
    <main className="crt w-screen h-screen bg-black text-gray-500 flex p-10 relative text-xl lg:text-2xl font-semibold lg:p-20">
      <div className="w-full space-y-10">
        <div className="flex items-center gap-2">
          <Image
            src="/images/chip.png"
            alt="Computer Chip"
            width={70}
            height={70}
          />

          <div>
            <h1>Welcome to 98.portfolio</h1>
            <h3>Built with NextJs</h3>
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div>
            <p>File</p>
            <p>By</p>
          </div>

          <div className="w-[260.8px]">
            <p>:98.portfolio</p>
            <p>:Alexandre Dresch</p>
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div>
            <p>Specialist</p>
            <p>Stacks</p>
            <p>Languages</p>
          </div>

          <div>
            <p>:Fullstack Developer</p>
            <p>:React, Node, PostgreSQL</p>
            <p>:Portuguese, English</p>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end">
        <pre>
          {` 
 █████╗  █████╗ 
██╔══██╗██╔══██╗
╚██████║╚█████╔╝
 ╚═══██║██╔══██╗
 █████╔╝╚█████╔╝
 ╚════╝  ╚════╝ .portfolio
      `}
        </pre>
      </div>

      <div className="absolute bottom-20 left-20">
        <p>
          Press <span className="text-white">F</span> to pay respects
        </p>
        <p>
          Press <span className="text-white">Enter</span> load the project
        </p>
      </div>

      <div className="absolute bottom-20 right-20">
        <p className="max-w-[328px] text-sm">
          01010100 01101000 01100101 01110010 01100101 00100111 01110011
          00100000 01100001 00100000 01100110 01110101 01101110 01101110
          01111001 00100000 01101100 01101001 01110100 01110100 01101100
          01100101 00100000 01100111 01110101 01111001 00100000 01101001
          01101110 00100000 01101101 01111001 00100000 01100011 01101111
          01101101 01110000 01110101 01110100 01100101 01110010
        </p>
      </div>

      <Toast toast={toast} />
    </main>
  );
}
