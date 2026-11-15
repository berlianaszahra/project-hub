import Footer from "@/shared/components/Footer";
import Navbar from "@/shared/components/Navbar";
import CollaborationSection from "../components/CollaboratioSection";
import FeaturesSection from "../components/FeaturesSection";
import FinalCTASection from "../components/FinalCTASection";
import HeroParallax from "../components/HeroParallax";
import HeroSection from "../components/HeroSection";
import HowItWorksSection from "../components/HowItWorksSection";
import LandingExperience from "../components/LandingExperience";
import PlatformPreview from "../components/PlatformPreview";
import TestimonialSection from "../components/TestimonialSection";

export default function LandingPageContainer() {
  return (
    <LandingExperience>
      <section className="w-full">
        <Navbar />
        <HeroParallax>
          <HeroSection />
          <PlatformPreview />
        </HeroParallax>
        <CollaborationSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialSection />
        <FinalCTASection />
        <Footer />
      </section>
    </LandingExperience>
  );
}
