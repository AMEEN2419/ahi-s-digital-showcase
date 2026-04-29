import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-background/70 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="container max-w-6xl flex items-center justify-between py-4">
        <button
          onClick={() => handleNav("#hero")}
          className="font-display font-bold text-lg tracking-tight"
          aria-label="Home"
        >
          AI<span className="text-muted-foreground">.</span>
        </button>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => handleNav(l.href)}
                className="story-link text-sm text-foreground/80 hover:text-foreground"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <a
          href="/Ameen_Islahi_Resume.pdf"
          download
          className="hidden md:inline-flex items-center rounded-full border border-foreground/30 bg-foreground/5 px-5 py-2 text-sm hover:bg-foreground hover:text-background transition-colors"
        >
          Resume
        </a>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-fade-up">
          <ul className="container max-w-6xl py-6 space-y-4">
            {links.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => handleNav(l.href)}
                  className="text-lg font-display"
                >
                  {l.label}
                </button>
              </li>
            ))}
            <li>
              <a
                href="/Ameen_Islahi_Resume.pdf"
                download
                className="inline-block rounded-full border border-foreground/30 px-5 py-2 text-sm"
              >
                Download Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
