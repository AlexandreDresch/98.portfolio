"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { GameEngine } from "./game-engine";
import { MAX_AMMO, BATTERY_MAX } from "./constants";
import { GUN_SPRITE_DATA } from "./sprite-data";
import type { HUDState, FlashType, GamePhase, GunAnimState } from "./types";
import { closeWindow } from "@/store/window-manager-slice";
import { useAppDispatch } from "@/store/store";

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
      style={{
        width: "100%",
        paddingBottom: "66.7%",
        position: "relative",
        transform: recoil
          ? "translateY(-18px) scale(1.05)"
          : "translateY(0px) scale(1)",
        transition: "transform 0.08s ease-out",
        imageRendering: "pixelated",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("${GUN_SPRITE_DATA}")`,
          backgroundSize: "300% 300%",
          backgroundPosition: `${x} ${y}`,
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
};

const W98Btn: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({
  onClick,
  children,
}) => (
  <button
    onClick={onClick}
    style={{
      padding: "5px 16px",
      fontFamily: "'Courier New',monospace",
      fontSize: 13,
      background: "#c0c0c0",
      color: "#000",
      border: "none",
      cursor: "pointer",
      userSelect: "none",
      boxShadow:
        "inset -1px -1px #000,inset 1px 1px #fff,inset -2px -2px #808080,inset 2px 2px #dfdfdf",
    }}
    onMouseDown={(e) => {
      (e.currentTarget as HTMLButtonElement).style.boxShadow =
        "inset 1px 1px #000,inset -1px -1px #fff,inset 2px 2px #808080,inset -2px -2px #dfdfdf";
    }}
    onMouseUp={(e) => {
      (e.currentTarget as HTMLButtonElement).style.boxShadow =
        "inset -1px -1px #000,inset 1px 1px #fff,inset -2px -2px #808080,inset 2px 2px #dfdfdf";
    }}
  >
    {children}
  </button>
);

const BatteryBar: React.FC<{ pct: number; on: boolean }> = ({ pct, on }) => {
  const color = pct > 50 ? "#00cc00" : pct > 20 ? "#ffaa00" : "#ff2200";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        minWidth: 56,
      }}
    >
      <div
        style={{
          fontSize: 9,
          color: "#555",
          fontFamily: "'Courier New',monospace",
          letterSpacing: "0.08em",
        }}
      >
        {on ? "DRAINING" : "CHARGING"}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
        <div
          style={{
            width: 30,
            height: 13,
            border: "2px solid #666",
            background: "#222",
            display: "flex",
            gap: "1px",
            padding: "1px",
            overflow: "hidden",
            boxShadow: "inset 1px 1px #888",
          }}
        >
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
        <div style={{ width: 3, height: 6, background: "#666" }} />
      </div>
      <div
        style={{
          fontSize: 9,
          color,
          fontFamily: "'Courier New',monospace",
          fontWeight: "bold",
        }}
      >
        {Math.round(pct)}%
      </div>
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
      style={{
        position: "absolute",
        top: "60%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        fontFamily: "'Courier New',monospace",
        textAlign: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(0,0,80,0.85)",
          border: "2px solid #0000cc",
          padding: "8px 18px",
          boxShadow: "inset 1px 1px #4466ff",
        }}
      >
        <div
          style={{
            color: "#aaaaff",
            fontSize: 11,
            letterSpacing: "0.15em",
            marginBottom: 6,
          }}
        >
          {label}
        </div>
        <div
          style={{
            width: 180,
            height: 10,
            background: "#111",
            border: "1px solid #333",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${prog}%`,
              height: "100%",
              background: "#0000ff",
              transition: "width 0.25s",
              boxShadow: "0 0 6px #4466ff",
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
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "#008080",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: mono,
          userSelect: "none",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div style={{ ...w98win(), width: "100%", height: "100%" }}>
          <div style={{ padding: "16px 20px" }}>
            <div
              style={{
                background: "#000080",
                padding: "10px 14px",
                marginBottom: 12,
                boxShadow: "inset 1px 1px #808080,inset -1px -1px #fff",
              }}
            >
              <div
                style={{
                  color: "#fff",
                  fontSize: "clamp(24px,5vw,38px)",
                  fontWeight: "bold",
                  letterSpacing: "0.1em",
                  textShadow: "2px 2px #000,0 0 12px #4488ff",
                }}
              >
                98.DOOM
              </div>
              <div
                style={{
                  color: "#aaaaff",
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  marginTop: 2,
                }}
              >
                INFINITE EDITION — v1.0
              </div>
            </div>

            <div
              style={{
                background: "#fff",
                border: "1px solid #808080",
                padding: "8px 10px",
                marginBottom: 10,
                fontSize: 11,
                boxShadow: "inset 1px 1px #808080",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  color: "#000080",
                  marginBottom: 5,
                }}
              >
                CONTROLS
              </div>
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
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px dotted #ddd",
                    lineHeight: 2,
                  }}
                >
                  <span style={{ color: "#000080", fontWeight: "bold" }}>
                    {k}
                  </span>
                  <span style={{ color: "#333" }}>{v}</span>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "#ffffc0",
                border: "1px solid #aaaa00",
                padding: "6px 8px",
                marginBottom: 12,
                fontSize: 10,
                color: "#333",
              }}
            >
              ⚠ Flashlight battery drains while on (~28 s). Turn off to recharge
              (~17 s).
              <br />
              Difficulty increases every 40 sec — more enemies, faster, tougher.
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
              <W98Btn
                onClick={() => {
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
              </W98Btn>
              <W98Btn onClick={() => {}}>Help</W98Btn>
              <W98Btn onClick={() => dispatch(closeWindow(15))}>Exit</W98Btn>
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
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "#0000AA",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: mono,
          color: "#fff",
          padding: 40,
          userSelect: "none",
        }}
      >
        <div style={{ maxWidth: 620, width: "100%" }}>
          <div
            style={{
              background: "#fff",
              color: "#0000AA",
              padding: "2px 8px",
              display: "inline-block",
              fontWeight: "bold",
              fontSize: 14,
              marginBottom: 22,
            }}
          >
            98.DOOM
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
            A fatal exception{" "}
            <span
              style={{ background: "#aaa", color: "#000", padding: "0 4px" }}
            >
              0E
            </span>{" "}
            has occurred at 0028:
            <span
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
            <span style={{ color: "#8888ff" }}>
              SCORE: <b>{hud.score}</b>&nbsp;&nbsp;&nbsp;KILLS:{" "}
              <b>{hud.kills}</b>&nbsp;&nbsp;&nbsp;THREAT LVL:{" "}
              <b>{hud.difficulty}</b>
            </span>
          </div>
          <div
            style={{
              fontSize: 12,
              lineHeight: 2.2,
              marginBottom: 28,
              color: "#ccc",
            }}
          >
            * Press any key to terminate the current game.
            <br />
            * Press CTRL+ALT+DEL to restart your computer. You
            <br />
            &nbsp;&nbsp;will lose any unsaved data in all applications.
          </div>
          <div
            onClick={() => {
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
            style={{
              background: "#aaa",
              color: "#0000AA",
              padding: "4px 10px",
              display: "inline-block",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: "bold",
              animation: "blink 1s step-start infinite",
            }}
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
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "#000",
        cursor: active ? "none" : "default",
      }}
    >
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />

      {flash === "damage" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "rgba(180,0,0,0.28)",
            borderTop: "4px solid red",
          }}
        />
      )}
      {flash === "muzzle" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "rgba(255,255,180,0.07)",
          }}
        />
      )}
      {hud.hp < 30 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at center,transparent 40%,rgba(160,0,0,0.35) 100%)",
            animation: "blink 0.7s infinite",
          }}
        />
      )}

      {!hud.flashlightOn && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at center,rgba(0,0,0,0.5) 20%,rgba(0,0,0,0.92) 100%)",
          }}
        />
      )}
      {hud.flashlightOn && hud.battery < 15 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "rgba(0,0,0,0.14)",
            animation: "blink 0.18s infinite",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center,transparent 48%,rgba(0,0,0,0.65) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
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

      <div
        style={{
          position: "absolute",
          bottom: 38,
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          maxWidth: 640,
          pointerEvents: "none",
        }}
      >
        <GunSprite state={gunState} recoil={gunState === "fire"} />
      </div>

      {isReloading && <ReloadBar gunState={gunState} />}

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 45,
          background: "#c0c0c0",
          boxShadow: "inset 0 1px #fff,inset 0 -1px #808080,0 -2px #000",
          display: "flex",
          alignItems: "center",
          padding: "0 6px",
          gap: 5,
          fontFamily: mono,
          fontSize: 12,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "2px 6px",
            boxShadow: "inset 1px 1px #808080,inset -1px -1px #fff",
            minWidth: 116,
          }}
        >
          <span style={{ color: hpColor, fontWeight: "bold", fontSize: 15 }}>
            ♥
          </span>
          <div
            style={{
              flex: 1,
              height: 10,
              background: "#808080",
              boxShadow: "inset 1px 1px #000",
              overflow: "hidden",
            }}
          >
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
            style={{
              color: hpColor,
              fontWeight: "bold",
              minWidth: 22,
              textAlign: "right",
            }}
          >
            {hud.hp}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            padding: "2px 8px",
            background: "#000080",
            color: "#fff",
            boxShadow: "inset 1px 1px #000088,inset -1px -1px #4488ff",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <span>
            SCORE{" "}
            <b style={{ color: "#ffff00" }}>
              {hud.score.toString().padStart(6, "0")}
            </b>
          </span>
          <span>
            KILLS <b style={{ color: "#ffff00" }}>{hud.kills}</b>
          </span>
        </div>

        <div
          style={{
            padding: "2px 6px",
            boxShadow: "inset 1px 1px #808080,inset -1px -1px #fff",
            textAlign: "center",
            minWidth: 76,
          }}
        >
          <div style={{ fontSize: 9, color: "#555" }}>THREAT</div>
          <div style={{ fontWeight: "bold", color: threatColor, fontSize: 13 }}>
            {"▲".repeat(Math.min(hud.difficulty + 1, 5))}
          </div>
        </div>

        <div
          style={{
            padding: "2px 6px",
            boxShadow: "inset 1px 1px #808080,inset -1px -1px #fff",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: hud.flashlightOn ? "#006600" : "#888",
              fontWeight: "bold",
            }}
          >
            {hud.flashlightOn ? "🔦 ON" : "🔦 OFF"}
          </div>
          <BatteryBar pct={hud.battery} on={hud.flashlightOn} />
          <div style={{ fontSize: 8, color: "#444" }}>[F]</div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            padding: "2px 6px",
            boxShadow: "inset 1px 1px #808080,inset -1px -1px #fff",
          }}
        >
          <div style={{ display: "flex", gap: 2, flexWrap: "wrap", width: 62 }}>
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
            <W98Btn onClick={() => engineRef.current?.setMouseActive(true)}>
              ▶ OK
            </W98Btn>
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
