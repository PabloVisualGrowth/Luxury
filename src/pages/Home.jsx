import React from "react";
import HeroSection from "../components/HeroSection";
import ValueProposition from "../components/ValueProposition";
import PathwaysSection from "../components/PathwaysSection";
import ImpactSection from "../components/ImpactSection";
import CTASection from "../components/CTASection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ValueProposition />
      <PathwaysSection />
      <ImpactSection />
      <CTASection />
    </div>
  );
}
