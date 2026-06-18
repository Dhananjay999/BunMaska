export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container-narrow flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-brand text-[10px] font-bold text-brand-foreground">BM</span>
          <span>© {new Date().getFullYear()} BunMaska Studio. All rights reserved.</span>
        </div>
        <div className="flex gap-5">
          <a href="#services" className="hover:text-foreground">Services</a>
          <a href="#team" className="hover:text-foreground">Team</a>
          <a href="#projects" className="hover:text-foreground">Projects</a>
          <a href="#faq" className="hover:text-foreground">Q&A</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}
