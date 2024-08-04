"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ImageSliderProps } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import ImageMagnifier from "./image-magnifier";

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
      <Carousel className="w-full max-w-[500px]" setApi={setApi}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Card className="rounded-none">
                <CardContent className="flex w-[500px] h-72 p-0">
                  <div className="relative w-full h-full ">
                    <ImageMagnifier
                      src={image}
                      alt={`Project Image ${index + 1}`}
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-[31px] rounded-none h-full border-[0.5px] border-black border-t-white border-r-white bg-[#C0C0C0] hover:bg-[#C0C0C0]" />
        <CarouselNext className="-right-[31px] rounded-none h-full border-[0.5px] border-black border-t-white border-l-white bg-[#C0C0C0] hover:bg-[#C0C0C0]" />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Image {current} of {count}
      </div>
    </div>
  );
}
