import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const Win98Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap font-mono text-xs -outline-offset-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
          "focus:outline-dotted focus:outline-1 focus:outline-black",
          "focus-visible:outline-dotted focus-visible:outline-1 focus-visible:outline-black",
          "text-black bg-[silver] text-transparent [text-shadow:0_0_#222] disabled:[text-shadow:1_1_0_#fff] disabled:text-[grey]",
          "shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#fff,inset_-2px_-2px_grey,inset_2px_2px_#dfdfdf]",
          "active:shadow-[inset_-1px_-1px_#ffffff,inset_1px_1px_#0a0a0a,inset_-2px_-2px_#dfdfdf,inset_2px_2px_#808080]",
          "disabled:shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#fff,inset_-2px_-2px_grey,inset_2px_2px_#dfdfdf]",
          "h-7 px-3 min-w-20",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Win98Button.displayName = "Win98Button";
