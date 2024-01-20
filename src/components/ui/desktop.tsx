import Clippy from "./clippy";
import Shortcut from "./shortcut";

export default function Desktop() {
  return (
    <div className="pt-4 flex flex-col gap-8 min-w-[100dvw] min-h-[100dvh] relative overflow-hidden">
      <Shortcut image="/recycle-bin.png" name="Recycle Bin" />
      <Shortcut image="/computer-explorer.png" name="My Computer" />
      <Shortcut image="/folder.png" name="BackEnd" />
      <Shortcut image="/folder.png" name="FrontEnd" />
      <Shortcut image="/folder.png" name="Mobile" />
      <Shortcut image="/file.png" name="My Resume" />      
      <Shortcut image="/help-book.png" name="About the Project" />
      <Shortcut image="/modem.png" name="Contact me" />
      <Clippy />
    </div>
  );
}
