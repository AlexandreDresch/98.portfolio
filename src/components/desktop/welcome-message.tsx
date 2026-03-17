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

const setupTextHover = (
  container: HTMLHeadingElement | HTMLParagraphElement | null,
  type: FontWeightKeys,
): (() => void) => {
  if (!container) return () => {};

  const letters = container.querySelectorAll<HTMLSpanElement>("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (
    letter: HTMLSpanElement,
    weight: number,
    duration: number = 0.25,
  ) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 2000);

      animateLetter(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.3);
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

export default function WelcomeMessage(): JSX.Element {
  const titleRef: RefObject<HTMLHeadingElement> = useRef(null);
  const subtitleRef: RefObject<HTMLParagraphElement> = useRef(null);

  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      subtitleCleanup();
      titleCleanup();
    };
  }, []);

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
