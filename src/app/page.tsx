import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { StatsBar } from "@/components/landing/stats-bar";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/layout/footer";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsBar />
      <FeaturesGrid />
      <HowItWorks />
      <CTASection />
      <Footer />
    </main>
  );
}
