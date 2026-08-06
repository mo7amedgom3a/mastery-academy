import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { StatsTicker } from "@/components/landing/StatsTicker";
import { AgenticAIShowcase } from "@/components/landing/AgenticAIShowcase";
import { CareerVisualizer } from "@/components/landing/CareerVisualizer";
import { Courses } from "@/components/landing/Courses";
import { Diplomas } from "@/components/landing/Diplomas";
import { Bundles } from "@/components/landing/Bundles";
import { Features } from "@/components/landing/Features";
import { Testimonials } from "@/components/landing/Testimonials";
import { JoinTrainerCTA } from "@/components/landing/JoinTrainerCTA";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, gsap } from "@/lib/gsap";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useGSAP(() => {
    if (typeof window === "undefined") return;

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2,
      effects: true,
    });

    // Space-time scrolling background animation
    gsap.to("#bg-glow-gold", {
      y: "35vh",
      x: "-15vw",
      scale: 1.25,
      opacity: 0.9,
      scrollTrigger: {
        trigger: "#smooth-content",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    gsap.to("#bg-glow-amber", {
      y: "-30vh",
      x: "20vw",
      scale: 0.85,
      scrollTrigger: {
        trigger: "#smooth-content",
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
      }
    });

    gsap.to("#bg-cosmic-ring-1", {
      rotation: 360,
      scale: 1.1,
      y: "10vh",
      scrollTrigger: {
        trigger: "#smooth-content",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      }
    });

    gsap.to("#bg-cosmic-ring-2", {
      rotation: -180,
      scale: 0.95,
      y: "-15vh",
      scrollTrigger: {
        trigger: "#smooth-content",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-bg-primary text-text-primary overflow-hidden">
      <Navbar />

      {/* Floating Background Space-Time Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {/* Large floating gold glow */}
        <div
          id="bg-glow-gold"
          className="absolute top-[15%] -right-24 w-[600px] h-[600px] rounded-full bg-gold-primary/8 blur-[140px] opacity-70"
        />
        {/* Large floating red/amber glow */}
        <div
          id="bg-glow-amber"
          className="absolute top-[65%] -left-24 w-[500px] h-[500px] rounded-full bg-red-alert/4 blur-[130px] opacity-60"
        />
        {/* Rotating cosmic ring 1 */}
        <div
          id="bg-cosmic-ring-1"
          className="absolute top-[25%] left-[20%] w-[750px] h-[750px] rounded-full border border-gold-primary/4 border-dashed"
        />
        {/* Rotating cosmic ring 2 */}
        <div
          id="bg-cosmic-ring-2"
          className="absolute top-[55%] right-[15%] w-[450px] h-[450px] rounded-full border border-gold-primary/2"
        />
      </div>

      <div id="smooth-wrapper" className="relative z-10">
        <div id="smooth-content">
          <Hero />
          <StatsTicker />
          <AgenticAIShowcase />
          <CareerVisualizer />
          <Courses />
          <Diplomas />
          <Bundles />
          <Features />
          <Testimonials />
          <JoinTrainerCTA />
          <FAQ />
          <Footer />
        </div>
      </div>
    </main>
  );
}

