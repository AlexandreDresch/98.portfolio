import Image from "next/image";
import { motion } from "framer-motion";

type Wallpaper =
  | { name: string; color: string }
  | { name: string; image: string };

export default function MonitorPreview({
  wallpaper,
  displayMode,
  isScreenSaver = false,
}: {
  wallpaper: Wallpaper;
  displayMode: string;
  isScreenSaver?: boolean;
}) {
  const normalizedDisplayMode = displayMode.toLowerCase();
  const backgroundStyle =
    "image" in wallpaper
      ? {
          backgroundImage: `url(${wallpaper.image})`,
          backgroundColor: "#008080",

          backgroundRepeat:
            normalizedDisplayMode === "tile" ? "repeat" : "no-repeat",

          backgroundSize:
            normalizedDisplayMode === "fill"
              ? "cover"
              : normalizedDisplayMode === "stretch"
                ? "100% 100%"
                : normalizedDisplayMode === "center"
                  ? "120px auto"
                  : "80px auto",

          backgroundPosition:
            normalizedDisplayMode === "center" ? "center" : "top left",
        }
      : {
          backgroundColor: wallpaper.color,
        };

  return (
    <div className="flex justify-center mb-4">
      <div className="relative w-[300px]">
        <div
          className="absolute top-[22px] left-[22px] w-[256px] h-[192px] overflow-hidden flex"
          style={backgroundStyle}
        >
          {isScreenSaver && (
            <div className="text-white text-xs animate-pulse flex items-center justify-center w-full">
              <span>Screen Saver</span>
            </div>
          )}
        </div>

        <Image
          src="/images/display.png"
          alt="Monitor"
          width={300}
          height={260}
          className="relative z-10 pointer-events-none select-none"
        />

        <motion.div
          className="absolute size-[4px] z-20"
          style={{
            bottom: "28px",
            left: "55.5%",
            transform: "translateX(-50%)",
          }}
          animate={{
            backgroundColor: [
              "#00ff00",
              "#00ff00",
              "#003300",
              "#003300",
              "#00ff00",
            ],
            boxShadow: [
              "0 0 6px #00ff00",
              "0 0 6px #00ff00",
              "0 0 2px #003300",
              "0 0 2px #003300",
              "0 0 6px #00ff00",
            ],
          }}
          transition={{
            duration: 2.5,
            times: [0, 0.4, 0.5, 0.9, 1],
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </div>
    </div>
  );
}
