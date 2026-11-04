export function SkillsContent() {
  const stacks = [
    {
      cat: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    {
      cat: "Backend",
      items: [
        "Node.js",
        "Express",
        "Java",
        "Spring Boot",
        "PostgreSQL",
        "Prisma",
      ],
    },
    { cat: "Mobile", items: ["React Native", "Expo"] },
    { cat: "Tooling", items: ["Git", "Docker", "Vercel"] },
  ];
  
  return (
    <div className="space-y-3 text-[12px]">
      <h2 className="font-bold text-[13px]">Tech Stack</h2>
      <p className="text-[11px] text-gray-600">
        Technologies I use day-to-day.
      </p>
      {stacks.map((s) => (
        <div key={s.cat}>
          <p className="font-bold text-[11px] text-[#000080] mb-1">{s.cat}</p>
          <div className="flex flex-wrap gap-1">
            {s.items.map((item) => (
              <span
                key={item}
                className="bg-[#c0c0c0] px-2 py-px text-[11px]"
                style={{
                  border: "2px solid",
                  borderColor: "#fff #808080 #808080 #fff",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}