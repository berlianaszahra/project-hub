import Footer from "@/shared/components/Footer";
import Navbar from "@/shared/components/Navbar";
import HeroSection from "../components/HeroSection";
import PlatformPreview from "../components/PlatformPreview";
import CollaborationSection from "../components/CollaboratioSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import TestimonialSection from "../components/TestimonialSection";
import FinalCTASection from "../components/FinalCTASection";

export default function LandingPageContainer() {
  return (
    <section className="w-full">
      <Navbar />
      <HeroSection />
      <PlatformPreview />
      <CollaborationSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialSection />
      <FinalCTASection />
      <Footer />
    </section>
    
  );
}
