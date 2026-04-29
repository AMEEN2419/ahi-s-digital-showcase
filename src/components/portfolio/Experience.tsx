import Section from "./Section";
import { Trophy, Briefcase, Languages, BookOpen } from "lucide-react";

const Experience = () => (
  <Section id="experience" eyebrow="Experience" title="Work, wins & words.">
    <div className="grid md:grid-cols-2 gap-6">
      <div className="rounded-2xl border border-border bg-card p-8 hover-scale">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase size={18} />
          <h3 className="font-display text-xl">Professional Experience</h3>
        </div>
        <div className="border-l border-border pl-5">
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            07/2025 – 08/2025
          </div>
          <div className="font-display text-2xl mt-1">Cyber Security Intern</div>
          <div className="text-foreground/80">Ediglobe</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>Collaborated with cross-functional technical teams to analyze system vulnerabilities.</li>
            <li>Documented complex technical processes, translating backend functionality for stakeholders.</li>
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 hover-scale">
        <div className="flex items-center gap-3 mb-6">
          <Trophy size={18} />
          <h3 className="font-display text-xl">Achievements & Leadership</h3>
        </div>
        <ul className="space-y-4 text-foreground/90">
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground" />
            Team Captain across all participated hackathons — leading and managing project development.
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground" />
            <span>
              <span className="font-display">1st Place</span> — Inter-International Hackathon hosted by my college.
            </span>
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 hover-scale">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen size={18} />
          <h3 className="font-display text-xl">Courses</h3>
        </div>
        <ul className="space-y-2 text-foreground/90">
          <li>Ethical Hacking — NSDC</li>
          <li>Cyber Security & Ethical Hacking — Kshitij</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 hover-scale">
        <div className="flex items-center gap-3 mb-6">
          <Languages size={18} />
          <h3 className="font-display text-xl">Languages</h3>
        </div>
        <div className="space-y-3">
          {[
            { name: "English", level: 100 },
            { name: "Malayalam", level: 100 },
            { name: "Tamil", level: 100 },
            { name: "Hindi", level: 60 },
          ].map((l) => (
            <div key={l.name}>
              <div className="flex justify-between text-sm mb-1">
                <span>{l.name}</span>
                <span className="text-muted-foreground">{l.level === 100 ? "Fluent" : "Intermediate"}</span>
              </div>
              <div className="h-px bg-border overflow-hidden">
                <div
                  className="h-full bg-foreground transition-all duration-1000"
                  style={{ width: `${l.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

export default Experience;
