import HeroSection from "@/components/landing/HeroSection";
import ValueProps from "@/components/landing/ValueProps";
import HowItWorks from "@/components/landing/HowItWorks";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import EmotionalSection from "@/components/landing/EmotionalSection";
import FinalCTA from "@/components/landing/FinalCTA";
// import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="bg-slate-900 text-white">
      <HeroSection />
      <ValueProps />
      <HowItWorks />
      <FeatureShowcase />
      <EmotionalSection />
      <FinalCTA />
      {/* <Footer /> */}
    </div>
  );
}
