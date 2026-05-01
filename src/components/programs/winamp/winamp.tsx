import Script from "next/script";
import { useState, useEffect, useRef, useCallback } from "react";

import WindowWrapper from "@/components/shared/window-wrapper";

import { extractVideoId, fmtTime, getColor } from "./utils";
import { cn } from "@/lib/utils";
import { ledBoxStyle, titleBarStyle, winStyle } from "./styles";

declare global {
  interface Window {
    YT: {
      Player: new (
        el: HTMLElement,
        opts: {
          height: string;
          width: string;
          playerVars?: Record<string, number>;
          events?: {
            onReady?: () => void;
            onStateChange?: (e: { data: number }) => void;
            onError?: () => void;
          };
        },
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

async function fetchVideoTitle(id: string): Promise<string> {
  try {
    const res = await fetch(`/api/oembed?id=${id}`);
    if (!res.ok) return id;
    const data = await res.json();
    return data.title ?? id;
  } catch {
    return id;
  }
}

const LED = ({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <span
    style={{
      fontFamily: "'Digital-7', 'Courier New', monospace",
      letterSpacing: 1,
      ...style,
    }}
  >
    {children}
  </span>
);

function Visualizer({ playing }: VisualizerProps) {
  const [bars, setBars] = useState<number[]>(() =>
    Array(38)
      .fill(0)
      .map(() => Math.random() * 20),
  );
  const rafRef = useRef<number | null>(null);
  const peakRef = useRef<number[]>(Array(38).fill(0));
  const peakFallRef = useRef<number[]>(Array(38).fill(0));

  useEffect(() => {
    const animate = () => {
      setBars((prev) =>
        prev.map((b, i) => {
          if (!playing) {
            const next = b * 0.88;
            peakRef.current[i] = Math.max(0, (peakRef.current[i] ?? 0) - 0.4);
            return next < 0.5 ? 0 : next;
          }
          const spike = Math.random() < 0.15 ? Math.random() * 60 + 10 : 0;
          const base =
            i < 6
              ? 40 + Math.random() * 40
              : i < 15
                ? 25 + Math.random() * 45
                : i < 25
                  ? 15 + Math.random() * 35
                  : 5 + Math.random() * 25;
          const next = Math.min(
            75,
            Math.max(2, b * 0.7 + (base + spike) * 0.3),
          );
          if (next > (peakRef.current[i] ?? 0)) {
            peakRef.current[i] = next;
            peakFallRef.current[i] = 30;
          } else {
            peakFallRef.current[i] = Math.max(
              0,
              (peakFallRef.current[i] ?? 0) - 1,
            );
            if (peakFallRef.current[i] === 0)
              peakRef.current[i] = Math.max(0, (peakRef.current[i] ?? 0) - 1.2);
          }
          return next;
        }),
      );
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  return (
    <div className="w-full h-[72px] bg-black flex items-end gap-[1px] py-[3px] px-0.5 box-border overflow-hidden">
      {bars.map((h, i) => {
        const pct = Math.min(100, h);
        const peak = peakRef.current[i] ?? 0;
        return (
          <div
            key={i}
            className="flex-1 relative h-full flex flex-col justify-end"
          >
            <div
              style={{
                width: "100%",
                height: `${pct}%`,
                background: getColor(pct),
                minHeight: pct > 0 ? 2 : 0,
                boxShadow: pct > 50 ? `0 0 3px ${getColor(pct)}` : "none",
              }}
            />
            {peak > 2 && (
              <div
                style={{
                  position: "absolute",
                  bottom: `${Math.min(95, peak)}%`,
                  width: "100%",
                  height: 2,
                  background: "#fff",
                  opacity: 0.9,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function PlaylistItem({
  item,
  idx,
  current,
  onClick,
  onRemove,
}: PlaylistItemProps) {
  const [hov, setHov] = useState(false);
  const active = idx === current;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={cn(
        "flex items-center py-0.5 px-[6px] cursor-pointer border-b-[#111] border-b-[1px]",
        active ? "bg-[#224488]" : hov ? "bg-[#113366]" : "bg-transparent",
      )}
      onClick={() => onClick(idx)}
    >
      <span
        className={cn(
          "text-[10px] min-w-[22px] font-mono",
          active ? "text-[#00ffff]" : "text-[#44aaff]",
        )}
      >
        {(idx + 1).toString().padStart(2, "0")}.
      </span>
      <span
        className={cn(
          "flex-1 text-[11px] overflow-hidden text-ellipsis whitespace-nowrap",
          active ? "text-white" : "text-[#ccc]",
        )}
      >
        {item.title || item.id}
      </span>
      <span className="text-[#888] text-[10px] ml-[6px] flex-shrink-0">
        {item.duration ? fmtTime(item.duration) : "--:--"}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(idx);
        }}
        className="ml-1 bg-none border-none text-red-500 cursor-pointer text-[11px] py-0 px-0.5"
      >
        ✕
      </button>
    </div>
  );
}

function WBtn({
  onClick,
  title,
  active,
  children,
  style = {},
  small,
}: WBtnProps) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      title={title}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={onClick}
      className={cn(
        "border-[1px] border-solid text-[#c8c050] font-bold cursor-pointer select-none leading-[1]",
        active
          ? "bg-[#2a2a1a]"
          : "bg-gradient-to-b from-[#3a3a2a] to-[#1a1a0a]",
        pressed
          ? "border-t-[#111] border-r-[#444] border-b-[#444] border-l-[#111]"
          : "border-t-[#444] border-r-[#111] border-b-[#111] border-l-[#444]",
        small ? "text-[9px] py-[1px] px-1" : "text-[10px] py-0.5 px-[6px]",
      )}
      style={style}
    >
      {children}
    </button>
  );
}

export default function Winamp() {
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(-1);
  const [playerState, setPlayerState] = useState<number>(-1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string>("");
  const [inputErr, setInputErr] = useState<string>("");
  const [showPlaylist, setShowPlaylist] = useState<boolean>(true);
  const [showEQ, setShowEQ] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [repeat, setRepeat] = useState<boolean>(false);
  const [scrollTitle, setScrollTitle] = useState<string>(
    ">>> WINAMP 2.95 — PASTE A YOUTUBE URL ABOVE TO START <<<   ",
  );
  const [scrollPos, setScrollPos] = useState<number>(0);
  const [seeking, setSeeking] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(50);
  const [apiReady, setApiReady] = useState<boolean>(false);
  const [playerReady, setPlayerReady] = useState<boolean>(false);
  const [eqBands, setEqBands] = useState<number[]>(Array(10).fill(50));

  const playerRef = useRef<YTPlayer | null>(null);
  const playerDivRef = useRef<HTMLDivElement | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const historyRef = useRef<number[]>([]);
  const pendingTrackRef = useRef<string | null>(null);
  const currentVideoIdRef = useRef<string | null>(null);

  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => setApiReady(true);
    if (window.YT?.Player) setApiReady(true);
    return () => {
      delete (window as Partial<Window>).onYouTubeIframeAPIReady;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!apiReady || !playerDivRef.current || playerRef.current) return;

    playerRef.current = new window.YT.Player(playerDivRef.current, {
      height: "120",
      width: "120",
      playerVars: {
        autoplay: 1,
        controls: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
      },
      events: {
        onReady: () => {
          setPlayerReady(true);
          if (pendingTrackRef.current) {
            playerRef.current!.loadVideoById(pendingTrackRef.current);
            pendingTrackRef.current = null;
          }
        },

        onStateChange: (e: { data: number }) => {
          setPlayerState(e.data);

          if (e.data === 1 && playerRef.current) {
            const dur = playerRef.current.getDuration();
            const vd = playerRef.current.getVideoData();
            const t = vd?.title ?? "Unknown Track";
            const loadedId = currentVideoIdRef.current;

            setDuration(dur);
            setScrollTitle(`${t}   •   ${fmtTime(dur)}   •   `.repeat(3));

            setPlaylist((pl) =>
              pl.map((item) =>
                item.id === loadedId
                  ? { ...item, title: t, duration: dur }
                  : item,
              ),
            );
          }

          if (e.data === 0) handleNext();
        },

        onError: () => {
          setScrollTitle(
            ">>> ERROR: Could not load this video. Try another URL. <<<   ",
          );
          setPlayerState(-1);
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiReady]);

  useEffect(() => {
    playerRef.current?.setVolume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  useEffect(() => {
    if (playerState === 1 && !seeking) {
      tickRef.current = setInterval(() => {
        if (playerRef.current?.getCurrentTime)
          setCurrentTime(playerRef.current.getCurrentTime());
      }, 500);
    } else {
      if (tickRef.current) clearInterval(tickRef.current);
    }
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [playerState, seeking]);

  useEffect(() => {
    scrollRef.current = setInterval(() => {
      setScrollPos((p) => (p + 1) % scrollTitle.length);
    }, 90);
    return () => {
      if (scrollRef.current) clearInterval(scrollRef.current);
    };
  }, [scrollTitle]);

  const displayTitle = (
    scrollTitle.slice(scrollPos) + scrollTitle.slice(0, scrollPos)
  ).slice(0, 28);

  const loadTrack = useCallback(
    (idx: number) => {
      if (!playerRef.current || !playerReady || !playlist[idx]) return;
      const { id } = playlist[idx];
      currentVideoIdRef.current = id;
      setCurrentIdx(idx);
      setCurrentTime(0);
      playerRef.current.loadVideoById(id);
      playerRef.current.playVideo();
    },
    [playlist, playerReady],
  );

  const handleNext = useCallback(() => {
    if (!playlist.length) return;
    let next: number;
    if (shuffle) {
      const prev = historyRef.current;
      const pool = playlist.map((_, i) => i).filter((i) => !prev.includes(i));
      next = pool.length
        ? pool[Math.floor(Math.random() * pool.length)]
        : Math.floor(Math.random() * playlist.length);
      historyRef.current = [...prev.slice(-10), next];
    } else {
      next = currentIdx + 1;
      if (next >= playlist.length) next = repeat ? 0 : -1;
    }
    if (next >= 0) loadTrack(next);
  }, [playlist, currentIdx, shuffle, repeat, loadTrack]);

  const handlePrev = useCallback(() => {
    if (!playlist.length) return;
    if (currentTime > 3 && playerRef.current) {
      playerRef.current.seekTo(0, true);
      setCurrentTime(0);
      return;
    }
    loadTrack(Math.max(0, currentIdx - 1));
  }, [playlist, currentIdx, currentTime, loadTrack]);

  const addUrl = useCallback(async () => {
    const id = extractVideoId(urlInput.trim());

    if (!id) {
      setInputErr("Invalid YouTube URL");
      setTimeout(() => setInputErr(""), 2500);
      return;
    }

    if (playlist.some((t) => t.id === id)) {
      setInputErr("Already in playlist");
      setTimeout(() => setInputErr(""), 2000);
      return;
    }

    setUrlInput("");
    setInputErr("");

    const title = await fetchVideoTitle(id);
    const newIdx = playlist.length;

    currentVideoIdRef.current = id;

    setPlaylist((prev) => [...prev, { id, title, duration: 0 }]);
    setCurrentIdx(newIdx);
    setCurrentTime(0);

    if (playerRef.current && playerReady) {
      playerRef.current.loadVideoById(id);
      playerRef.current.playVideo();
    } else {
      pendingTrackRef.current = id;
    }
  }, [urlInput, playerReady, playlist]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = (Number(e.target.value) / 1000) * duration;
    setCurrentTime(t);
    playerRef.current?.seekTo(t, true);
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (playerState === 1) playerRef.current.pauseVideo();
    else if (playerState === 2 || playerState === 3)
      playerRef.current.playVideo();
    else if (playlist.length) loadTrack(currentIdx >= 0 ? currentIdx : 0);
  };

  const handleStop = () => {
    playerRef.current?.stopVideo();
    setCurrentTime(0);
    setPlayerState(-1);
  };

  const removeFromPlaylist = (idx: number) => {
    setPlaylist((pl) => {
      const n = pl.filter((_, i) => i !== idx);
      if (idx <= currentIdx && currentIdx > 0) setCurrentIdx((c) => c - 1);
      else if (!n.length) {
        setCurrentIdx(-1);
        handleStop();
      }
      return n;
    });
  };

  const clearPlaylist = () => {
    setPlaylist([]);
    setCurrentIdx(-1);
    handleStop();
  };

  const playing = playerState === 1;
  const buffering = playerState === 3;
  const progressPct = duration > 0 ? (currentTime / duration) * 1000 : 0;

  return (
    <WindowWrapper
      id={24}
      title="Winamp 2.95"
      icon="/icons/winamp.png"
      controls={{ close: true, minimize: true, maximize: false }}
      className="!size-auto"
    >
      <div className="bg-[#1a1a00] min-h-[480px] flex flex-col items-center gap-0">
        <style>{`
          input[type=range]{-webkit-appearance:none;height:4px;background:#333;outline:none;cursor:pointer;}
          input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:10px;height:10px;background:#c8c050;border-radius:0;border:1px solid #888;}
          input[type=range]::-moz-range-thumb{width:10px;height:10px;background:#c8c050;border-radius:0;border:1px solid #888;}
          .winamp-input{background:#1a1a0a;border:1px solid #555;color:#c8c050;font-family:'Courier New',monospace;font-size:11px;outline:none;padding:2px 6px;}
          .winamp-input:focus{border-color:#c8c050;}
          .winamp-input::placeholder{color:#555;}
        `}</style>

        <div className={winStyle}>
          <div className={titleBarStyle}>
            <span className="text-[#c8c050] text-[10px] font-bold">
              ► ADD YOUTUBE URL
            </span>
          </div>
          <div className="py-[6px] px-2 flex gap-1">
            <input
              className="winamp-input"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addUrl()}
              placeholder="Paste YouTube URL here... (e.g. https://youtu.be/xxxxx)"
              style={{ flex: 1 }}
            />
            <WBtn onClick={addUrl} style={{ padding: "2px 10px" }}>
              ADD +
            </WBtn>
          </div>
          {inputErr && (
            <div className="text-[#ff4444] text-[10px] pt-0 pb-1.5 px-2">
              ⚠ {inputErr}
            </div>
          )}
        </div>

        <div className={winStyle}>
          <div className={titleBarStyle}>
            <div className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 16 16">
                <rect width="16" height="16" fill="#232319" rx="1" />
                <text
                  x="2"
                  y="12"
                  fontSize="11"
                  fontFamily="Arial"
                  fontWeight="bold"
                  fill="#c8c050"
                >
                  W
                </text>
              </svg>
              <span className="text-[#c8c050] text-[10px] font-bold">
                WINAMP
              </span>
            </div>
            <div className="flex gap-0.5">
              {(["_", "□", "✕"] as const).map((c, i) => (
                <button
                  key={i}
                  className="w-[13px] h-[11px] bg-gradient-to-b from-[#3a3a2a] to-[#1a1a0a] border-[1px] border-t-[#555] border-r-[#222] border-b-[#222] border-l-[#555] text-[#c8c050] font-bold cursor-pointer p-px flex items-center text-[10px] justify-center"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-black py-[3px] px-1.5 flex items-center justify-between border-b-[1px] border-[#111]">
            <div
              className={cn(
                ledBoxStyle,
                "flex-1 text-[11px] tracking-[0.5] overflow-hidden whitespace-nowrap",
                playing
                  ? "text-[#00e800]"
                  : buffering
                    ? "text-[#ffcc00]"
                    : "text-[#00a000]",
              )}
            >
              {displayTitle}
            </div>
            <div
              className={cn(
                ledBoxStyle,
                "ml-1.5 text-[11px] text-right min-w-11",
                playing ? "text-[#00e800]" : "text-[#006600]",
              )}
            >
              <LED>{fmtTime(currentTime)}</LED>
            </div>
          </div>

          <Visualizer playing={playing} />

          <div className="pt-1 pb-1 px-0.5 bg-[#111]">
            <input
              type="range"
              min={0}
              max={1000}
              value={progressPct}
              onMouseDown={() => setSeeking(true)}
              onMouseUp={() => setSeeking(false)}
              onChange={handleSeek}
              className="w-full accent-[#c8c050]"
            />
            <div className="flex justify-between text-[9px] text-[#666] -mt-0.5">
              <span>{fmtTime(currentTime)}</span>
              <span>{fmtTime(duration)}</span>
            </div>
          </div>

          <div className="bg-[#1a1a0a] px-1.5 py-2 flex items-center gap-1 border-t-[1px] border-[#111]">
            <WBtn onClick={handlePrev} title="Previous">
              ⏮
            </WBtn>
            <WBtn
              onClick={togglePlay}
              title={playing ? "Pause" : "Play"}
              active={playing}
              style={{
                minWidth: 32,
                fontSize: 14,
                padding: "2px 8px",
                background: playing
                  ? "linear-gradient(to bottom,#1a2a0a,#0a1a00)"
                  : undefined,
                color: playing ? "#44ff44" : "#c8c050",
              }}
            >
              {playing ? "⏸" : "▶"}
            </WBtn>
            <WBtn onClick={handleStop} title="Stop">
              ⏹
            </WBtn>
            <WBtn onClick={handleNext} title="Next">
              ⏭
            </WBtn>

            <div className="w-px bg-[#444] self-stretch mx-[2px]" />

            <span className="text-[#888] text-[9px]">VOL</span>
            <input
              type="range"
              min={0}
              max={100}
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                setIsMuted(false);
              }}
              className="w-[70px] accent-[#c8c050]"
            />
            <WBtn
              onClick={() => setIsMuted((m) => !m)}
              title="Mute"
              small
              active={isMuted}
              style={{ fontSize: 9 }}
            >
              {isMuted ? "🔇" : "🔊"}
            </WBtn>

            <div className="w-px bg-[#444] self-stretch mx-0.5" />

            <span className="text-[#888] text-[9px]">BAL</span>
            <input
              type="range"
              min={0}
              max={100}
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
              className="w-[50px] accent-[#c8c050]"
            />

            <div className="flex-1" />

            <WBtn
              onClick={() => setShuffle((s) => !s)}
              title="Shuffle"
              small
              active={shuffle}
              style={{ color: shuffle ? "#44ff44" : "#c8c050" }}
            >
              SHF
            </WBtn>
            <WBtn
              onClick={() => setRepeat((r) => !r)}
              title="Repeat"
              small
              active={repeat}
              style={{ color: repeat ? "#44ff44" : "#c8c050" }}
            >
              REP
            </WBtn>
            <WBtn
              onClick={() => setShowEQ((s) => !s)}
              title="Equalizer"
              small
              active={showEQ}
              style={{ color: showEQ ? "#44ff44" : "#c8c050" }}
            >
              EQ
            </WBtn>
            <WBtn
              onClick={() => setShowPlaylist((s) => !s)}
              title="Playlist"
              small
              active={showPlaylist}
              style={{ color: showPlaylist ? "#44ff44" : "#c8c050" }}
            >
              PL
            </WBtn>
          </div>

          <div className="bg-[#111] py-0.5 px-2 flex justify-between text-[9px] text-[#556]">
            <span>
              {playing
                ? "▶ PLAYING"
                : playerState === 2
                  ? "⏸ PAUSED"
                  : playerState === 3
                    ? "⟳ BUFFERING..."
                    : "■ STOPPED"}
            </span>
            <span>{playlist.length} tracks in playlist</span>
            <span>320kbps 44kHz STEREO</span>
          </div>
        </div>

        {showEQ && (
          <div className={winStyle}>
            <div className={titleBarStyle}>
              <span className="text-[#c8c050] text-[10px] font-bold">
                GRAPHIC EQ
              </span>
              <WBtn small onClick={() => setEqBands(Array(10).fill(50))}>
                RESET
              </WBtn>
            </div>
            <div className="bg-black py-2 px-3 flex items-end gap-1.5">
              {(
                [
                  "31Hz",
                  "62Hz",
                  "125Hz",
                  "250Hz",
                  "500Hz",
                  "1kHz",
                  "2kHz",
                  "4kHz",
                  "8kHz",
                  "16kHz",
                ] as const
              ).map((f, i) => (
                <div key={f} className="flex flex-col items-center gap-[3px]">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={eqBands[i]}
                    onChange={(e) =>
                      setEqBands((b) =>
                        b.map((v, j) => (j === i ? Number(e.target.value) : v)),
                      )
                    }
                    style={{
                      writingMode: "vertical-lr",
                      direction: "rtl",
                      height: 60,
                      width: 14,
                      accentColor: "#c8c050",
                    }}
                  />
                  <span className="text-[7px] text-[#666] text-center leading-[1.1] whitespace-nowrap">
                    {f}
                  </span>
                </div>
              ))}
              <div className="ml-2 flex flex-col gap-0.5">
                <span className="text-[7px] text-[#666] text-center leading-[1.1] whitespace-nowrap">
                  PRE
                </span>

                <input
                  type="range"
                  min={0}
                  max={100}
                  defaultValue={50}
                  style={{
                    writingMode: "vertical-lr",
                    direction: "rtl",
                    height: 60,
                    width: 14,
                    accentColor: "#ff6633",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {showPlaylist && (
          <div className={winStyle}>
            <div className={titleBarStyle}>
              <span className="text-[#c8c050] text-[10px] font-bold">
                PLAYLIST EDITOR — {playlist.length} track(s)
              </span>
              <WBtn small onClick={clearPlaylist}>
                CLEAR
              </WBtn>
            </div>
            <div className="bg-[#0a0a0a] min-w-20 min-h-[180px] overflow-y-auto">
              {playlist.length === 0 ? (
                <div className="px-6 py-3 text-[#333] text-[11px] text-center">
                  No tracks loaded. Paste a YouTube URL above to add tracks.
                </div>
              ) : (
                playlist.map((item, idx) => (
                  <PlaylistItem
                    key={item.id + idx}
                    item={item}
                    idx={idx}
                    current={currentIdx}
                    onClick={loadTrack}
                    onRemove={removeFromPlaylist}
                  />
                ))
              )}
            </div>
            <div className="bg-[#111] py-1 px-2 flex gap-1 border-t-[1px] border-t-[#222]">
              <WBtn small onClick={() => urlInput && addUrl()}>
                + ADD URL
              </WBtn>
              <div className="flex-1" />
              <WBtn small onClick={() => playlist.length && loadTrack(0)}>
                ⏭ FIRST
              </WBtn>
              <WBtn
                small
                onClick={() =>
                  playlist.length && loadTrack(playlist.length - 1)
                }
              >
                LAST ⏭
              </WBtn>
            </div>
          </div>
        )}

        <Script
          src="https://www.youtube.com/iframe_api"
          strategy="afterInteractive"
          onReady={() => {}}
        />

        <div className="fixed bottom-0 right-0 size-[120px] opacity-[0.01] pointer-events-none -z-10">
          <div ref={playerDivRef} id="yt-player" className="size-full" />
        </div>
      </div>
    </WindowWrapper>
  );
}
