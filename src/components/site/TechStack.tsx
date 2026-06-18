import { Reveal } from "./Reveal";

const TECH = [
  "Angular",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Swift",
  "Kotlin",
  "PostgreSQL",
  "Supabase",
  "AWS",
  "Docker",
  "Figma",
];

export function TechStack() {
  return (
    <section className="relative overflow-hidden border-y border-border/60 py-12 sm:py-16">
      <div className="container-narrow">
        <Reveal>
          <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Technologies we work with
          </p>
        </Reveal>
      </div>

      <div className="relative mt-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />

        <div className="flex animate-marquee gap-4 whitespace-nowrap">
          {[...TECH, ...TECH].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="inline-flex shrink-0 items-center rounded-full border border-border bg-card/60 px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
