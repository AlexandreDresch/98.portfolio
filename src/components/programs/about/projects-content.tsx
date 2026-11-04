import Image from "next/image";

export function ProjectsContent() {
  return (
    <div className="space-y-3 text-[12px]">
      <h2 className="font-bold text-[13px]">Selected Projects</h2>
      <p className="text-[11px] text-gray-600">
        Come on, I&apos;ve built a beautiful folder system for you to explore my
        projects. It&apos;s much more fun than reading a list of links here. But
        if you insist, you can find the source code for all my projects on{" "}
        <a
          href="https://github.com/AlexandreDresch"
          target="_blank"
          rel="noreferrer"
          className="text-[11px] text-[#0000EE] underline hover:text-[#551A8B]"
        >
          GitHub
        </a>
      </p>
      <div className="mt-10 flex flex-col h-full items-center justify-center">
        <Image
          src="/clippy-thinking.gif"
          alt="Clippy thinking"
          width={200}
          height={150}
        />
      </div>
    </div>
  );
}
