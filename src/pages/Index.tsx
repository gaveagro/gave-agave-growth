import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import HomeHero from '@/components/home/HomeHero';
import FactsBar from '@/components/home/FactsBar';
import OriginSection from '@/components/home/OriginSection';
import SocialImpact from '@/components/home/SocialImpact';
import RawMaterial from '@/components/home/RawMaterial';
import TajacuSection from '@/components/home/TajacuSection';
import WorkWithUs from '@/components/home/WorkWithUs';
import FinalCTA from '@/components/home/FinalCTA';
import Blog from '@/components/Blog';

const Index = () => {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Gavé',
      legalName: 'Gavé Agrotecnología',
      url: 'https://gaveagro.com/',
      email: 'hola@gaveagro.com',
      description:
        'Gavé cultiva agave Espadín y Salmiana con 50 familias socias en cerca de 500 hectáreas regeneradas de San Luis Potosí, abastece piña a productores de bebidas, inulina y jarabe, y es el grupo detrás del mezcal Tajacú.',
      areaServed: ['MX', 'US'],
      brand: { '@type': 'Brand', name: 'Tajacú', url: 'https://www.tajacu.com' },
      address: { '@type': 'PostalAddress', addressRegion: 'San Luis Potosí', addressCountry: 'MX' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Gavé',
      url: 'https://gaveagro.com/',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Gavé — Agave regenerativo de San Luis Potosí y mezcal Tajacú"
        description="Agave Espadín y Salmiana cultivado con 50 familias socias en tierras regeneradas de San Luis Potosí. Piña para bebidas, inulina y jarabe, y el grupo detrás del mezcal Tajacú."
        canonical="https://gaveagro.com/"
        jsonLd={jsonLd}
      />
      <Header />
      <HomeHero />
      <FactsBar />
      <OriginSection />
      <SocialImpact />
      <RawMaterial />
      <TajacuSection />
      <WorkWithUs />
      <Blog />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
