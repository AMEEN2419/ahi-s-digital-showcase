import heroPhoto from "@/assets/ameen-hero.jpg";
import { ArrowDown, Download } from "lucide-react";

const Hero = () => {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const name = "AMEEN ISLAHI B";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden grain"
    >
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-foreground/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-foreground/[0.03] blur-3xl" />

      <div className="container max-w-6xl grid md:grid-cols-2 gap-12 md:gap-8 items-center">
        {/* Text */}
        <div className="order-2 md:order-1">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-muted-foreground animate-fade-up">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse" />
            Available for opportunities
          </div>

          <h1 className="font-display font-bold leading-[0.95] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gradient-mono">
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
            className="mt-6 max-w-md text-base md:text-lg text-muted-foreground animate-fade-up"
            style={{ animationDelay: "900ms" }}
          >
            Computer Science Engineer & <span className="text-foreground">UI/UX Designer</span>.
            Bridging technical depth with intuitive interfaces — bringing a different
            perspective to every project.
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

        {/* Glowing portrait */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full animate-spin-slow opacity-60">
              <div className="absolute inset-0 rounded-full border border-dashed border-foreground/20" />
            </div>
            {/* Glow */}
            <div className="relative h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96 rounded-full animate-glow-pulse">
              <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-foreground/20">
                <img
                  src={heroPhoto}
                  alt="Portrait of Ameen Islahi B, UI/UX designer and engineer"
                  className="h-full w-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                  loading="eager"
                />
              </div>
            </div>
            {/* Floating tag */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 animate-float">
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
