import Section from "./Section";
import { ArrowUpRight, Shield, Network, Car, Pill } from "lucide-react";

const projects = [
  {
    icon: Shield,
    title: "Ransomware Detection Web App",
    tags: ["HTML", "CSS", "Security"],
    desc: "User-friendly web application to visualize ransomware threats and system status. Engineered to detect ransomware behavior by monitoring file modification frequency, abnormal CPU heating, and unusual usage patterns.",
  },
  {
    icon: Network,
    title: "Network & Web App Scanner",
    tags: ["Python", "Networking", "Front-End"],
    desc: "A comprehensive port scanner built with Python, paired with a clean front-end that presents complex network and vulnerability data in an accessible format for end-users.",
  },
  {
    icon: Pill,
    title: "Symptom-Based Medicine Chatbot",
    tags: ["Python", "Hackathon", "AI"],
    desc: "Built for the hackathon at KPR Engineering College, Coimbatore. The chatbot helps users find appropriate medicine by analyzing the symptoms they describe — making first-aid guidance instantly accessible.",
  },
  {
    icon: Car,
    title: "Smart Electric Vehicle",
    tags: ["IoT", "Systems", "Architecture"],
    desc: "Contributed to the development and system architecture of a smart electric vehicle project — focused on intelligent control and integrated UX.",
  },
];

const Projects = () => (
  <Section id="projects" eyebrow="Projects" title="Selected work.">
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((p) => (
        <article
          key={p.title}
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
  </Section>
);

export default Projects;
