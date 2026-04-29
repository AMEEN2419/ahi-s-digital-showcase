import Section from "./Section";

const groups = [
  {
    title: "Design & UX",
    items: ["UI/UX Design", "Figma", "Adobe XD"],
  },
  {
    title: "Technical & Front-End",
    items: ["HTML", "CSS", "Python", "Java", "C", "C++", "SQL"],
  },
  {
    title: "AI & Productivity",
    items: ["Prompt Engineering", "AI Tools", "Workflow Automation"],
  },
  {
    title: "Soft Skills",
    items: ["Communication", "Leadership", "Team Collaboration", "Problem-Solving", "Innovative Thinking"],
  },
];

const Skills = () => (
  <Section id="skills" eyebrow="Skills" title="What I bring.">
    <div className="grid md:grid-cols-2 gap-6">
      {groups.map((g, gi) => (
        <div
          key={g.title}
          className="group relative rounded-2xl border border-border bg-card p-8 hover-scale overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl">{g.title}</h3>
              <span className="text-xs text-muted-foreground tabular-nums">
                0{gi + 1}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item, i) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-background/50 px-3 py-1.5 text-sm text-foreground/90 transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

export default Skills;
