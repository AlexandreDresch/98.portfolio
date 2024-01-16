import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    orientation={orientation}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      orientation === "vertical" ? "flex-col h-full w-[20px]" : "w-full",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "relative grow overflow-hidden bg-secondary border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white",
        orientation === "vertical" ? "w-2 h-full" : "h-2 w-full"
      )}
    >
      <SliderPrimitive.Range
        className={cn(
          "absolute h-full bg-primary",
          orientation === "vertical" ? "w-full" : "h-full"
        )}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-7 border-2 border-black border-t-white border-l-white bg-[#C0C0C0] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
