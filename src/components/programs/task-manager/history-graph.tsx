import { useEffect, useRef } from "react";

export function HistoryGraph({
  history,
  width = 240,
  height = 80,
}: {
  history: number[];
  width?: number;
  height?: number;
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

    ctx.strokeStyle = "#003300";
    ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) {
      const y = Math.floor(H * (i / 4));
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    for (let i = 1; i < 6; i++) {
      const x = Math.floor(W * (i / 6));
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }

    if (history.length < 2) return;

    const step = W / (history.length - 1);

    const getXY = (i: number) => ({
      x: i * step,
      y: H - (Math.max(0, Math.min(100, history[i])) / 100) * (H - 2) - 1,
    });

    ctx.fillStyle = "rgba(0,160,0,0.25)";
    ctx.beginPath();
    ctx.moveTo(0, H);
    history.forEach((_, i) => {
      const { x, y } = getXY(i);
      ctx.lineTo(x, y);
    });
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "#00cc00";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    history.forEach((_, i) => {
      const { x, y } = getXY(i);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
  }, [history]);

  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
      style={{
        imageRendering: "pixelated",
        display: "block",
        width: "100%",
        height: "100%",
      }}
    />
  );
}
