import { Win98Button } from "@/components/shared/win-98-button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setTheme } from "@/store/settings-slice";
import { themes } from "@/themes";

const colorSchemes = [
  "Windows Standard",
  "Brick",
  "Desert",
  "Eggplant",
  "High Contrast Black",
  "High Contrast White",
  "Lilac",
  "Maple",
  "Marine",
  "Plum",
  "Pumpkin",
  "Rainy Day",
  "Red, White, and Blue",
  "Rose",
  "Slate",
  "Spruce",
  "Storm",
  "Teal",
  "Wheat",
];

export default function Appearance() {
  const dispatch = useAppDispatch();

  const theme = useAppSelector((s) => s.settings.draft.theme);

  const selectedIndex = colorSchemes.findIndex(
    (name) => themes[name] === theme,
  );
  return (
    <>
      <div
        className="border-2 p-4 mb-3 h-[160px] relative"
        style={{ background: theme.desktop }}
      >
        <div
          className="absolute top-2 left-2 w-[140px] border-2"
          style={{ background: theme.window }}
        >
          <div
            className="px-2 py-[2px] text-white text-xs"
            style={{ background: theme.inactiveTitle }}
          >
            Inactive Window
          </div>

          <div className="p-2 text-xs" style={{ color: theme.text }}>
            Window Text
          </div>
        </div>

        <div
          className="absolute top-6 left-12 w-[180px] border-2"
          style={{ background: theme.window }}
        >
          <div
            className="px-2 py-[2px] text-white text-xs font-bold"
            style={{
              background: `linear-gradient(to right, ${theme.activeTitleStart}, ${theme.activeTitleEnd})`,
            }}
          >
            Active Window
          </div>

          <div className="border-b" style={{ background: theme.window }}>
            <span className="text-xs pl-2 underline">N</span>
            <span className="text-xs">ormal</span>
            <span className="text-xs px-2" style={{ color: "#808080" }}>
              Disabled
            </span>
            <span
              className="text-xs px-2 text-white"
              style={{ background: theme.activeTitleStart }}
            >
              Selected
            </span>
          </div>

          <div className="p-2 text-xs bg-white">Window Text</div>
        </div>
      </div>

      <div className="flex gap-2 mb-3 items-end">
        <div className="flex-1">
          <label className="text-xs block mb-1">Scheme:</label>
          <select
            value={selectedIndex}
            onChange={(e) => {
              const index = Number(e.target.value);
              const schemeName = colorSchemes[index];

              dispatch(setTheme(themes[schemeName]));
            }}
            className="w-full bg-white border-2 border-[#808080] border-t-[#404040] border-l-[#404040] text-xs px-1 py-1"
          >
            {colorSchemes.map((scheme, index) => (
              <option key={scheme} value={index}>
                {scheme}
              </option>
            ))}
          </select>
        </div>
        <Win98Button>Save As...</Win98Button>
        <Win98Button>Delete</Win98Button>
      </div>

      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <label className="text-xs block mb-1">Item:</label>
          <select className="w-full bg-white border-2 border-[#808080] border-t-[#404040] border-l-[#404040] text-xs px-1 py-1">
            <option>Desktop</option>
            <option>Application Background</option>
            <option>Active Title Bar</option>
            <option>Inactive Title Bar</option>
            <option>Menu</option>
            <option>Selected Items</option>
            <option>Window</option>
            <option>Scrollbar</option>
            <option>3D Objects</option>
          </select>
        </div>
        <div>
          <label className="text-xs block mb-1">Size:</label>
          <input
            type="text"
            className="w-12 bg-white border-2 border-[#808080] border-t-[#404040] border-l-[#404040] text-xs px-1 py-[2px]"
          />
        </div>
        <div>
          <label className="text-xs block mb-1">Color:</label>
          <div className="w-10 h-5 bg-[#008080] border-2 border-[#808080] border-t-[#404040] border-l-[#404040] cursor-pointer"></div>
        </div>
        <div>
          <label className="text-xs block mb-1">Color 2:</label>
          <div className="w-10 h-5 bg-[#1084d0] border-2 border-[#808080] border-t-[#404040] border-l-[#404040] cursor-pointer"></div>
        </div>
      </div>
    </>
  );
}
