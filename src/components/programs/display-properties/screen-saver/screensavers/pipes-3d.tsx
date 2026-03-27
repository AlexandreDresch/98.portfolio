"use client";
import { useEffect, useRef } from "react";

type Dir = "up" | "down" | "left" | "right";

const SIZE = 12;
const MAX_PIPES = 5;
const TICK = 80;

export function Pipes3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);

    const grid = new Map<string, number>();
    const key = (x: number, y: number) => `${x}:${y}`;

    function createPipe() {
      let x = Math.floor(Math.random() * (w / SIZE)) * SIZE;
      let y = Math.floor(Math.random() * (h / SIZE)) * SIZE;

      let dir: Dir = "right";
      const hue = Math.random() * 360;

      let life = 0;

      const opposite: Record<Dir, Dir> = {
        up: "down",
        down: "up",
        left: "right",
        right: "left",
      };

      function nextDir(prev: Dir): Dir {
        const dirs: Dir[] = ["up", "down", "left", "right"];
        return dirs
          .filter((d) => d !== opposite[prev])
          .sort(() => Math.random() - 0.5)[0];
      }

      function step() {
        life++;

        let newDir = dir;
        if (Math.random() < 0.3) newDir = nextDir(dir);

        let attempts = 0;

        while (attempts < 6) {
          let nx = x;
          let ny = y;

          if (newDir === "right") nx += SIZE;
          if (newDir === "left") nx -= SIZE;
          if (newDir === "down") ny += SIZE;
          if (newDir === "up") ny -= SIZE;

          const k = key(nx, ny);

          const occupied = grid.get(k);

          if (!occupied || life - occupied > 200) {
            grid.set(k, life);

            drawSegment(x, y, nx, ny, newDir !== dir, hue);

            x = nx;
            y = ny;
            dir = newDir;
            return;
          }

          newDir = nextDir(dir);
          attempts++;
        }

        respawn();
      }

      function respawn() {
        x = Math.floor(Math.random() * (w / SIZE)) * SIZE;
        y = Math.floor(Math.random() * (h / SIZE)) * SIZE;
        dir = ["up", "down", "left", "right"][
          Math.floor(Math.random() * 4)
        ] as Dir;
      }

      return { step };
    }

    function drawSegment(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      isTurn: boolean,
      hue: number,
    ) {
      ctx.save();

      const gradient =
        x1 === x2
          ? ctx.createLinearGradient(x1 - SIZE / 2, 0, x1 + SIZE / 2, 0)
          : ctx.createLinearGradient(0, y1 - SIZE / 2, 0, y1 + SIZE / 2);

      gradient.addColorStop(0, `hsl(${hue},70%,65%)`);
      gradient.addColorStop(0.5, `hsl(${hue},70%,40%)`);
      gradient.addColorStop(1, `hsl(${hue},70%,65%)`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = SIZE;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      if (isTurn) {
        ctx.beginPath();
        ctx.arc(x1, y1, SIZE / 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${hue},70%,50%)`;
        ctx.fill();
      }

      ctx.restore();
    }

    const pipes = Array.from({ length: MAX_PIPES }).map(() => createPipe());

    const interval = setInterval(() => {
      pipes.forEach((p) => p.step());
    }, TICK);

    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 bg-black z-[9999]" />;
}
