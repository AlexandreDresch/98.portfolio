export default function MonitorPreview({
  color,
  isScreenSaver = false,
}: {
  color: string;
  isScreenSaver?: boolean;
}) {
  return (
    <div className="flex justify-center mb-4">
      <div className="relative">
        <div className="w-[180px] h-[140px] bg-[#c0c0c0] rounded-t-lg border-4 border-[#808080] flex items-center justify-center">
          <div
            className="w-[140px] h-[100px] border-2 border-[#404040] border-t-[#000] border-l-[#000]"
            style={{ backgroundColor: color }}
          >
            <div className="w-full h-full flex items-center justify-center">
              {isScreenSaver ? (
                <div className="text-white text-xs animate-pulse">
                  Screen Saver
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-[2px] transform scale-75">
                  <div className="w-4 h-4 bg-[#ff0000]"></div>
                  <div className="w-4 h-4 bg-[#00ff00]"></div>
                  <div className="w-4 h-4 bg-[#0000ff]"></div>
                  <div className="w-4 h-4 bg-[#ffff00]"></div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-[60px] h-[8px] bg-[#808080]"></div>
        </div>
        <div className="flex justify-center">
          <div className="w-[100px] h-[10px] bg-[#808080] rounded-b-sm"></div>
        </div>
      </div>
    </div>
  );
}
