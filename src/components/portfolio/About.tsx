import formalPhoto from "@/assets/ameen-formal.jpg";
import Section from "./Section";

const About = () => (
  <Section id="about" eyebrow="About" title="A different perspective.">
    <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-center">
      <div className="md:col-span-2 order-2 md:order-1">
        <div className="relative group max-w-xs mx-auto md:mx-0">
          <div className="absolute -inset-2 rounded-2xl bg-foreground/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <img
              src={formalPhoto}
              alt="Formal portrait of Ameen Islahi B"
              className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-xs uppercase tracking-[0.25em] text-foreground/80">Engineer</div>
              <div className="font-display text-lg">Ameen Islahi B</div>
            </div>
          </div>
          {/* Decorative corner */}
          <div className="absolute -top-3 -right-3 h-16 w-16 border-t border-r border-foreground/40" />
          <div className="absolute -bottom-3 -left-3 h-16 w-16 border-b border-l border-foreground/40" />
        </div>
      </div>

      <div className="md:col-span-3 order-1 md:order-2 space-y-6">
        <p className="text-xl md:text-2xl font-display leading-snug text-foreground">
          Creative and driven Computer Science Engineering student with a strong passion
          for UI/UX design and seamless user experiences.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          I bridge technical functionality with intuitive interfaces. Highly confident in my
          work, I consistently bring a unique and completely different perspective to every
          project — eager to learn, collaborate, and innovate within dynamic teams.
        </p>

        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
          <div>
            <div className="font-display text-3xl">2027</div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">Graduating</div>
          </div>
          <div>
            <div className="font-display text-3xl">1st</div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">Hackathon win</div>
          </div>
          <div>
            <div className="font-display text-3xl">4</div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">Languages</div>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

export default About;
