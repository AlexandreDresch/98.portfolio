"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Pipes3D() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current!;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const size = 20;

    const interval = setInterval(() => {
      const el = document.createElement("div");

      const depth = Math.random() * 600;
      const scale = 1 - depth / 800;

      el.style.position = "absolute";
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.background = `hsl(${Math.random() * 360},70%,50%)`;
      el.style.transform = `scale(${scale})`;

      container.appendChild(el);

      const dx = Math.random() > 0.5 ? size : 0;
      const dy = dx ? 0 : size;

      gsap.set(el, { x, y });

      gsap.to(el, {
        x: x + dx,
        y: y + dy,
        duration: 0.2,
        ease: "none",
      });

      x += dx;
      y += dy;
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return <div ref={ref} className="fixed inset-0 bg-black" />;
}
