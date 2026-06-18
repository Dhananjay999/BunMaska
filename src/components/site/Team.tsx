import { useQuery } from "@tanstack/react-query";
import { Github, Linkedin, Twitter } from "lucide-react";
import { fetchTeam, type TeamMember } from "@/lib/portfolio";
import { Reveal } from "./Reveal";
import { SectionHead } from "./Services";

export function Team() {
  const { data, isLoading } = useQuery({ queryKey: ["team"], queryFn: fetchTeam });
  const members = data ?? [];

  return (
    <section id="team" className="relative py-16 sm:py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="container-narrow">
        <SectionHead eyebrow="The Team" title="Meet the makers" subtitle="A tight-knit crew of specialists who've shipped together for years." />

        <div className="mt-10 sm:mt-14 grid auto-rows-fr gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-80 animate-pulse rounded-2xl border border-border bg-card/40" />
              ))
            : members.map((m, i) => <MemberCard key={m.id} m={m} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function MemberCard({ m, index }: { m: TeamMember; index: number }) {
  return (
    <Reveal delay={index * 80}>
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/70 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-elev">
        <div className="mx-auto h-24 w-24 overflow-hidden rounded-full ring-2 ring-border transition-all group-hover:ring-brand/60">
          {m.avatar_url ? (
            <img src={m.avatar_url} alt={m.name} className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-brand text-2xl font-bold text-brand-foreground">
              {m.name.charAt(0)}
            </div>
          )}
        </div>
        <h3 className="mt-4 font-semibold tracking-tight">{m.name}</h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-brand">{m.role}</p>
        {m.bio && <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>}

        {m.skills && m.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {m.skills.slice(0, 4).map((s) => (
              <span key={s} className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium text-accent-foreground">
                {s}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex justify-center gap-2 pt-5">
          {m.linkedin_url && <SocialLink href={m.linkedin_url} label="LinkedIn"><Linkedin className="h-3.5 w-3.5" /></SocialLink>}
          {m.github_url && <SocialLink href={m.github_url} label="GitHub"><Github className="h-3.5 w-3.5" /></SocialLink>}
          {m.twitter_url && <SocialLink href={m.twitter_url} label="Twitter"><Twitter className="h-3.5 w-3.5" /></SocialLink>}
        </div>
      </div>
    </Reveal>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/50 text-muted-foreground transition-colors hover:border-brand hover:text-brand"
    >
      {children}
    </a>
  );
}
