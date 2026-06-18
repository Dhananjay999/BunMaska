import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { TechStack } from "@/components/site/TechStack";
import { Services } from "@/components/site/Services";
import { Team } from "@/components/site/Team";
import { Projects } from "@/components/site/Projects";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BunMaska — Web, iOS & Android software studio" },
      {
        name: "description",
        content:
          "BunMaska is a software studio building modern web and mobile products across Angular, backend, iOS and Android.",
      },
      { property: "og:title", content: "BunMaska — Web, iOS & Android software studio" },
      {
        property: "og:description",
        content:
          "A focused crew of engineers across web and mobile. We design, ship and scale digital products.",
      },
      { property: "og:url", content: "https://nexus-creations-show.lovable.app/" },
      { name: "twitter:title", content: "BunMaska — Web, iOS & Android software studio" },
      {
        name: "twitter:description",
        content:
          "A focused crew of engineers across web and mobile. We design, ship and scale digital products.",
      },
    ],
    links: [{ rel: "canonical", href: "https://nexus-creations-show.lovable.app/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <Services />
        <Team />
        <Projects />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
