import { Mail, MapPin, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="relative py-16 sm:py-24 md:py-32">
      <div className="container-narrow">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-card/70 p-6 sm:p-10 text-center shadow-soft md:p-16">
            <div className="absolute inset-0 -z-10 opacity-60" style={{ background: "var(--gradient-soft)" }} />
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand/20 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-brand-glow/20 blur-[100px]" />

            <span className="inline-flex rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Get in touch
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight md:text-5xl">
              Let's build <span className="text-gradient">your next idea</span>
            </h2>
            <p className="mx-auto mt-3 sm:mt-4 max-w-xl text-sm sm:text-base text-muted-foreground">
              Tell us about your project — websites, mobile apps, or anything custom. We typically reply within a day.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <a
                href="mailto:hello@bunmaska.dev"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 sm:px-6 py-3 text-sm font-semibold text-brand-foreground shadow-gold transition-transform hover:-translate-y-0.5 break-all"
              >
                <Mail className="h-4 w-4 shrink-0" /> hello@bunmaska.dev
              </a>
              <a
                href="https://wa.me/0000000000"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/70 px-5 sm:px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>

            <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              Working remotely · worldwide
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
