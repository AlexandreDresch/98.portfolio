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
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] w-[300px]"
      >
        <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] h-[22px] flex items-center justify-between px-1">
          <span className="text-white text-xs font-bold flex items-center gap-1">
            <svg width="13" height="13" viewBox="0 0 14 14">
              <rect width="14" height="14" fill="#fff" />
              <rect width="7" height="7" fill="#f00" />
              <rect x="7" width="7" height="7" fill="#0f0" />
              <rect y="7" width="7" height="7" fill="#00f" />
              <rect x="7" y="7" width="7" height="7" fill="#ff0" />
            </svg>
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
          <svg width="52" height="52" viewBox="0 0 14 14" className="mb-3">
            <rect width="14" height="14" fill="#fff" />
            <rect width="7" height="7" fill="#f00" />
            <rect x="7" width="7" height="7" fill="#0f0" />
            <rect y="7" width="7" height="7" fill="#00f" />
            <rect x="7" y="7" width="7" height="7" fill="#ff0" />
          </svg>
          <div className="font-bold text-sm mb-1.5">Paint</div>
          <div className="text-[#444] text-[11px] leading-relaxed">
            Version 4.10.1998
            <br />
            For Microsoft Windows 98
            <br />
            © 1981–1998 Microsoft Corp.
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
  );
}
