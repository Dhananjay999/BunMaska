import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchFaq, type FaqItem } from "@/lib/portfolio";
import { Reveal } from "./Reveal";
import { SectionHead } from "./Services";

export function FAQ() {
  const { data: items = [], isLoading } = useQuery({ queryKey: ["faq"], queryFn: fetchFaq });

  return (
    <section id="faq" className="relative py-16 sm:py-24 md:py-32">
      <div className="container-narrow">
        <SectionHead
          eyebrow="Q&A"
          title="Common questions"
          subtitle="Everything you need to know before starting a project with us."
        />

        <Reveal delay={100}>
          {isLoading ? (
            <div className="mx-auto mt-10 sm:mt-14 max-w-3xl space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-14 animate-pulse rounded-xl border border-border bg-card/40" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-muted-foreground">
              No questions yet — check back soon or reach out directly.
            </p>
          ) : (
            <Accordion type="single" collapsible className="mx-auto mt-10 sm:mt-14 max-w-3xl">
              {items.map((item) => (
                <FaqAccordionItem key={item.id} item={item} />
              ))}
            </Accordion>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function FaqAccordionItem({ item }: { item: FaqItem }) {
  return (
    <AccordionItem value={item.id}>
      <AccordionTrigger className="text-left text-base font-medium hover:text-brand">
        {item.question}
      </AccordionTrigger>
      <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
        {item.answer}
      </AccordionContent>
    </AccordionItem>
  );
}
