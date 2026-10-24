"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { openWindow } from "@/store/window-manager-slice";
import { requestUrl } from "@/store/ie-slice";
import { Button } from "@/components/ui/button";

const IE_WINDOW_ID = 10;

interface IELinkProps {
  url: string;
  children: React.ReactNode;
  className?: string;
}

export default function IELink({ url, children, className }: IELinkProps) {
  const dispatch = useAppDispatch();

  const ieWindow = useAppSelector((s) =>
    s.windows.windows.find((w) => w.id === IE_WINDOW_ID),
  );

  const handleClick = () => {
    dispatch(requestUrl(url));

    if (!ieWindow?.isOpen) {
      dispatch(openWindow(IE_WINDOW_ID));
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={className}
      title={`Open in Internet Explorer: ${url}`}
    >
      {children}
    </Button>
  );
}
