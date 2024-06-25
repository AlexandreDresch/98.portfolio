import Clippy from "../shared/clippy";
import Shortcut from "../dock/shortcut";

export default function Desktop() {
  return (
    <div className="pt-4 flex flex-col gap-8 min-w-[100dvw] min-h-[100dvh] relative overflow-hidden">
      <Shortcut
        image="/recycle-bin.png"
        name="Recycle Bin"
        isDocument={false}
      />
      <Shortcut
        image="/computer-explorer.png"
        name="My Computer"
        isDocument={false}
      />
      <Shortcut image="/folder.png" name="BackEnd" isDocument={false} />
      <Shortcut image="/folder.png" name="FrontEnd" isDocument={false} />
      <Shortcut image="/folder.png" name="Mobile" isDocument={false} />
      <Shortcut
        image="/file.png"
        name="My Resume"
        isDocument
        documentPath="./englishCV.pdf"
      />
      <Shortcut
        image="/help-book.png"
        name="About the Project"
        isDocument
        documentPath=""
      />
      <Shortcut image="/modem.png" name="Contact me" isDocument={false} />
      <Clippy />
    </div>
  );
}
