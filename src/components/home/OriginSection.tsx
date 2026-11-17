import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/hooks/useLanguage';

const OriginSection = () => {
  const en = useLanguage() === 'EN';

  const c = en
    ? {
        eyebrow: 'How our agave was grown',
        title: 'The value is in how it was grown.',
        lead: 'Every piña we sell comes from land we leave better than we found it, farmed together with the families who live on it.',
        regions: [
          {
            img: '/images/home/huasteca-cana.jpg',
            place: 'Huasteca Potosina · Espadín',
            title: 'From exhausted cane fields to agave.',
            body: 'These parcels grew sugarcane for decades without rotation, and the soil lost its structure. We plant Espadín alongside companion crops to bring the land back to life and make it productive again.',
          },
          {
            img: '/images/home/altiplano.jpg',
            place: 'Altiplano potosino · Salmiana',
            title: 'Agave against the desert.',
            body: 'On the high plateau agave grows at lower density inside an agro-silvo-pastoral system: it reforests, holds the soil against erosion, feeds livestock and, once mature, goes to mezcal.',
          },
        ],
        points: [
          { title: 'Rainfed', body: 'No irrigation. Agave thrives where water is scarce.' },
          { title: 'Partners, not labour', body: 'Families take part across the whole cycle, not just harvest day.' },
          { title: 'An origin you can visit', body: 'Buyers and partners are welcome on the parcels.' },
        ],
      }
    : {
        eyebrow: 'Cómo se cultivó nuestro agave',
        title: 'El valor está en cómo se cultivó.',
        lead: 'Cada piña que vendemos viene de tierra que dejamos mejor de lo que la encontramos, cultivada junto con las familias que viven en ella.',
        regions: [
          {
            img: '/images/home/huasteca-cana.jpg',
            place: 'Huasteca Potosina · Espadín',
            title: 'De cañaverales agotados a campos de agave.',
            body: 'Estas parcelas fueron cañeras por décadas, sin rotación, y el suelo perdió estructura. Sembramos Espadín junto con cultivos acompañantes para devolverle vida a la tierra y hacerla producir otra vez.',
          },
          {
            img: '/images/home/altiplano.jpg',
            place: 'Altiplano potosino · Salmiana',
            title: 'Agave contra el desierto.',
            body: 'En el altiplano el agave crece a menor densidad dentro de un manejo agrosilvopastoril: reforesta, sujeta el suelo contra la erosión, sirve de forraje para el ganado y, al madurar, se aprovecha para mezcal.',
          },
        ],
        points: [
          { title: 'De temporal', body: 'Sin riego. El agave prospera donde el agua escasea.' },
          { title: 'Socias, no mano de obra', body: 'Las familias participan en todo el ciclo, no solo el día de la cosecha.' },
          { title: 'Un origen que se puede visitar', body: 'Compradores y aliados son bienvenidos en las parcelas.' },
        ],
      };

  return (
    <section id="agave" className="section-pad scroll-mt-20">
      <div className="container mx-auto">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">
            <span className="inline-block h-1.5 w-1.5 bg-accent" />
            {c.eyebrow}
          </p>
          <h2 className="display-lg mt-4 text-ink">{c.title}</h2>
          <p className="lead mt-6">{c.lead}</p>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {c.regions.map((r, i) => (
            <Reveal key={r.place} delay={i * 0.08}>
              <article>
                <div className="aspect-[4/3] overflow-hidden bg-paper-deep">
                  <img src={r.img} alt={r.place} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </div>
                <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-clay">{r.place}</p>
                <h3 className="mt-3 font-display text-2xl font-bold text-ink md:text-3xl">{r.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{r.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-8 border-t border-border pt-10 md:grid-cols-3">
          {c.points.map((p) => (
            <div key={p.title}>
              <p className="font-display text-lg font-bold text-ink">{p.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OriginSection;
