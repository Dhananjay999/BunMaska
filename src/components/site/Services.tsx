import { useQuery } from "@tanstack/react-query";
import { Apple, Code, Globe, Palette, Server, Smartphone, type LucideIcon } from "lucide-react";
import { fetchServices, type Service } from "@/lib/portfolio";
import { Reveal } from "./Reveal";

const ICONS: Record<string, LucideIcon> = {
  globe: Globe,
  server: Server,
  apple: Apple,
  smartphone: Smartphone,
  palette: Palette,
  code: Code,
};

export function Services() {
  const { data, isLoading } = useQuery({ queryKey: ["services"], queryFn: fetchServices });

  return (
    <section id="services" className="relative py-16 sm:py-24 md:py-32">
      <div className="container-narrow">
        <SectionHead eyebrow="Services" title="What we do" subtitle="From a quick MVP to a multi-platform product — we cover the whole stack." />

        <div className="mt-10 sm:mt-14 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : (data ?? []).map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = ICONS[service.icon ?? "code"] ?? Code;
  return (
    <Reveal delay={index * 70}>
      <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-elev">
        <div className="absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: "var(--gradient-soft)" }} />
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground shadow-gold">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mt-5 text-lg font-semibold tracking-tight">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
      </div>
    </Reveal>
  );
}


function SkeletonCard() {
  return <div className="h-44 animate-pulse rounded-2xl border border-border bg-card/40" />;
}

export function SectionHead({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Reveal>
        <span className="inline-flex rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={160}>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground md:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
