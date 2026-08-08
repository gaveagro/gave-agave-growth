import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import HomeHero from '@/components/home/HomeHero';
import MetricsBar from '@/components/home/MetricsBar';
import ModelSection from '@/components/home/ModelSection';
import EvidenceSection from '@/components/home/EvidenceSection';
import FourDoors from '@/components/home/FourDoors';
import Portfolio from '@/components/home/Portfolio';
import FaqSection from '@/components/home/FaqSection';
import FinalCTA from '@/components/home/FinalCTA';
import InnovationSection from '@/components/InnovationSection';
import Blog from '@/components/Blog';
import { groupsES } from '@/components/home/FaqSection';

const Index = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: groupsES.flatMap((g) =>
      g.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      }))
    ),
  };

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Gavé Agrotecnología',
      url: 'https://gaveagro.com/',
      email: 'hola@gaveagro.com',
      description:
        'Sistemas agroforestales y agrosilvopastoriles con agave para regenerar tierras áridas: captura de carbono, ganadería regenerativa, cosecha de agua y monitoreo.',
      areaServed: 'MX',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Gavé',
      url: 'https://gaveagro.com/',
    },
    faqSchema,
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Gavé — Regeneración de tierras áridas con agave"
        description="Sistemas agroforestales y agrosilvopastoriles con agave: captura de carbono, ganadería regenerativa, cosecha de agua y monitoreo para bonos e inversión de impacto."
        canonical="https://gaveagro.com/"
        jsonLd={jsonLd}
      />
      <Header />
      <HomeHero />
      <MetricsBar />
      <ModelSection />
      <EvidenceSection />
      <FourDoors />
      <Portfolio />
      <InnovationSection />
      <Blog />
      <FaqSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
