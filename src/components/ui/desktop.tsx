import Clippy from "./clippy";
import Shortcut from "./shortcut";

export default function Desktop() {
  return (
    <div className="pt-4 pl-4 grid grid-flow-col grid-cols-10 grid-rows-8 min-w-[100dvw] min-h-[100dvh] relative overflow-hidden">
        <Shortcut />
        <Shortcut />
        <Shortcut />
        <Shortcut />
        <Shortcut />
        <Shortcut />
        <Shortcut />
        <Clippy />
    </div>
    
  );
}
