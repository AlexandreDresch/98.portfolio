"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ImageSliderProps } from "@/types";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Separator } from "../../ui/separator";

export default function ImageSlider({
  images,
  initialIndex = 0,
}: ImageSliderProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
      setLoaded(false);
      setZoom(1);
    };

    update();

    api.on("select", update);
    api.on("reInit", update);

    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  const next = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const prev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const selectImage = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  const zoomIn = useCallback(() => {
    setZoom((value) => Math.min(value + 0.25, 3));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((value) => Math.max(value - 0.25, 0.5));
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          prev();
          break;

        case "ArrowRight":
          event.preventDefault();
          next();
          break;

        case "+":
        case "=":
          event.preventDefault();
          zoomIn();
          break;

        case "-":
          event.preventDefault();
          zoomOut();
          break;

        case "0":
          event.preventDefault();
          resetZoom();
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [next, prev, zoomIn, zoomOut, resetZoom]);

  const formattedIndex = useMemo(
    () => String(current + 1).padStart(2, "0"),
    [current],
  );

  return (
    <div className="flex h-full w-full flex-col select-none">
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#101010]">
        <div className="pointer-events-none absolute inset-0 z-30 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 3px)",
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, transparent 55%, rgba(0,0,0,0.38) 100%)",
            }}
          />
        </div>

        <div className="pointer-events-none absolute left-0 top-0 z-20 h-10 w-10 border-l border-t border-white/20" />
        <div className="pointer-events-none absolute bottom-0 right-0 z-20 h-10 w-10 border-b border-r border-white/10" />

        <Carousel
          className="h-full w-full"
          setApi={setApi}
          opts={{
            loop: true,
            duration: 35,
            startIndex: initialIndex,
          }}
          current={current + 1}
          count={count}
        >
          <CarouselContent className="ml-0 h-full">
            {images.map((image, index) => (
              <CarouselItem key={`${image}-${index}`} className="h-full pl-0">
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                  <motion.div
                    className="absolute inset-0 scale-110 opacity-20 blur-3xl"
                    style={{
                      backgroundImage: `url(${image})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    animate={{
                      scale: loaded ? 1.08 : 1.14,
                    }}
                    transition={{
                      duration: 1.2,
                      ease: "easeOut",
                    }}
                  />

                  <motion.div
                    className="relative z-10 max-h-[94%] max-w-[94%]"
                    animate={{
                      scale: current === index ? zoom : 0.96,
                      opacity: current === index ? 1 : 0.5,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {!loaded && current === index && (
                      <div className="absolute inset-0 z-20 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="h-7 w-7 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                          <span className="font-mono text-[11px] uppercase tracking-widest text-white/70">
                            Loading image...
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="relative overflow-hidden border border-white/20 bg-black shadow-[0_20px_80px_rgba(0,0,0,0.65)]">
                      <Image
                        src={image}
                        alt={`Project image ${index + 1}`}
                        width={1400}
                        height={900}
                        priority={index === 0}
                        className="block max-h-[560px] w-auto max-w-[900px] object-contain"
                        onLoad={() => setLoaded(true)}
                      />

                      <motion.div
                        className="pointer-events-none absolute inset-0"
                        initial={{
                          x: "-100%",
                          opacity: 0,
                        }}
                        animate={{
                          x: "200%",
                          opacity: [0, 0.08, 0],
                        }}
                        transition={{
                          duration: 1.2,
                          delay: 0.15,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="h-full w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent" />
                      </motion.div>
                    </div>
                  </motion.div>

                  <div className="absolute bottom-4 left-4 z-20 bg-black/65 px-2 py-1 font-mono text-[10px] tracking-widest text-white/80 backdrop-blur-sm">
                    IMG_{String(index + 1).padStart(3, "0")}
                  </div>

                  <div className="absolute bottom-4 right-4 z-20 bg-black/65 px-2 py-1 font-mono text-[10px] tracking-widest text-white/80 backdrop-blur-sm">
                    {Math.round(zoom * 100)}%
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <Separator
        orientation="horizontal"
        className="bg-[#C0C0C0] h-px w-full border-t-[1px] border-b-white border-r-[1px] border-r-[#808080]"
      />

      <div className="border-t-2 border-white border-b-2 bg-[#C0C0C0] px-2 py-2">
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="win98-tool-button"
            aria-label="Previous image"
          >
            <Image src="/arrow-left.svg" alt="" width={18} height={18} />
          </button>

          <button
            onClick={next}
            className="win98-tool-button"
            aria-label="Next image"
          >
            <Image src="/arrow-right.svg" alt="" width={18} height={18} />
          </button>

          <div className="mx-1 h-8 w-px bg-[#808080]" />

          <button
            onClick={zoomOut}
            className="win98-tool-button font-bold"
            aria-label="Zoom out"
          >
            −
          </button>

          <button
            onClick={resetZoom}
            className="win98-tool-button min-w-[44px] font-mono text-[10px]"
          >
            {Math.round(zoom * 100)}%
          </button>

          <button
            onClick={zoomIn}
            className="win98-tool-button font-bold"
            aria-label="Zoom in"
          >
            +
          </button>

          <div className="mx-1 h-8 w-px bg-[#808080]" />

          <div className="ml-auto border-2 border-[#808080] border-b-white border-r-white bg-white px-3 py-2 font-mono text-[11px]">
            IMAGE {formattedIndex} / {String(count).padStart(2, "0")}
          </div>
        </div>
      </div>

      <div className="border-t border-[#808080] bg-[#C0C0C0] p-2">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => {
            const active = index === current;

            return (
              <motion.button
                key={`${image}-thumb-${index}`}
                onClick={() => selectImage(index)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={[
                  "relative h-[68px] w-[88px] shrink-0 overflow-hidden",
                  "border-2 bg-[#C0C0C0]",
                  active
                    ? "border-black border-t-[#404040] border-l-[#404040] ring-1 ring-black"
                    : "border-t-white border-l-white border-r-[#808080] border-b-[#808080]",
                ].join(" ")}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="88px"
                  className="object-cover"
                />

                {active && (
                  <motion.div
                    layoutId="active-thumbnail"
                    className="pointer-events-none absolute inset-0 border-2 border-white/70"
                  />
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1 py-[2px] font-mono text-[9px] text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .win98-tool-button {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 36px;
          height: 32px;
          padding: 0 8px;
          background: #c0c0c0;
          border: 2px solid;
          border-top-color: #ffffff;
          border-left-color: #ffffff;
          border-right-color: #404040;
          border-bottom-color: #404040;
          font-family: "MS Sans Serif", Arial, sans-serif;
          font-size: 12px;
          color: #000;
        }

        .win98-tool-button:hover {
          background: #d8d8d8;
        }

        .win98-tool-button:active {
          border-top-color: #404040;
          border-left-color: #404040;
          border-right-color: #ffffff;
          border-bottom-color: #ffffff;
          transform: translate(1px, 1px);
        }
      `}</style>
    </div>
  );
}
