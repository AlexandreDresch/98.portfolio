export function FeaturesContent() {
  const features = [
    {
      title: "Working file explorer",
      desc: "Browse frontend and backend projects with a full Win98 folder UI.",
    },
    {
      title: "MS Paint",
      desc: "Fully functional paint app with 16 tools, undo/redo and zoom.",
    },
    {
      title: "MS-DOS Terminal",
      desc: "40+ commands, Easter eggs, Hatsune Miku ASCII art and a CRT scanline overlay.",
    },
    {
      title: "Winamp",
      desc: "Real music player powered by the YouTube IFrame API.",
    },
    {
      title: "Internet Explorer",
      desc: "Tabbed browser with history, favorites, and archive.org links.",
    },
    {
      title: "Document Viewer",
      desc: "Reads Markdown and PDF files inside a Win98 window.",
    },
    {
      title: "98.DOOM",
      desc: "A DOOM-style game where you battle waves of BSOD enemies.",
    },
    {
      title: "Clippy",
      desc: "He's back. And he has opinions about your code.",
    },
    {
      title: "Dual Monitor",
      desc: "Extend the desktop to a real second browser window and drag windows between them.",
    },
    {
      title: "Control Panel",
      desc: "Display Properties, theming options and the classic Windows 98 settings UI.",
    },
  ];

  return (
    <div className="space-y-2 text-[12px]">
      <h2 className="font-bold text-[13px]">Features</h2>
      <p className="text-[11px] text-gray-600">
        Some things included in this portfolio.
      </p>
      <div className="space-y-1.5">
        {features.map((f) => (
          <div key={f.title} className="flex gap-2 items-start">
            <div>
              <span className="font-bold">{f.title}</span>
              <span className="text-[#444]"> — {f.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
