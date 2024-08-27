"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ImageSliderProps } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageSlider({ images }: ImageSliderProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex flex-col items-center">
      <Carousel
        className="w-full max-w-[890px] h-full"
        setApi={setApi}
        opts={{
          loop: true,
        }}
        current={current}
        count={count}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full max-w-[890px] h-[490px]">
                <Image
                  src={image}
                  alt={`Project Image ${index + 1}`}
                  fill
                  className="object-contain p-2"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
