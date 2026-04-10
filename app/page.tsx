import HeroSection from '@/components/ui/HeroSection';
import AboutUsSection from '@/components/ui/AboutUsSection';
import ServicesOverviewSection from '@/components/ui/ServicesOverviewSection';
import PortfolioSection from '@/components/ui/PortfolioSection';
import PartnersSection from '@/components/ui/PartnersSection';
import CTASection from '@/components/ui/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutUsSection />
      <ServicesOverviewSection />
      <PortfolioSection />
      <PartnersSection />
      <CTASection />
    </>
  );
}
