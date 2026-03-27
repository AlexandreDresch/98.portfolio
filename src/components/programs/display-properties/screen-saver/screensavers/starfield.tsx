"use client";
import { useEffect, useRef } from "react";

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 600 }).map(() => {
      const angle = Math.random() * Math.PI * 2;

      const radius = Math.sqrt(Math.random()) * Math.max(w, h);

      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: Math.random() * w,
      };
    });

    function draw() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, w, h);

      stars.forEach((star) => {
        star.z -= 2;
        if (star.z <= 0) star.z = w;

        const k = 128 / star.z;
        const x = star.x * k + w / 2;
        const y = star.y * k + h / 2;

        ctx.fillStyle = "white";
        ctx.fillRect(x, y, 2, 2);
      });

      requestAnimationFrame(draw);
    }

    draw();
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0" />;
}
