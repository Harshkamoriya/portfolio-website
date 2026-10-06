import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/pf/Nav";
import { Hero } from "@/components/pf/Hero";
import { IdentityReveal } from "@/components/pf/IdentityReveal";
import { Signal, Engineer } from "@/components/pf/Signal";
import { Mintzy } from "@/components/pf/Mintzy";
import { Architecture } from "@/components/pf/Architecture";
import { Projects } from "@/components/pf/Projects";
import { Philosophy, Constellation, DSA, Leadership, Contact } from "@/components/pf/Closing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harsh Kamoriya — Systems that don't break under load" },
      { name: "description", content: "Software engineer building backend systems, distributed infrastructure and AI-powered products. 18× faster pipelines, 1947 LeetCode." },
      { property: "og:title", content: "Harsh Kamoriya — Systems that don't break under load" },
      { property: "og:description", content: "Backend, distributed systems and AI engineering — told as case studies, not bullet points." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="overflow-x-clip">
      <Nav />
      <Hero />
      <IdentityReveal />
      <Signal />
      <Engineer />
      <Mintzy />
      <Architecture />
      <Projects />
      <Philosophy />
      <Constellation />
      <DSA />
      <Leadership />
      <Contact />
    </main>
  );
}
