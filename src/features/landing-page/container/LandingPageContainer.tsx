import Footer from "@/shared/components/Footer";
import Navbar from "@/shared/components/Navbar";
import HeroSection from "../components/HeroSection";
import PlatformPreview from "../components/PlatformPreview";

export default function LandingPageContainer() {
  return (
    <section className="w-full">
      <Navbar />
      <HeroSection />
      <PlatformPreview />

      <Footer />
    </section>
  );
}
