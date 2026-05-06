import Image from "next/image";
import { TOOL_ROWS, PALETTE, CANVAS_W, CANVAS_H } from "./constants";

interface AboutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  undoStackLength: number;
}

export function AboutDialog({
  isOpen,
  onClose,
  undoStackLength,
}: AboutDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#c0c0c0] crt border-2 border-white border-r-[#808080] border-b-[#808080] w-[300px]"
      >
        <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] h-[22px] flex items-center justify-between px-1">
          <span className="text-white text-xs font-bold flex items-center gap-1">
            <Image
              src="/icons/paint.png"
              alt="Paint Icon"
              width={20}
              height={20}
            />
            About Paint
          </span>
          <button
            onClick={onClose}
            className="w-[15px] h-[13px] bg-[#c0c0c0] border border-white border-r-[#808080] border-b-[#808080] text-[9px] p-0 cursor-pointer"
          >
            ×
          </button>
        </div>
        <div className="p-5 text-center">
          <div className="flex justify-center w-full">
            <Image
              src="/icons/paint.png"
              alt="Paint Icon"
              width={52}
              height={52}
            />
          </div>
          <div className="font-bold text-sm mb-1.5">Paint</div>
          <div className="text-[#444] text-[11px] leading-relaxed">
            Version 4.10.XXXX
            <br />
            For 98.portfolio
            <br />
            © 1997–(today) Alexandre Dresch Corp.
            <br />
            <br />
            <div className="font-bold text-sm mb-1.5">Paint</div>
            <div className="text-[#444] text-[11px] leading-relaxed">
              Version 4.10.XXXX
              <br />
              For 98.portfolio
              <br />
              © 1997–(today) Alexandre Dresch Corp.
              <br />
              <br />
              <span className="text-[10px] text-[#666]">
                Tools: {TOOL_ROWS.flat().length} | Palette: {PALETTE.length}{" "}
                colors
                <br />
                Canvas: {CANVAS_W}×{CANVAS_H} px | Undo: {undoStackLength} steps
              </span>
            </div>
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={onClose}
                className="py-0.5 px-6 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] cursor-pointer text-xs"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
