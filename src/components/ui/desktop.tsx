import Clippy from "./clippy";
import Shortcut from "./shortcut";

export default function Desktop() {
  return (
    <div className="pt-4 flex flex-col gap-8 min-w-[100dvw] min-h-[100dvh] relative overflow-hidden">
        <Shortcut image="/folder.png" name="BackEnd"/>
        <Shortcut image="/folder.png" name="FrontEnd"/>
        <Shortcut image="/folder.png" name="Mobile"/>
        <Shortcut image="/folder.png" name="BackEnd"/>
        <Shortcut image="/folder.png" name="BackEnd"/>
        <Shortcut image="/folder.png" name="BackEnd"/>
        <Shortcut image="/folder.png" name="BackEnd"/>
        <Shortcut image="/folder.png" name="BackEnd"/>
        <Clippy />
    </div>
    
  );
}
