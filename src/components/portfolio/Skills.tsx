import Section from "./Section";

const skills = [
  { label: "UI/UX", kind: "DESIGN", x: 18, y: 22, size: "lg" },
  { label: "Figma", kind: "TOOL", x: 72, y: 14, size: "md" },
  { label: "Python", kind: "LANG", x: 78, y: 38, size: "lg" },
  { label: "Java", kind: "LANG", x: 12, y: 52, size: "md" },
  { label: "C / C++", kind: "LANG", x: 30, y: 78, size: "md" },
  { label: "SQL", kind: "DATA", x: 60, y: 70, size: "md" },
  { label: "HTML", kind: "WEB", x: 42, y: 18, size: "sm" },
  { label: "CSS", kind: "WEB", x: 50, y: 50, size: "lg" },
  { label: "Prompt Eng.", kind: "AI", x: 84, y: 62, size: "md" },
  { label: "Leadership", kind: "SOFT", x: 22, y: 36, size: "sm" },
  { label: "Innovation", kind: "SOFT", x: 88, y: 84, size: "sm" },
  { label: "Communication", kind: "SOFT", x: 8, y: 80, size: "sm" },
] as const;

const sizeMap = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-4 text-base",
} as const;

const Skills = () => (
  <Section
    id="skills"
    eyebrow="Tech Stack"
    title="The Engineering Core."
  >
    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground -mt-8 mb-10">
      Scroll to enter
    </p>

    <div className="relative h-[520px] md:h-[560px] rounded-3xl border border-border bg-card/30 backdrop-blur overflow-hidden">
      {/* radial glow center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(0_0%_100%/0.08),transparent_60%)]" />

      {/* connector lines via SVG */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {skills.map((a, i) =>
          skills.slice(i + 1).map((b, j) => {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d > 28) return null;
            return (
              <line
                key={`${i}-${j}`}
                x1={`${a.x}%`}
                y1={`${a.y}%`}
                x2={`${b.x}%`}
                y2={`${b.y}%`}
                stroke="hsl(0 0% 100% / 0.15)"
                strokeWidth="1"
                strokeDasharray="3 4"
              />
            );
          })
        )}
      </svg>

      {skills.map((s, i) => (
        <div
          key={s.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-float"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animationDelay: `${(i % 5) * 350}ms`,
            animationDuration: `${4 + (i % 4)}s`,
          }}
        >
          <div
            className={`group ${sizeMap[s.size]} rounded-2xl border border-border bg-background/80 backdrop-blur flex items-center gap-3 hover:border-foreground hover:bg-foreground hover:text-background transition-all cursor-default shadow-[0_0_30px_-10px_hsl(0_0%_100%/0.25)]`}
          >
            <span className="font-display font-semibold">{s.label}</span>
            <span className="text-[10px] tracking-[0.2em] text-muted-foreground group-hover:text-background/70">
              {s.kind}
            </span>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

export default Skills;
