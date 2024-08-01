import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./button";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  folderName: string;
  icon: string;
}

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed bg-transparent z-30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, folderName, icon, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        `fixed left-[25%] top-[18%] z-30 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background duration-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-[48%] data-[state=open]:slide-in-from-left-1/2`,
        className
      )}
      {...props}
    >
      <div className="dragger w-full h-6 relative bg-gradient-to-r mt-0 from-[#010f80] to-[#1084d0]">
        <div className="absolute w-full flex justify-between px-1 top-[2px]">
          <div className="flex gap-1 items-center">
            <Image
              width={0}
              height={0}
              alt="Open folder icon"
              src={icon}
              className="w-4 h-4"
            />
            <span className="text-white text-sm">{folderName}</span>
          </div>

          <div className="flex gap-[3px] items-center">
            <Button
              variant="w98"
              className="bg-[#C0C0C0] w-6 h-5 p-1 pb-0 flex place-items-baseline"
            >
              <Image
                width={0}
                height={0}
                alt="minimize icon"
                src="/minimize.svg"
                className="w-3 h-auto"
              />
            </Button>

            <Button
              variant="w98"
              className="bg-[#C0C0C0] w-6 h-5 p-1 flex items-center justify-center"
            >
              <Image
                width={0}
                height={0}
                alt="maximize icon"
                src="/maximize.svg"
                className="w-3 h-auto"
              />
            </Button>

            <DialogPrimitive.Close className="bg-[#C0C0C0] w-6 h-5 p-1 flex items-center justify-center border-[2px] border-solid border-black border-t-white border-l-white rounded-none px-[2px] gap-1 hover:border-black hover:border-b-white hover:border-r-white disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <Image
                width={0}
                height={0}
                alt="close icon"
                src="/close.svg"
                className="w-3 h-auto"
              />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>
        </div>
      </div>
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
