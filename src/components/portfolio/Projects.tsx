import Section from "./Section";
import { ArrowUpRight, Shield, Network, Car, Pill, X, ExternalLink } from "lucide-react";
import { useState } from "react";

type Project = {
  icon: typeof Shield;
  title: string;
  tags: string[];
  desc: string;
  preview?: string; // optional URL to embed
};

const projects: Project[] = [
  {
    icon: Shield,
    title: "Ransomware Detection Web App",
    tags: ["HTML", "CSS", "Security"],
    desc: "User-friendly web application to visualize ransomware threats and system status. Detects ransomware behavior by monitoring file modification frequency, abnormal CPU heating, and unusual usage patterns.",
  },
  {
    icon: Network,
    title: "Network & Web App Scanner",
    tags: ["Python", "Networking", "Front-End"],
    desc: "A comprehensive port scanner built with Python, paired with a clean front-end that presents complex network and vulnerability data in an accessible format.",
  },
  {
    icon: Pill,
    title: "Symptom-Based Medicine Chatbot",
    tags: ["Python", "Hackathon", "AI"],
    desc: "Built for the hackathon at KPR Engineering College, Coimbatore. The chatbot helps users find appropriate medicine by analyzing the symptoms they describe.",
  },
  {
    icon: Car,
    title: "Smart Electric Vehicle",
    tags: ["IoT", "Systems", "Architecture"],
    desc: "Contributed to the development and system architecture of a smart electric vehicle project — focused on intelligent control and integrated UX.",
  },
];

const Projects = () => {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <Section id="projects" eyebrow="The Archive" title="Case Studies.">
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <article
            key={p.title}
            onClick={() => setActive(p)}
            className="group relative rounded-2xl border border-border bg-card p-8 overflow-hidden hover-scale cursor-pointer"
          >
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-foreground/[0.05] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <div className="h-12 w-12 rounded-xl border border-border flex items-center justify-center bg-background/40">
                  <p.icon size={20} />
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </div>
              <h3 className="font-display text-2xl md:text-3xl mb-3">{p.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs uppercase tracking-[0.15em] text-muted-foreground border border-border rounded-full px-3 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* In-page browser-frame modal preview */}
      {active && (
        <div
          className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-up"
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-5xl rounded-2xl border border-border bg-card overflow-hidden shadow-[0_0_60px_-10px_hsl(0_0%_100%/0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Browser chrome */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-foreground/30" />
                <span className="h-3 w-3 rounded-full bg-foreground/50" />
                <span className="h-3 w-3 rounded-full bg-foreground/70" />
                <span className="ml-4 text-xs text-muted-foreground tracking-[0.2em] uppercase">
                  {active.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-full border border-border px-3 py-1.5 text-xs inline-flex items-center gap-1 hover:bg-foreground hover:text-background transition-colors">
                  Launch v2 <ExternalLink size={12} />
                </button>
                <button
                  onClick={() => setActive(null)}
                  className="h-8 w-8 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                  aria-label="Close preview"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
            {/* Body */}
            <div className="p-10 md:p-16 min-h-[420px] flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-2xl border border-border flex items-center justify-center mb-6 bg-background/40">
                <active.icon size={26} />
              </div>
              <h3 className="font-display text-3xl md:text-5xl text-gradient-mono mb-4">
                {active.title}
              </h3>
              <p className="max-w-xl text-muted-foreground leading-relaxed mb-8">
                {active.desc}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {active.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs uppercase tracking-[0.2em] border border-border rounded-full px-3 py-1.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Projects;
