
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ImpactSection from '@/components/ImpactSection';
import HowItWorks from '@/components/HowItWorks';
import MonitoringPlatform from '@/components/MonitoringPlatform';
import Blog from '@/components/Blog';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ImpactSection />
      <HowItWorks />
      <MonitoringPlatform />
      <Blog />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
