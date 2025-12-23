
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustedPartners from '@/components/TrustedPartners';
import HowSustainableAgave from '@/components/HowSustainableAgave';
import ImpactSection from '@/components/ImpactSection';
import AgaveMarket from '@/components/AgaveMarket';
import OurFarms from '@/components/OurFarms';
import MonitoringPlatform from '@/components/MonitoringPlatform';
import InvestmentSimulator from '@/components/InvestmentSimulator';
import InnovationSection from '@/components/InnovationSection';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <TrustedPartners />
      <HowSustainableAgave />
      <InvestmentSimulator />
      <ImpactSection />
      <AgaveMarket />
      <OurFarms />
      <MonitoringPlatform />
      <InnovationSection />
      <Testimonials />
      <Blog />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
