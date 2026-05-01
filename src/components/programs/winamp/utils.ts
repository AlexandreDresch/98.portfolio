export function fmtTime(s: number): string {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return `${m}:${ss.toString().padStart(2, "0")}`;
}

const COLORS = [
  "#1aff1a",
  "#1aff1a",
  "#1aff1a",
  "#1aff1a",
  "#22ff00",
  "#44ff00",
  "#77ff00",
  "#aaff00",
  "#ddff00",
  "#ffff00",
  "#ffcc00",
  "#ff9900",
  "#ff6600",
  "#ff3300",
  "#ff0000",
];

export const getColor = (pct: number) => COLORS[Math.min(14, Math.floor(pct / 7))];

export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/,
    /[?&]v=([A-Za-z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}
