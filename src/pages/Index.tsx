import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import HowItWorks from '@/components/home/HowItWorks';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0A0A0B' }}>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
};

export default Index;
