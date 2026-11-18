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
        body: 'Tajacú is our artisanal mezcal brand, with Denomination of Origin, made with master mezcaleros. What sets it apart is where its agave comes from: the Tajacú lots made with agave from our parcels come from land we regenerate and from partner families who share in the value of every harvest.',
        points: [
          { title: 'Regenerated land', body: 'Agave planted on exhausted cane fields and desert, without irrigation.' },
          { title: 'Partner families', body: '50 families take part across the whole cycle, not just harvest day.' },
          { title: 'Traceable', body: 'From the parcel to the bottle, with an origin you can visit.' },
        ],
        body2: 'We are looking for distributors, bars and restaurants that want a mezcal with a story they can tell.',
        primary: 'Request a tasting',
        secondary: 'Visit tajacu.com',
        alt: 'Tajacú mezcal and a cocktail at a bar',
      }
    : {
        eyebrow: 'Gavé Spirits · Tajacú',
        title: 'Gavé es el grupo detrás de Tajacú.',
        body: 'Tajacú es nuestra marca de mezcal artesanal, con Denominación de Origen, hecha con maestros mezcaleros. Lo que la distingue es de dónde viene su agave: los lotes Tajacú hechos con agave de nuestras parcelas vienen de tierra que regeneramos y de familias socias que participan del valor de cada cosecha.',
        points: [
          { title: 'Tierra regenerada', body: 'Agave sembrado en cañaverales agotados y en el desierto, sin riego.' },
          { title: 'Familias socias', body: '50 familias participan en todo el ciclo, no solo el día de la cosecha.' },
          { title: 'Trazable', body: 'De la parcela a la botella, con un origen que se puede visitar.' },
        ],
        body2: 'Buscamos distribuidores, bares y restaurantes que quieran un mezcal con una historia que puedan contar.',
        primary: 'Pide una cata',
        secondary: 'Visita tajacu.com',
        alt: 'Mezcal Tajacú y un coctel en barra',
      };

  return (
    <section id="tajacu" className="section-pad scroll-mt-20 bg-ink-deep text-paper">
      <div className="container mx-auto grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="aspect-[4/3] overflow-hidden">
            <img src="/images/home/tajacu-barra.jpg" alt={c.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="eyebrow text-paper/60">
            <span className="inline-block h-1.5 w-1.5 bg-accent" />
            {c.eyebrow}
          </p>
          <h2 className="display-lg mt-4 text-paper">{c.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-paper/75">{c.body}</p>
          <ul className="mt-8 grid gap-5 border-t border-paper/15 pt-6 sm:grid-cols-3">
            {c.points.map((p) => (
              <li key={p.title}>
                <p className="font-display text-base font-bold text-accent">{p.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-paper/70">{p.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-lg leading-relaxed text-paper/75">{c.body2}</p>
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
