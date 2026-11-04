export function AboutContent() {
  return (
    <div className="space-y-3 text-[12px] leading-relaxed">
      <h2 className="font-bold text-[13px]">About this portfolio</h2>
      <p>
        Hi — I&apos;m <strong>Alexandre Dresch</strong>, a full-stack developer
        who likes to build things that feel like they shouldn&apos;t exist. This
        portfolio is one of those things.
      </p>
      <p>
        What you&apos;re looking at is a (almost) fully functional Windows 98
        desktop, running in your browser. Complete with draggable windows, a
        working taskbar, a paint app, a terminal, Winamp, Internet Explorer with
        real tabs, and a DOOM-style game where you can battle waves of BSOD
        enemies.
      </p>
      <p>
        I started this project because a plain portfolio felt boring. I grew up
        with Windows 98 and wanted to revisit that era — the chunky borders, the
        gray gradients, the satisfying click of a pixel-perfect button. I think
        a good portfolio should show <em>how</em> you think, not just what
        you&apos;ve shipped.
      </p>
      <p>
        Built with <strong>Next.js</strong>, <strong>TypeScript</strong>,{" "}
        <strong>Tailwind CSS</strong>, <strong>Framer Motion</strong> and a
        considerable amount of stubbornness.
      </p>
      <p>
        Source code is available on{" "}
        <a
          href="https://github.com/AlexandreDresch/98.portfolio"
          target="_blank"
          rel="noreferrer"
          className="text-[#0000EE] underline hover:text-[#551A8B]"
        >
          GitHub
        </a>
        . Your feedback is always welcome (if you know how to behave yourself).
      </p>
    </div>
  );
}
