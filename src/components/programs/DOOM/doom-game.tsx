"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { GameEngine } from "./game-engine";
import { MAX_AMMO, BATTERY_MAX } from "./constants";
import { GUN_SPRITE_DATA } from "./sprite-data";
import type { HUDState, FlashType, GamePhase, GunAnimState } from "./types";
import { closeWindow, maximizeWindow } from "@/store/window-manager-slice";
import { useAppDispatch } from "@/store/store";
import { Win98Button } from "@/components/shared/win-98-button";

const FRAME: Record<GunAnimState, { x: string; y: string }> = {
  idle: { x: "0%", y: "-2%" },

  fire: { x: "50%", y: "48%" },

  reload0: { x: "0%", y: "90%" },
  reload1: { x: "50%", y: "90%" },
  reload2: { x: "100%", y: "90%" },
};

const GunSprite: React.FC<{
  state: GunAnimState;
  recoil: boolean;
}> = ({ state, recoil }) => {
  const { x, y } = FRAME[state];

  return (
    <div
      className="w-full pb-[66.7%] relative"
      style={{
        transform: recoil
          ? "translateY(-18px) scale(1.05)"
          : "translateY(0px) scale(1)",
        transition: "transform 0.08s ease-out",
        imageRendering: "pixelated",
      }}
    >
      <div
        className="absolute inset-0 left-[150px]"
        style={{
          backgroundImage: `url("${GUN_SPRITE_DATA}")`,
          backgroundSize: "300% 300%",
          backgroundPosition: `${x} ${y}`,
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
};

const BatteryBar: React.FC<{ pct: number; on: boolean }> = ({ pct, on }) => {
  const color = pct > 50 ? "#00cc00" : pct > 20 ? "#ffaa00" : "#ff2200";
  return (
    <div className="flex flex-col items-center gap-[2px] min-w-[56px]">
      <div className="text-[9px] text-[#555] tracking-[0.08em]">
        {on ? "DRAINING" : "CHARGING"}
      </div>
      <div className="flex items-center gap-[1px]">
        <div className="w-[30px] h-[13px] border-2 border-[#666] bg-[#222] flex gap-[1px] p-[1px] overflow-hidden shadow-inner">
          {[20, 40, 60, 80, 100].map((thresh) => (
            <div
              key={thresh}
              style={{
                flex: 1,
                background: pct >= thresh ? color : "#333",
                transition: "background 0.4s",
              }}
            />
          ))}
        </div>
        <div className="w-[3px] h-[6px] bg-[#666]" />
      </div>
      <div className="text-[9px] font-bold">{Math.round(pct)}%</div>
    </div>
  );
};

const ReloadBar: React.FC<{ gunState: GunAnimState }> = ({ gunState }) => {
  const labels: Partial<Record<GunAnimState, string>> = {
    reload0: "RAISING…",
    reload1: "INSERTING FLOPPY…",
    reload2: "LOADING…",
  };
  const label = labels[gunState];
  if (!label) return null;
  const prog = gunState === "reload0" ? 20 : gunState === "reload1" ? 55 : 88;
  return (
    <div
      className="absolute top-[60%] left-[50%] text-center pointer-events-none"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <div className="bg-[rgba(0,0,80,0.85)] border-2 border-[#0000cc] p-[8px_18px] shadow-[inset_1px_1px_#4466ff]">
        <div className="text-[#aaaaff] text-[11px] tracking-[0.15em] mb-[6px]">
          {label}
        </div>
        <div className="w-[180px] h-[10px] bg-[#111] border border-[#333] overflow-hidden">
          <div
            className="h-full bg-[#0000ff] transform transition-[width_0.25s] shadow-[0_0_6px_#4466ff]"
            style={{
              width: `${prog}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default function DoomGame() {
  const mountRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<GameEngine | null>(null);

  const dispatch = useAppDispatch();

  const [phase, setPhase] = useState<GamePhase>("start");
  const [hud, setHud] = useState<HUDState>({
    hp: 100,
    ammo: MAX_AMMO,
    kills: 0,
    score: 0,
    difficulty: 0,
    battery: BATTERY_MAX,
    flashlightOn: true,
    reloading: false,
  });
  const [flash, setFlash] = useState<FlashType | null>(null);
  const [active, setActive] = useState(false);
  const [gunState, setGunState] = useState<GunAnimState>("idle");

  const triggerFlash = useCallback((type: FlashType, ms: number) => {
    setFlash(type);
    setTimeout(() => setFlash(null), ms);
  }, []);

  const handleMaximize = () => dispatch(maximizeWindow(15));

  useEffect(() => {
    if (phase !== "playing") return;
    const el = mountRef.current;
    if (!el) return;

    const engine = new GameEngine(el, {
      onHUDUpdate: (s) => setHud(s),
      onFlash: (t, ms) => triggerFlash(t, ms),
      onGunStateChange: (state) => setGunState(state),
      onGameOver: () => setPhase("dead"),
      onMouseActiveChange: (v) => setActive(v),
    });
    engineRef.current = engine;
    engine.start();
    return () => {
      engine.stop();
      engineRef.current = null;
    };
  }, [phase, triggerFlash]);

  const mono = "'Courier New',monospace";
  const w98win = (extra?: React.CSSProperties): React.CSSProperties => ({
    background: "#c0c0c0",
    boxShadow:
      "inset -1px -1px #000,inset 1px 1px #fff,inset -2px -2px #808080,inset 2px 2px #dfdfdf,4px 4px 0 #000",
    ...extra,
  });

  if (phase === "start")
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center select-none relative overflow-hidden">
        <div className="w-full h-full" style={{ ...w98win() }}>
          <div className="px-4 py-5">
            <div className="bg-[#000080] px-[10px] py-[14px] mb-3 shadow-[inset_1px_1px_#808080,inset_-1px_-1px_#fff]">
              <div className="text-white text-[clamp(24px,5vw,38px)] font-bold tracking-[0.1em] leading-[1.1] text-shadow-[2px_2px_#000,0_0_12px_#4488ff]">
                98.DOOM
              </div>
              <div className="text-[#aaaaff] text-[11px] tracking-[0.25em] mt-[2px]">
                INFINITE EDITION — v1.0
              </div>
            </div>

            <div className="bg-white border border-gray-500 p-[8px_10px] mb-2 text-[11px] shadow-[inset_1px_1px_#808080]">
              <div className="font-bold text-[#000080] mb-[5px]">CONTROLS</div>
              {[
                ["WASD / Arrows", "Move"],
                ["Mouse", "Look"],
                ["Click / Space", "Fire floppy disk"],
                ["R", "Reload (1.6 s animation)"],
                ["F", "Toggle flashlight"],
                ["ESC", "Release mouse"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between border-b-[#ddd] border-dotted last:border-0 py-[2px]"
                >
                  <span className="text-[#000080] font-bold">{k}</span>
                  <span className="text-[#333]">{v}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#ffffc0] border-[#aaaa00] px-[6px] py-[8px] mb-3 text-[#333]">
              ⚠ Flashlight battery drains while on (~28 s). Turn off to recharge
              (~17 s).
              <br />
              Difficulty increases every 40 sec — more enemies, faster, tougher.
            </div>

            <div className="flex justify-center gap-2">
              <Win98Button
                onClick={() => {
                  handleMaximize();
                  setHud({
                    hp: 100,
                    ammo: MAX_AMMO,
                    kills: 0,
                    score: 0,
                    difficulty: 0,
                    battery: BATTERY_MAX,
                    flashlightOn: true,
                    reloading: false,
                  });
                  setActive(false);
                  setGunState("idle");
                  setPhase("playing");
                }}
              >
                ▶ Play
              </Win98Button>
              <Win98Button onClick={() => {}}>Help</Win98Button>
              <Win98Button onClick={() => dispatch(closeWindow(15))}>
                Exit
              </Win98Button>
            </div>
          </div>
        </div>
      </div>
    );

  if (phase === "dead") {
    const errAddr = ((Math.random() * 0xffffff) | 0)
      .toString(16)
      .toUpperCase()
      .padStart(6, "0");
    return (
      <div className="w-full h-screen bg-[#0000AA] flex flex-col items-center justify-center text-white p-10 select-none">
        <div className="max-w-[620px] w-full">
          <div className="bg-white text-[#0000AA] px-0.5 py-2 block font-bold text-sm mb-6">
            98.DOOM
          </div>
          <div className="text-sm mb-5">
            A fatal exception{" "}
            <span className="bg-[#aaa] text-black px-0 py-1">0E</span> has
            occurred at 0028:
            <span
              className="bg-[#aaa] text-black px-0 py-1"
              style={{ background: "#aaa", color: "#000", padding: "0 4px" }}
            >
              {errAddr}
            </span>{" "}
            in VxD DOOM(01).
            <br />
            <br />
            The current player will be terminated.
            <br />
            <br />
            <span className="text-[#8888ff]">
              SCORE: <b>{hud.score}</b>&nbsp;&nbsp;&nbsp;KILLS:{" "}
              <b>{hud.kills}</b>&nbsp;&nbsp;&nbsp;THREAT LVL:{" "}
              <b>{hud.difficulty}</b>
            </span>
          </div>
          <div className="text-[12px] mb-5 text-[#ccc]">
            * Press any key to terminate the current game.
            <br />
            * Press CTRL+ALT+DEL to restart your computer. You
            <br />
            &nbsp;&nbsp;will lose any unsaved data in all applications.
          </div>
          <div
            onClick={() => {
              handleMaximize();
              setHud({
                hp: 100,
                ammo: MAX_AMMO,
                kills: 0,
                score: 0,
                difficulty: 0,
                battery: BATTERY_MAX,
                flashlightOn: true,
                reloading: false,
              });
              setActive(false);
              setGunState("idle");
              setPhase("start");
            }}
            className="bg-[#aaa] text-[#0000AA] px-1 py-[10px] block cursor-pointer text-sm font-bold animate-pulse"
          >
            Press any key to continue _
          </div>
        </div>
        <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
      </div>
    );
  }

  const hpColor = hud.hp > 60 ? "#00cc00" : hud.hp > 30 ? "#ffaa00" : "#ff2200";
  const threatColor =
    hud.difficulty < 4 ? "#00cc00" : hud.difficulty < 8 ? "#ffaa00" : "#ff2200";
  const isReloading = gunState.startsWith("reload");

  return (
    <div
      className="w-full h-screen relative overflow-hidden bg-black"
      style={{ cursor: active ? "none" : "default" }}
    >
      <div ref={mountRef} className="size-full" />

      {flash === "damage" && (
        <div className="absolute inset-0 pointer-events-none bg-[rgba(180,0,0,0.28)] border-t-[4px] border-solid border-red" />
      )}
      {flash === "muzzle" && (
        <div className="absolute inset-0 pointer-events-none bg-[rgba(255,255,180,0.07)]" />
      )}
      {hud.hp < 30 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center,transparent 40%,rgba(160,0,0,0.35) 100%)",
            animation: "blink 0.7s infinite",
          }}
        />
      )}

      {!hud.flashlightOn && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center,rgba(0,0,0,0.5) 20%,rgba(0,0,0,0.92) 100%)",
          }}
        />
      )}
      {hud.flashlightOn && hud.battery < 15 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "rgba(0,0,0,0.14)",
            animation: "blink 0.18s infinite",
          }}
        />
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center,transparent 48%,rgba(0,0,0,0.65) 100%)",
        }}
      />

      <div
        className="absolute top-[48%] left-[50%] pointer-events-none"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22">
          <line x1="11" y1="1" x2="11" y2="8" stroke="#fff" strokeWidth="1.5" />
          <line
            x1="11"
            y1="14"
            x2="11"
            y2="21"
            stroke="#fff"
            strokeWidth="1.5"
          />
          <line x1="1" y1="11" x2="8" y2="11" stroke="#fff" strokeWidth="1.5" />
          <line
            x1="14"
            y1="11"
            x2="21"
            y2="11"
            stroke="#fff"
            strokeWidth="1.5"
          />
          <rect
            x="8"
            y="8"
            width="6"
            height="6"
            fill="none"
            stroke="#aaaaff"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="absolute bottom-[38px] left-[44.02%] transform translate-x-[-50%] w-[70%] max-w-[640px] pointer-events-none">
        <GunSprite state={gunState} recoil={gunState === "fire"} />
      </div>

      {isReloading && <ReloadBar gunState={gunState} />}

      <div className="absolute bg-[#c0c0c0] bottom-0 left-0 right-0 h-[45px] flex items-center gap-[5px] px-[6px] pointer-events-none text-[12px] shadow-[inset_0_1px_#fff,inset_0_-1px_#808080,0_-2px_#000]">
        <div className="flex items-center gap-1 py-0.5 px-[6px] shadow-[inset_1px_1px_#808080,inset_-1px_-1px_#fff] min-w-[116px]">
          <span className="font-bold text-sm" style={{ color: hpColor }}>
            ♥
          </span>
          <div className="flex-1 h-[10px] bg-[#808080] shadow-[inset_1px_1px_#000] overflow-hidden">
            <div
              style={{
                width: `${hud.hp}%`,
                height: "100%",
                background: hpColor,
                transition: "width 0.15s",
              }}
            />
          </div>
          <span
            className="font-bold text-right min-w-[22px]"
            style={{
              color: hpColor,
            }}
          >
            {hud.hp}
          </span>
        </div>

        <div className="flex flex-1 text-white justify-center gap-[10px] py-0.5 px-2 shadow-[inset_1px_1px_#000088,inset_-1px_-1px_#4488ff]">
          <span>
            SCORE{" "}
            <b className="text-[#ffff00]">
              {hud.score.toString().padStart(6, "0")}
            </b>
          </span>
          <span>
            KILLS <b className="text-[#ffff00]">{hud.kills}</b>
          </span>
        </div>

        <div className="py-0.5 px-[6px] shadow-[inset_1px_1px_#808080,inset_-1px_-1px_#fff] text-center min-w-[76px]">
          <div style={{ fontSize: 9, color: "#555" }}>THREAT</div>
          <div style={{ fontWeight: "bold", color: threatColor, fontSize: 13 }}>
            {"▲".repeat(Math.min(hud.difficulty + 1, 5))}
          </div>
        </div>

        <div className="py-0.5 px-[6px] shadow-[inset_1px_1px_#808080,inset_-1px_-1px_#fff] flex items-center gap-1">
          <div
            className="text-[10px] font-bold"
            style={{
              color: hud.flashlightOn ? "#006600" : "#888",
            }}
          >
            {hud.flashlightOn ? "🔦 ON" : "🔦 OFF"}
          </div>
          <BatteryBar pct={hud.battery} on={hud.flashlightOn} />
          <div className="text-[8px] text-[#444]">[F]</div>
        </div>

        <div className="flex items-center gap-[3px] py-0.5 px-[6px] shadow-[inset_1px_1px_#808080,inset_-1px_-1px_#fff]">
          <div
            className="flex gap-0.5 flex-wrap w-[62px]"
          >
            {Array.from({ length: MAX_AMMO }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 10,
                  height: 12,
                  background: i < hud.ammo ? "#1a1a6a" : "#aaa",
                  border: `1px solid ${i < hud.ammo ? "#4444aa" : "#666"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 5,
                  color: i < hud.ammo ? "#6688ff" : "#ccc",
                }}
              >
                {i < hud.ammo ? "▬" : ""}
              </div>
            ))}
          </div>
          {isReloading && (
            <span
              style={{
                color: "#0000cc",
                fontSize: 10,
                fontWeight: "bold",
                animation: "blink 0.4s infinite",
              }}
            >
              R…
            </span>
          )}
          {hud.ammo === 0 && !isReloading && (
            <span
              style={{
                color: "#cc0000",
                fontSize: 9,
                animation: "blink 0.5s infinite",
              }}
            >
              [R]
            </span>
          )}
        </div>
      </div>

      {!active && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            ...w98win({ width: 320 }),
          }}
        >
          <div
            style={{ padding: "16px", textAlign: "center", fontFamily: mono }}
          >
            <div style={{ fontSize: 13, marginBottom: 8, color: "#000" }}>
              Click to activate mouse look
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#555",
                marginBottom: 14,
                lineHeight: 1.9,
              }}
            >
              Move mouse to aim · Click to fire floppy
              <br />
              WASD move · R reload · F flashlight · ESC release
            </div>
            <Win98Button
              onClick={() => engineRef.current?.setMouseActive(true)}
            >
              ▶ OK
            </Win98Button>
          </div>
        </div>
      )}

      {active && (
        <div
          style={{
            position: "absolute",
            top: 6,
            right: 8,
            background: "#000080",
            color: "#fff",
            padding: "2px 8px",
            fontSize: 10,
            fontFamily: mono,
            boxShadow: "inset 1px 1px #4466ff,inset -1px -1px #000",
            letterSpacing: "0.1em",
            pointerEvents: "none",
          }}
        >
          ● ACTIVE · ESC
        </div>
      )}

      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );
}
