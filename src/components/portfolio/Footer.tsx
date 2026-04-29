const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div>© {new Date().getFullYear()} Ameen Islahi B. Crafted with intent.</div>
      <div className="font-display tracking-[0.3em] text-xs uppercase">AHI · Portfolio</div>
    </div>
  </footer>
);
export default Footer;
