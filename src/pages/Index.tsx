
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ImpactSection from '@/components/ImpactSection';
import HowItWorks from '@/components/HowItWorks';
import Blog from '@/components/Blog';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ImpactSection />
      <HowItWorks />
      <Blog />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
