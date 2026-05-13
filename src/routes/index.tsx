import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { StatsTicker } from "@/components/landing/StatsTicker";
import { Courses } from "@/components/landing/Courses";
import { Diplomas } from "@/components/landing/Diplomas";
import { Bundles } from "@/components/landing/Bundles";
import { Features } from "@/components/landing/Features";
import { Testimonials } from "@/components/landing/Testimonials";
import { JoinTrainerCTA } from "@/components/landing/JoinTrainerCTA";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <Navbar />
      <Hero />
      <StatsTicker />
      <Courses />
      <Diplomas />
      <Bundles />
      <Features />
      <Testimonials />
      <JoinTrainerCTA />
      <FAQ />
      <Footer />
    </main>
  );
}
