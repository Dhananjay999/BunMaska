import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { Typewriter } from "./Typewriter";
import { CountUp } from "./CountUp";
import { fetchStats } from "@/lib/portfolio";

export function Hero() {
  const { data: stats } = useQuery({ queryKey: ["stats"], queryFn: fetchStats });

  return (
    <section id="top" className="relative overflow-hidden flex items-center min-h-[100svh] pt-24 pb-12 sm:pt-28 sm:pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[320px] w-[320px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 rounded-full bg-brand/15 blur-[120px] animate-blob" />
        <div className="absolute right-0 top-40 h-[260px] w-[260px] sm:h-[400px] sm:w-[400px] rounded-full bg-brand-glow/15 blur-[120px] animate-blob" style={{ animationDelay: "4s" }} />
        <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      </div>

      <div className="container-narrow text-center w-full">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-soft">
            <Sparkles className="h-3.5 w-3.5 text-brand" />
            A multidisciplinary software studio
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="mt-5 text-balance text-[2rem] sm:text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl">
            We craft{" "}
            <Typewriter
              words={["web apps", "iOS apps", "Android apps", "backends", "experiences"]}
            />
            <br className="hidden md:block" />
            <span className="text-foreground">that people love to use.</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-sm sm:text-base text-muted-foreground md:text-lg">
            A focused crew of engineers across Frontend, backend, iOS and Android — designing,
            shipping and scaling digital products end-to-end for ambitious teams.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-gold transition-all hover:-translate-y-0.5"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              See our work
            </a>
          </div>
        </Reveal>

        <Reveal delay={500}>
          <div className="mx-auto mt-12 sm:mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {(stats && stats.length > 0
              ? stats
              : [
                  { id: "1", label: "Projects shipped", value: "50", suffix: "+" },
                  { id: "2", label: "Happy clients", value: "30", suffix: "+" },
                  { id: "3", label: "Years combined", value: "8", suffix: "+" },
                  { id: "4", label: "Client retention", value: "100", suffix: "%" },
                ]
            ).map((s) => (
              <div key={s.id} className="bg-card/80 p-4 sm:p-5 text-center">
                <div className="text-xl sm:text-2xl font-bold text-foreground md:text-3xl">
                  <CountUp value={s.value} suffix={s.suffix ?? ""} />
                </div>
                <div className="mt-1 text-[11px] sm:text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
