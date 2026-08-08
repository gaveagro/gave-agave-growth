import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ContactForm from '@/components/ContactForm';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/hooks/useLanguage';

const Contacto = () => {
  const language = useLanguage();
  const en = language === 'EN';

  const c = en
    ? {
        eyebrow: 'Contact',
        title: 'Tell us what you need',
        lead: 'Funds, NGOs, governments, companies, ranch owners and producers — one form for all of it. We read everything and answer with a concrete route, not a brochure.',
        channels: 'Direct channels',
        location: 'San Luis Potosí, México',
      }
    : {
        eyebrow: 'Contacto',
        title: 'Cuéntanos qué necesitas',
        lead: 'Fondos, ONGs, gobiernos, empresas, dueños de rancho y productores — un solo formulario para todo. Leemos todo y respondemos con una ruta concreta, no con un folleto.',
        channels: 'Canales directos',
        location: 'San Luis Potosí, México',
      };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={en ? 'Contact Gavé — arid land regeneration with agave' : 'Contacto Gavé — regeneración de tierras áridas con agave'}
        description={
          en
            ? 'Write to Gavé about impact investment, carbon credits for ranches, agave plants or offsetting. We answer with a concrete route.'
            : 'Escribe a Gavé sobre inversión de impacto, bonos de carbono para ranchos, planta de agave o compensación. Respondemos con una ruta concreta.'
        }
        canonical="https://gaveagro.com/contacto"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contacto Gavé',
          url: 'https://gaveagro.com/contacto',
          mainEntity: {
            '@type': 'Organization',
            name: 'Gavé Agrotecnología',
            email: 'hola@gaveagro.com',
            url: 'https://gaveagro.com/',
          },
        }}
      />
      <Header />

      <main className="section-pad pt-36">
        <div className="container mx-auto grid gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <Reveal>
            <p className="eyebrow">{c.eyebrow}</p>
            <h1 className="display-lg mt-4 text-ink">{c.title}</h1>
            <p className="lead mt-6">{c.lead}</p>
            <div className="mt-10 border-t border-border pt-6">
              <p className="eyebrow">{c.channels}</p>
              <a href="mailto:hola@gaveagro.com" className="mt-3 block text-ink hover:underline">
                hola@gaveagro.com
              </a>
              <p className="mt-2 text-sm text-muted-foreground">{c.location}</p>
            </div>
          </Reveal>

          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contacto;
