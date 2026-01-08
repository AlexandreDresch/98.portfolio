"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FolderContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function FolderContainer({
  children,
  className,
}: FolderContainerProps) {
  return (
    <div
      className={cn(
        "flex-1 min-h-0 w-full min-w-0 overflow-auto p-2",
        className
      )}
    >
      {children}
    </div>
  );
}
