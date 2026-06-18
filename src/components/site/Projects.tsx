import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github } from "lucide-react";
import { fetchProjects, type Project } from "@/lib/portfolio";
import { Reveal } from "./Reveal";
import { SectionHead } from "./Services";

export function Projects() {
  const { data, isLoading } = useQuery({ queryKey: ["projects"], queryFn: fetchProjects });

  return (
    <section id="projects" className="relative py-16 sm:py-24 md:py-32">
      <div className="container-narrow">
        <SectionHead eyebrow="Selected Work" title="Projects we're proud of" subtitle="A glimpse at recent products we've designed, built and shipped." />

        <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-80 animate-pulse rounded-2xl border border-border bg-card/40" />)
            : (data ?? []).map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <Reveal delay={index * 70}>
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/70 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-elev">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {p.image_url ? (
            <img
              src={p.image_url}
              alt={p.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-brand opacity-60" />
          )}
          {p.category && (
            <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-foreground backdrop-blur">
              {p.category}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
          {p.description && <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>}

          {p.technologies && p.technologies.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.technologies.map((t) => (
                <span key={t} className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium text-accent-foreground">
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto flex items-center gap-2 pt-5">
            {p.live_url && (
              <a
                href={p.live_url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-3.5 py-1.5 text-xs font-semibold text-brand-foreground shadow-gold transition-transform hover:-translate-y-0.5"
              >
                Live <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {p.github_url && (
              <a
                href={p.github_url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent"
              >
                Code <Github className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
