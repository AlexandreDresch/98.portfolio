"use client";

import { Button } from "../ui/button";
import { useClippy } from "@/hooks/use-clippy";

export default function ClippyDemo() {
  const { triggerClippy, dispatchAppAction } = useClippy();

  return (
    <div className="flex flex-col gap-2 p-4">
      <h2 className="text-lg font-bold">Clippy Demo</h2>
      <p className="text-sm">
        Click the buttons below to trigger Clippy with different messages:
      </p>

      <div className="flex flex-wrap gap-2 mt-2">
        <Button
          variant="outline"
          onClick={() => triggerClippy("general")}
          className="text-xs"
        >
          General Help
        </Button>

        <Button
          variant="outline"
          onClick={() => triggerClippy("tips")}
          className="text-xs"
        >
          Show Tips
        </Button>

        <Button
          variant="outline"
          onClick={() => triggerClippy("help")}
          className="text-xs"
        >
          Portfolio Help
        </Button>

        <Button
          variant="outline"
          onClick={() => dispatchAppAction("window")}
          className="text-xs"
        >
          Simulate Window Action
        </Button>
      </div>
    </div>
  );
}
