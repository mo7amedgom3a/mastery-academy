import { Navigate, Route, Routes } from "react-router-dom";

import { Bundles } from "@/components/landing/Bundles";
import { Courses } from "@/components/landing/Courses";
import { Diplomas } from "@/components/landing/Diplomas";
import { FAQ } from "@/components/landing/FAQ";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { JoinTrainerCTA } from "@/components/landing/JoinTrainerCTA";
import { Navbar } from "@/components/landing/Navbar";
import { StatsTicker } from "@/components/landing/StatsTicker";
import { Testimonials } from "@/components/landing/Testimonials";

function HomePage() {
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
