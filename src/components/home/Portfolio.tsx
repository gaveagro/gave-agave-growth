import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/hooks/useLanguage';
import tanchachin from '@/assets/homepage/tanchachin-parcela.jpg.asset.json';
import ebano from '@/assets/homepage/ebano-parcela.jpg.asset.json';
import moctezuma from '@/assets/homepage/moctezuma-silvopastoril.jpg.asset.json';

const Portfolio = () => {
  const language = useLanguage();

  const c =
    language === 'EN'
      ? {
          eyebrow: 'On the ground',
          title: 'Our operating parcels',
          body: 'Real land, real crews, real data. Every parcel is a live reference for what we propose to funders and ranch owners.',
          sites: [
            {
              img: tanchachin.url,
              name: 'Tanchachín',
              region: 'Huasteca Potosina, SLP',
              note: 'Espadín on rocky slope, no irrigation. Living terraces against erosion.',
            },
            {
              img: ebano.url,
              name: 'Ébano',
              region: 'San Luis Potosí',
              note: 'Field operations and planting crews. Baseline sampling in progress.',
            },
            {
              img: moctezuma.url,
              name: 'Moctezuma',
              region: 'San Luis Potosí',
              note: 'Silvopastoral pilot: sheep grazing planned between agave rows.',
            },
          ],
        }
      : {
          eyebrow: 'En campo',
          title: 'Nuestras parcelas en operación',
          body: 'Tierra real, cuadrillas reales, datos reales. Cada parcela es una referencia viva de lo que proponemos a financiadores y dueños de rancho.',
          sites: [
            {
              img: tanchachin.url,
              name: 'Tanchachín',
              region: 'Huasteca Potosina, SLP',
              note: 'Espadín en ladera pedregosa, sin riego. Terrazas vivas contra la erosión.',
            },
            {
              img: ebano.url,
              name: 'Ébano',
              region: 'San Luis Potosí',
              note: 'Operación de campo y cuadrillas de plantación. Muestreo de línea base en curso.',
            },
            {
              img: moctezuma.url,
              name: 'Moctezuma',
              region: 'San Luis Potosí',
              note: 'Piloto agrosilvopastoril: pastoreo planificado de borregos entre hileras de agave.',
            },
          ],
        };

  return (
    <section id="parcelas" className="section-pad bg-background">
      <div className="container mx-auto">
        <Reveal>
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 className="display-lg mt-4 max-w-2xl text-ink">{c.title}</h2>
          <p className="lead mt-5 max-w-xl">{c.body}</p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {c.sites.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.08}>
              <figure className="group">
                <div className="aspect-[4/5] overflow-hidden bg-paper-deep">
                  <img
                    src={s.img}
                    alt={`${s.name} — ${s.region}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="mt-4">
                  <p className="eyebrow">{s.region}</p>
                  <p className="mt-2 font-display text-2xl text-ink">{s.name}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{s.note}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
