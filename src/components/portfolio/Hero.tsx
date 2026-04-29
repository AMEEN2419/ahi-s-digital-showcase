import heroPhoto from "@/assets/ameen-hero.jpg";
import { ArrowDown, Download, Code2, Palette, Brain, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

const ROLES = [
  { label: "Engineer", ghost: "DEVELOPER" },
  { label: "UI/UX Designer", ghost: "DESIGNER" },
  { label: "Creative Thinker", ghost: "CREATIVE" },
  { label: "Problem Solver", ghost: "BUILDER" },
];

const Hero = () => {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const name = "AMEEN ISLAHI B";
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2600);
    return () => clearInterval(t);
  }, []);

  const role = ROLES[roleIdx];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden grain"
    >
      {/* Giant ghost word */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[14%] flex justify-center"
      >
        <span
          key={role.ghost}
          className="font-display font-black text-foreground/[0.06] text-[18vw] md:text-[14vw] leading-none tracking-tighter select-none animate-fade-up"
        >
          {role.ghost}
        </span>
      </div>

      <div className="container max-w-6xl grid md:grid-cols-2 gap-12 md:gap-8 items-center relative">
        {/* Text */}
        <div className="order-2 md:order-1">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-muted-foreground animate-fade-up">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse" />
            Available for opportunities
          </div>

          <p className="font-display text-2xl md:text-3xl text-muted-foreground mb-2 animate-fade-up">
            Hi, I'm <span className="inline-block animate-float">👋</span>
          </p>

          <h1 className="font-display font-bold leading-[0.95] text-5xl sm:text-6xl md:text-7xl text-gradient-mono">
            {name.split(" ").map((word, wi) => (
              <span key={wi} className="block overflow-hidden">
                <span className="inline-block">
                  {word.split("").map((ch, i) => (
                    <span
                      key={i}
                      className="inline-block animate-fade-up"
                      style={{ animationDelay: `${wi * 200 + i * 40}ms` }}
                    >
                      {ch}
                    </span>
                  ))}
                </span>{" "}
              </span>
            ))}
          </h1>

          <p
            className="mt-4 font-display text-2xl md:text-3xl animate-fade-up"
            style={{ animationDelay: "700ms" }}
          >
            I am{" "}
            <span
              key={role.label}
              className="inline-block text-gradient-mono animate-fade-up border-b-2 border-foreground/40 pb-0.5"
            >
              {role.label}
            </span>
          </p>

          <p
            className="mt-6 max-w-md text-base md:text-lg text-muted-foreground animate-fade-up"
            style={{ animationDelay: "900ms" }}
          >
            Computer Science Engineer & UI/UX Designer. Bridging technical depth with
            intuitive interfaces — bringing a different perspective to every project.
          </p>

          <div
            className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up"
            style={{ animationDelay: "1100ms" }}
          >
            <button
              onClick={() => scrollTo("#projects")}
              className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3 text-sm font-medium hover:scale-105 transition-transform"
            >
              View Projects
              <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="rounded-full border border-foreground/30 px-7 py-3 text-sm hover:bg-foreground hover:text-background transition-colors"
            >
              Contact Me
            </button>
            <a
              href="/Ameen_Islahi_Resume.pdf"
              download
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground story-link"
            >
              <Download size={14} /> Resume
            </a>
          </div>
        </div>

        {/* Glowing portrait + orbits */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative h-[22rem] w-[22rem] sm:h-[26rem] sm:w-[26rem] flex items-center justify-center">
            {/* outer dashed rotating ring */}
            <div className="absolute inset-0 rounded-full animate-spin-slow">
              <div className="absolute inset-0 rounded-full border border-dashed border-foreground/25" />
              {/* arc accents */}
              <span className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-foreground" />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-foreground/70" />
            </div>
            {/* counter-rotating inner ring */}
            <div className="absolute inset-6 rounded-full animate-spin-rev">
              <div className="absolute inset-0 rounded-full border border-foreground/10" />
            </div>

            {/* Glow + portrait */}
            <div className="relative h-64 w-64 sm:h-72 sm:w-72 rounded-full animate-glow-pulse">
              <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-foreground/30">
                <img
                  src={heroPhoto}
                  alt="Portrait of Ameen Islahi B, UI/UX designer and engineer"
                  className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  loading="eager"
                />
              </div>
            </div>

            {/* Orbiting tech badges */}
            {[
              { Icon: Code2, label: "Code", pos: "top-2 right-4" },
              { Icon: Palette, label: "Design", pos: "top-4 left-2" },
              { Icon: Brain, label: "AI", pos: "bottom-6 right-2" },
              { Icon: Cpu, label: "Systems", pos: "bottom-2 left-6" },
            ].map(({ Icon, label, pos }, i) => (
              <div
                key={label}
                className={`absolute ${pos} h-12 w-12 rounded-2xl border border-border bg-card/80 backdrop-blur flex items-center justify-center animate-float`}
                style={{ animationDelay: `${i * 400}ms` }}
                title={label}
              >
                <Icon size={18} />
              </div>
            ))}

            {/* Floating tag */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 animate-float">
              <div className="rounded-full border border-border bg-background/80 backdrop-blur px-4 py-2 text-xs uppercase tracking-[0.2em]">
                Palakkad · India
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors flex flex-col items-center gap-2"
      >
        Scroll
        <span className="h-10 w-px bg-foreground/30 animate-pulse" />
      </a>
    </section>
  );
};

export default Hero;
