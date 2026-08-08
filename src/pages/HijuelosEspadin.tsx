import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import HijuelosHero from '@/components/hijuelos/HijuelosHero';
import HijuelosBeneficios from '@/components/hijuelos/HijuelosBeneficios';
import HijuelosGaleria from '@/components/hijuelos/HijuelosGaleria';
import HijuelosPrecios from '@/components/hijuelos/HijuelosPrecios';
import HijuelosSimulador from '@/components/hijuelos/HijuelosSimulador';
import HijuelosServicios from '@/components/hijuelos/HijuelosServicios';
import HijuelosContacto from '@/components/hijuelos/HijuelosContacto';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const HijuelosEspadin = () => {
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Hijuelos de Agave Espadín',
    description: 'Hijuelos certificados de Agave Espadín desde la Huasteca Potosina, con asesoría técnica, logística y registro ante el CRM.',
    image: 'https://gaveagro.com/images/especies-de-agave-para-mezcal-gav%C3%A9.jpg',
    brand: { '@type': 'Brand', name: 'Gavé Agrotecnología' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'MXN',
      lowPrice: '25',
      highPrice: '45',
      availability: 'https://schema.org/InStock',
      url: 'https://gaveagro.com/hijuelos-espadin',
    },
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Hijuelos de Agave Espadín — Gavé Agrotecnología"
        description="Hijuelos de Agave Espadín certificados desde la Huasteca Potosina. Asesoría técnica, logística y registro ante el CRM incluidos. Cotiza hoy."
        canonical="https://gaveagro.com/hijuelos-espadin"
        ogImage="https://gaveagro.com/images/especies-de-agave-para-mezcal-gav%C3%A9.jpg"
        jsonLd={productJsonLd}
      />
      {/* Simplified header */}
      <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <img
                src="/lovable-uploads/4c7e4344-7b1e-4dac-8922-7356da9646e3.png"
                alt="Gavé"
                className="w-10 h-10 object-contain"
              />
              
            </Link>
            <a
              href="#contacto"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Cotizar
            </a>
          </div>
        </div>
      </header>

      <main className="pt-16">
        <HijuelosHero />
        <HijuelosBeneficios />
        <HijuelosGaleria />
        <HijuelosSimulador />
        <HijuelosPrecios />
        <HijuelosServicios />
        <HijuelosContacto />
      </main>

      <Footer />
    </div>
  );
};

export default HijuelosEspadin;
