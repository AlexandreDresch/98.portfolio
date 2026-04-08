import { Pipes3D } from "./screensavers/pipes-3d";
import { Mystify } from "./screensavers/mistify";
import { Starfield } from "./screensavers/starfield";
import { FlyingWindows } from "./screensavers/flying-windows";

export function ScreenSaverRenderer({ type }: { type: number }) {
  switch (type) {
    case 1:
      return <Pipes3D />;
    case 2:
      return <Mystify />;
    case 3:
      return <Starfield />;
    case 4:
      return <FlyingWindows />;
    case 0:
    default:
      return <div className="crt fixed inset-0 bg-black" />;
  }
}
