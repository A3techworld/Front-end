import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import HowItWorks from '@/components/home/HowItWorks';
import FeaturesSection from '@/components/home/FeaturesSection';
import PricingSection from '@/components/home/PricingSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';
import { Marquee } from '@/components/ui/marquee';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <HowItWorks />
      <FeaturesSection />
      <Marquee text="A3 Future Forge • " />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default Home;
