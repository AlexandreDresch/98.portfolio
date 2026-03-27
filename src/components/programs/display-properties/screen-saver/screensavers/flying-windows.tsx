"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const shortcuts = [
  { label: "My Computer", icon: "/icons/wm.png" },
  { label: "VS Code", icon: "/icons/vscode.png" },
  { label: "Recycle Bin", icon: "/icons/wm.png" },
  { label: "Projects", icon: "/icons/frontend-icon.png" },
  { label: "Keyboard", icon: "/icons/keyboard.png" },
];

export function FlyingWindows() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current!;

    const elements: HTMLDivElement[] = [];

    for (let i = 0; i < 12; i++) {
      const data = shortcuts[i % shortcuts.length];

      const el = document.createElement("div");

      el.style.position = "absolute";
      el.style.width = "80px";
      el.style.textAlign = "center";
      el.style.color = "white";
      el.style.fontSize = "12px";
      el.style.fontFamily = "MS Sans Serif, sans-serif";
      el.style.pointerEvents = "none";

      const img = document.createElement("img");
      img.src = data.icon;
      img.style.width = "32px";
      img.style.height = "32px";
      img.style.display = "block";
      img.style.margin = "0 auto";

      const label = document.createElement("div");
      label.innerText = data.label;
      label.style.marginTop = "4px";
      label.style.textShadow = "1px 1px 0 black";

      el.appendChild(img);
      el.appendChild(label);

      container.appendChild(el);
      elements.push(el);

      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;

      const depth = Math.random();

      gsap.set(el, {
        x: startX,
        y: startY,
        scale: 0.6 + depth * 0.6,
        opacity: 0.5 + depth * 0.5,
      });

      gsap.to(el, {
        x: `+=${Math.random() * 300 - 150}`,
        y: `+=${Math.random() * 300 - 150}`,
        duration: 6 + Math.random() * 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    return () => {
      elements.forEach((el) => el.remove());
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 bg-black z-[9999]" />;
}
