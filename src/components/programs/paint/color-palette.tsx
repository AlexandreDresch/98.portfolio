import { PALETTE } from "./constants";

interface ColorPaletteProps {
  fgColor: string;
  bgColor: string;
  customColor: string;
  onFgColorChange: (color: string) => void;
  onBgColorChange: (color: string) => void;
  onCustomColorChange: (color: string) => void;
}

export function ColorPalette({
  fgColor,
  bgColor,
  customColor,
  onFgColorChange,
  onBgColorChange,
  onCustomColorChange,
}: ColorPaletteProps) {
  return (
    <div className="border-t border-[#808080] p-1 pl-1.5 flex items-center gap-1 bg-[#c0c0c0] flex-wrap">
      <div className="relative w-8 h-[26px] flex-shrink-0 mr-1.5">
        <div
          title={`Background: ${bgColor}`}
          onClick={() => onFgColorChange(bgColor)}
          className="absolute bottom-0 right-0 w-[19px] h-[17px] border-2 border-[#808080] border-r-white border-b-white cursor-pointer"
          style={{ background: bgColor }}
        />
        <div
          title={`Foreground: ${fgColor}`}
          className="absolute top-0 left-0 w-[19px] h-[17px] border-2 border-[#808080] border-r-white border-b-white z-10"
          style={{ background: fgColor }}
        />
      </div>

      <div className="flex flex-wrap gap-px flex-1">
        {PALETTE.map((c) => (
          <div
            key={c}
            title={c}
            onClick={() => onFgColorChange(c)}
            onContextMenu={(e) => {
              e.preventDefault();
              onBgColorChange(c);
            }}
            className="w-3.5 h-3.5 border border-[#808080] border-r-white border-b-white cursor-default flex-shrink-0"
            style={{ background: c }}
          />
        ))}
      </div>

      <input
        type="color"
        value={customColor}
        title="Custom color (left=FG)"
        onChange={(e) => {
          onCustomColorChange(e.target.value);
          onFgColorChange(e.target.value);
        }}
        className="w-3.5 h-3.5 p-0 border border-[#808080] cursor-pointer flex-shrink-0"
      />
    </div>
  );
}
