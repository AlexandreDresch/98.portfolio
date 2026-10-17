import { useGSAP } from "@gsap/react";
import React, { useRef, RefObject } from "react";
import gsap from "gsap";

type FontWeightConfig = {
  min: number;
  max: number;
  default: number;
};

type FontWeightKeys = "subtitle" | "title";

const FONT_WEIGHTS: Record<FontWeightKeys, FontWeightConfig> = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (
  text: string,
  className: string,
  baseWeight: number = 400,
): React.ReactNode[] => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

export default function WelcomeMessage(): JSX.Element {
  const titleRef: RefObject<HTMLHeadingElement> = useRef(null);
  const subtitleRef: RefObject<HTMLParagraphElement> = useRef(null);

  useGSAP(
    () => {
      const animateText = (
        element: HTMLHeadingElement | HTMLParagraphElement | null,
        type: FontWeightKeys,
      ) => {
        if (!element) return;

        const { min, max, default: base } = FONT_WEIGHTS[type];
        const letters = Array.from(
          element.querySelectorAll<HTMLSpanElement>("span"),
        );

        const handleMove = (event: PointerEvent) => {
          letters.forEach((letter) => {
            const rect = letter.getBoundingClientRect();
            const distance = Math.abs(
              event.clientX - (rect.left + rect.width / 2),
            );

            const intensity = Math.exp(-(distance ** 2) / 2000);
            const weight = min + (max - min) * intensity;

            gsap.to(letter, {
              duration: 0.15,
              ease: "power2.out",
              fontWeight: weight,
              overwrite: "auto",
            });
          });
        };

        const handleLeave = () => {
          gsap.to(letters, {
            duration: 0.3,
            ease: "power2.out",
            fontWeight: base,
            overwrite: "auto",
          });
        };

        element.addEventListener("pointermove", handleMove);
        element.addEventListener("pointerleave", handleLeave);

        return () => {
          element.removeEventListener("pointermove", handleMove);
          element.removeEventListener("pointerleave", handleLeave);
        };
      };

      const cleanups = [
        animateText(titleRef.current, "title"),
        animateText(subtitleRef.current, "subtitle"),
      ];

      return () => cleanups.forEach((cleanup) => cleanup?.());
    },
    { dependencies: [] },
  );

  return (
    <section
      id="welcome"
      className="text-slate-200 flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none max-sm:h-screen max-sm:w-full max-sm:px-10"
    >
      <h1 ref={titleRef} className="mt-7">
        {renderText("98.portfolio", "text-9xl italic font-jost")}
      </h1>

      <p ref={subtitleRef}>
        {renderText(
          "by Alexandre Dresch",
          "text-3xl font-inter text-right",
          100,
        )}
      </p>
    </section>
  );
}
