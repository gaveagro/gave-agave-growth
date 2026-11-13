import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/hooks/useLanguage';

const TajacuSection = () => {
  const en = useLanguage() === 'EN';

  const c = en
    ? {
        eyebrow: 'Gavé Spirits · Tajacú',
        title: 'Gavé is the group behind Tajacú.',
        body: 'Tajacú is our artisanal mezcal brand, with Denomination of Origin. It brings together mezcals from master mezcaleros and lots made with agave from our own parcels.',
        body2: 'We are looking for distributors, bars and restaurants in Mexico and the United States.',
        primary: 'Request a tasting',
        secondary: 'Visit tajacu.com',
        alt: 'Tajacú mezcal served at a table',
      }
    : {
        eyebrow: 'Gavé Spirits · Tajacú',
        title: 'Gavé es el grupo detrás de Tajacú.',
        body: 'Tajacú es nuestra marca de mezcal artesanal, con Denominación de Origen. Reúne mezcales de maestros mezcaleros y lotes hechos con agave de nuestras propias parcelas.',
        body2: 'Buscamos distribuidores, bares y restaurantes en México y Estados Unidos.',
        primary: 'Pide una cata',
        secondary: 'Visita tajacu.com',
        alt: 'Mezcal Tajacú servido en mesa',
      };

  return (
    <section id="tajacu" className="section-pad scroll-mt-20 bg-ink-deep text-paper">
      <div className="container mx-auto grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="aspect-[4/5] overflow-hidden">
            <img src="/images/home/mesa.jpg" alt={c.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="eyebrow text-paper/60">
            <span className="inline-block h-1.5 w-1.5 bg-accent" />
            {c.eyebrow}
          </p>
          <h2 className="display-lg mt-4 text-paper">{c.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-paper/75">{c.body}</p>
          <p className="mt-4 text-lg leading-relaxed text-paper/75">{c.body2}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-none bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contacto?perfil=tajacu">{c.primary}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-none border-paper/40 bg-transparent text-paper hover:bg-paper hover:text-ink"
            >
              <a href="https://www.tajacu.com" target="_blank" rel="noopener">
                {c.secondary}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default TajacuSection;
