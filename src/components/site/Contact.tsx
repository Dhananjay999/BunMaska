import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, ClipboardList, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Reveal } from "./Reveal";
import { submitContactInquiry } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(20, "Tell us a bit more about your project (min 20 characters)"),
});

type FormData = z.infer<typeof schema>;

export function Contact() {
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      await submitContactInquiry(data);
      setSubmitted(true);
      reset();
    } catch {
      setError("Could not send your message. Please try email or WhatsApp instead.");
    }
  };

  const handleOpenChange = (open: boolean) => {
    setFormOpen(open);
    if (!open) {
      setSubmitted(false);
      setError(null);
      reset();
    }
  };

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
              Let&apos;s build <span className="text-gradient">your next idea</span>
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
              <button
                type="button"
                onClick={() => setFormOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/70 px-5 sm:px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                <ClipboardList className="h-4 w-4" /> Fill out a form
              </button>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Prefer typing details in one go? Use the form — we&apos;ll get back to you by email.
            </p>

            <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              Working remotely · worldwide
            </div>
          </div>
        </Reveal>
      </div>

      <Dialog open={formOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          {submitted ? (
            <div className="flex flex-col items-center py-6 text-center">
              <CheckCircle2 className="h-12 w-12 text-brand" />
              <DialogHeader className="mt-4 space-y-2">
                <DialogTitle>Message received</DialogTitle>
                <DialogDescription>
                  Thanks for reaching out. We&apos;ll review your details and reply within one business day.
                </DialogDescription>
              </DialogHeader>
              <Button
                type="button"
                className="mt-6 rounded-full"
                onClick={() => handleOpenChange(false)}
              >
                Close
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Project inquiry</DialogTitle>
                <DialogDescription>
                  Share a few details and we&apos;ll follow up by email.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-2 space-y-4" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input id="contact-name" placeholder="Jane Doe" {...register("name")} aria-invalid={!!errors.name} />
                  {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="jane@company.com"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-company">Company (optional)</Label>
                  <Input id="contact-company" placeholder="Acme Inc." {...register("company")} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact number (optional)</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    {...register("phone")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message">Project details</Label>
                  <Textarea
                    id="contact-message"
                    rows={4}
                    placeholder="What are you building? Timeline, budget, goals..."
                    {...register("message")}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
                </div>

                {error && <p className="text-xs text-destructive">{error}</p>}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-gradient-brand text-brand-foreground shadow-gold hover:opacity-90"
                >
                  {isSubmitting ? "Sending..." : "Submit inquiry"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
