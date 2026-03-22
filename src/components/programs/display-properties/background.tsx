import { Win98Button } from "@/components/shared/win-98-button";
import MonitorPreview from "./monitor-preview";

export default function Background({ wallpapers, selectedWallpaper, displayMode, setSelectedWallpaper, setDisplayMode }: {
  wallpapers: { name: string; color: string }[];
  selectedWallpaper: number;
  displayMode: string;
  setSelectedWallpaper: (index: number) => void;
  setDisplayMode: (mode: string) => void;
}) {
  const displayOptions = ["Tile", "Center", "Stretch", "Fill"];
  return (
    <>
      <MonitorPreview color={wallpapers[selectedWallpaper].color} />

      <fieldset className="border border-[#808080] border-t-white border-l-white p-2">
        <legend className="px-1 text-xs">Wallpaper</legend>

        <div className="mb-2">
          <label className="text-xs">
            Select an HTML Document or a picture:
          </label>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 h-[100px] bg-white border-2 border-[#808080] border-t-[#404040] border-l-[#404040] overflow-y-auto">
            {wallpapers.map((wp, index) => (
              <div
                key={wp.name}
                onClick={() => setSelectedWallpaper(index)}
                className={`px-1 py-[2px] flex items-center gap-1 cursor-pointer ${
                  selectedWallpaper === index
                    ? "bg-[#000080] text-white"
                    : "hover:bg-[#c0c0c0]"
                }`}
              >
                <div
                  className="w-4 h-4 border border-[#808080] flex-shrink-0"
                  style={{ backgroundColor: wp.color }}
                />
                <span className="text-xs truncate">{wp.name}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 w-[80px]">
            <Win98Button>Browse...</Win98Button>
            <Win98Button>Pattern...</Win98Button>

            <div className="mt-2">
              <label className="text-xs block mb-1">Display:</label>
              <select
                value={displayMode}
                onChange={(e) => setDisplayMode(e.target.value)}
                className="w-full bg-white border-2 border-[#808080] border-t-[#404040] border-l-[#404040] text-xs px-1 py-[2px]"
              >
                {displayOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </fieldset>
    </>
  );
}
