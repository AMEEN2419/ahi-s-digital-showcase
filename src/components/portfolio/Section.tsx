import { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

const Section = ({ id, eyebrow, title, children, className = "" }: SectionProps) => {
  const ref = useReveal<HTMLElement>();
  return (
    <section
      id={id}
      ref={ref}
      className={`reveal scroll-mt-24 py-20 md:py-32 ${className}`}
    >
      <div className="container max-w-6xl">
        {(eyebrow || title) && (
          <div className="mb-12 md:mb-16">
            {eyebrow && (
              <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <span className="h-px w-8 bg-foreground/40" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient-mono">
                {title}
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
