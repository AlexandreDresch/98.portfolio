import Link from "next/link";

export function ContactContent() {
  const links = [
    {
      label: "GitHub",
      url: "https://github.com/AlexandreDresch",
      handle: "@AlexandreDresch",
    },
    {
      label: "LinkedIn",
      url: "https://linkedin.com/in/alexandredresch",
      handle: "Alexandre Dresch",
    },
    {
      label: "Email",
      url: "mailto:connectWithAlexandre@proton.me",
      handle: "connectWithAlexandre@...",
    },
  ];
  return (
    <div className="space-y-3 text-[12px]">
      <h2 className="font-bold text-[13px]">Contact</h2>
      <p>
        Open to full-time roles, freelance projects and interesting
        conversations. Pick a channel below and let&apos;s have some fun.
      </p>
      <div className="space-y-2">
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-2 bg-white cursor-pointer"
          >
            <div>
              <p className="font-bold">{l.label}</p>
              <p className="text-[11px] text-[#0000EE]">{l.handle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
