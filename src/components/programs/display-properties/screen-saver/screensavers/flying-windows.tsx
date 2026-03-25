"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function FlyingWindows() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current!;

    for (let i = 0; i < 10; i++) {
      const el = document.createElement("div");

      el.innerText = "My Computer";
      el.style.position = "absolute";
      el.style.padding = "8px";
      el.style.background = "#c0c0c0";
      el.style.border = "2px solid black";

      container.appendChild(el);

      gsap.set(el, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      });

      gsap.to(el, {
        x: `+=${Math.random() * 400 - 200}`,
        y: `+=${Math.random() * 400 - 200}`,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return <div ref={containerRef} className="fixed inset-0 bg-black" />;
}
