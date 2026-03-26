import { Pipes3D } from "./screensavers/pipes-3d";
import { Mystify } from "./screensavers/mistify";
import { Starfield } from "./screensavers/starfield";
import { FlyingWindows } from "./screensavers/flying-windows";

export function ScreenSaverRenderer({ type }: { type: number }) {
  switch (type) {
    case 3:
      return <Pipes3D />;
    case 12:
      return <Mystify />;
    case 14:
      return <Starfield />;
    case 10:
      return <FlyingWindows />;
    default:
      return <div className="fixed inset-0 bg-black" />;
  }
}
