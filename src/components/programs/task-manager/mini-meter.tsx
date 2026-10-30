import { useEffect, useRef } from "react";

export function MiniMeter({
  value,
  max = 100,
  unit = "%",
}: {
  value: number;
  max?: number;
  unit?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width,
      H = canvas.height;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);

    const bars = 10;
    const margin = 2;
    const barH = Math.floor((H - 20 - margin * (bars + 1)) / bars);
    const filled = Math.round((value / max) * bars);

    for (let i = 0; i < bars; i++) {
      const y = H - 18 - margin - (i + 1) * (barH + margin);
      const active = i < filled;
      ctx.fillStyle = active
        ? i >= bars * 0.8
          ? "#ff4400"
          : i >= bars * 0.6
            ? "#aacc00"
            : "#00cc00"
        : "#003300";
      ctx.fillRect(margin, y, W - margin * 2, barH);
    }

    ctx.fillStyle = "#00cc00";
    ctx.font = "bold 10px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.fillText(`${Math.round(value)} ${unit}`, W / 2, H - 4);
  }, [value, max, unit]);

  return (
    <canvas
      ref={ref}
      width={80}
      height={80}
      style={{ imageRendering: "pixelated", display: "block" }}
    />
  );
}
