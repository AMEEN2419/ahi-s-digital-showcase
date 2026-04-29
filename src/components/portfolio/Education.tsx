import Section from "./Section";
import { GraduationCap } from "lucide-react";

const items = [
  {
    period: "2023 – 2027",
    title: "BE — Computer Science Engineering",
    place: "Dhaanish Ahmed Institute of Technology, Coimbatore (Anna University)",
    note: "Currently pursuing.",
  },
  {
    period: "2021 – 2022",
    title: "Higher Secondary (+1 & +2 Computer Science)",
    place: "Kumarapuram HSS, Palakkad",
    note: "Secured 80%.",
  },
];

const Education = () => (
  <Section id="education" eyebrow="Education" title="Where I learn.">
    <div className="relative">
      <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
      <div className="space-y-12">
        {items.map((it, i) => (
          <div
            key={it.title}
            className={`relative grid md:grid-cols-2 gap-6 md:gap-12 items-center ${
              i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div className="absolute left-5 md:left-1/2 -translate-x-1/2 z-10">
              <div className="h-10 w-10 rounded-full border border-border bg-background flex items-center justify-center animate-glow-pulse">
                <GraduationCap size={16} />
              </div>
            </div>
            <div className="pl-16 md:pl-0 md:text-right md:pr-12">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {it.period}
              </div>
              <h3 className="font-display text-2xl md:text-3xl mt-2">{it.title}</h3>
            </div>
            <div className="pl-16 md:pl-12">
              <p className="text-foreground/90">{it.place}</p>
              <p className="text-sm text-muted-foreground mt-2">{it.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

export default Education;
