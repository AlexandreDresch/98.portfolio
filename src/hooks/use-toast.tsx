"use client";

import { useState, useCallback } from "react";

export type ToastData = {
  id: number;
  content: React.ReactNode;
};

export function useToast() {
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = useCallback((content: React.ReactNode, duration = 3000) => {
    const id = Date.now();

    setToast({ id, content });

    setTimeout(() => {
      setToast(null);
    }, duration);
  }, []);

  return {
    toast,
    showToast,
  };
}
