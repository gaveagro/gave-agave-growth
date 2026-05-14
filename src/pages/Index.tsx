
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
import SEO from '@/components/SEO';
import faqData from '../../public/content/faq.json';

const Index = () => {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (faqData as any).es.faqs.map((f: any) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Gavé Agro — Inversión Regenerativa en Agave"
        description="Invierte en cultivo regenerativo de agave en México. Retornos proyectados 9–19% TIR, monitoreo satelital y restauración de ecosistemas."
        canonical="https://gaveagro.com/"
        jsonLd={faqJsonLd}
      />
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
