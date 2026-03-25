"use client";
import { useEffect, useRef } from "react";

export function Mystify() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;

    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);

    const shapes = Array.from({ length: 3 }).map(() => ({
      points: Array.from({ length: 4 }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
      })),
    }));

    function draw() {
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, 0, w, h);

      shapes.forEach((shape, i) => {
        ctx.beginPath();
        ctx.strokeStyle = `hsl(${Date.now() / 10 + i * 60},100%,50%)`;

        shape.points.forEach((p, idx) => {
          idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        });

        ctx.closePath();
        ctx.stroke();
      });

      requestAnimationFrame(draw);
    }

    draw();
  }, []);

  return <canvas ref={ref} className="fixed inset-0" />;
}
