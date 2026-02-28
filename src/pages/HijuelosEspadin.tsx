import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import HijuelosHero from '@/components/hijuelos/HijuelosHero';
import HijuelosBeneficios from '@/components/hijuelos/HijuelosBeneficios';
import HijuelosPrecios from '@/components/hijuelos/HijuelosPrecios';
import HijuelosSimulador from '@/components/hijuelos/HijuelosSimulador';
import HijuelosServicios from '@/components/hijuelos/HijuelosServicios';
import HijuelosContacto from '@/components/hijuelos/HijuelosContacto';
import Footer from '@/components/Footer';

const HijuelosEspadin = () => {
  useEffect(() => {
    const ogTags: Record<string, string> = {
      'og:title': 'Hijuelos de Agave Espadín — Gavé Agrotecnología',
      'og:description': 'Hijuelos de Agave Espadín certificados desde la Huasteca Potosina. Asesoría técnica, logística y registro ante el CRM incluidos. Cotiza hoy.',
      'og:image': 'https://gave-agave-growth.lovable.app/images/especies-de-agave-para-mezcal-gavé.jpg',
      'og:url': 'https://gave-agave-growth.lovable.app/hijuelos-espadin',
      'og:type': 'website',
    };

    const existingTags: HTMLMetaElement[] = [];

    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
        existingTags.push(meta);
      }
      meta.setAttribute('content', content);
    });

    const prevTitle = document.title;
    document.title = 'Hijuelos de Agave Espadín — Gavé Agrotecnología';

    return () => {
      document.title = prevTitle;
      existingTags.forEach(tag => tag.remove());
    };
  }, []);

  return (
    <div className="min-h-screen">
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
