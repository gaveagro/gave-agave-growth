import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/hooks/useLanguage';

const RawMaterial = () => {
  const en = useLanguage() === 'EN';

  const c = en
    ? {
        eyebrow: 'Raw material',
        title: 'Agave piña with an origin you can trace.',
        lead: 'We sell our Espadín and Salmiana harvest by available year, harvested at the parcel. Every lot comes with its parcel, its region and the story of how it was grown.',
        buyers: [
          {
            title: 'Beverage producers',
            body: 'Mezcal, agave spirits and other drinks that need agave with an origin they can tell.',
            cta: 'Quote a harvest',
            to: '/contacto?perfil=bebidas',
          },
          {
            title: 'Inulin and agave syrup',
            body: 'Agave piña is raw material for inulin and syrup. We are open to forward-purchase agreements that secure lots from future harvests.',
            cta: 'Secure a lot',
            to: '/contacto?perfil=inulina',
          },
        ],
        speciesLabel: 'We also grow',
        species: ['Espadín', 'Salmiana', 'Sisal', 'Atrovirens', 'Cupreata', 'Potatorum'],
        others: 'and others',
        alt: 'Harvested agave piñas',
      }
    : {
        eyebrow: 'Materia prima',
        title: 'Piña de agave con origen trazable.',
        lead: 'Vendemos la cosecha de Espadín y Salmiana por año disponible, jimada en parcela. Cada lote viene con su parcela, su región y la historia de cómo se cultivó.',
        buyers: [
          {
            title: 'Productores de bebidas',
            body: 'Mezcal, destilados de agave y otras bebidas que necesitan agave con un origen que puedan contar.',
            cta: 'Cotiza cosecha',
            to: '/contacto?perfil=bebidas',
          },
          {
            title: 'Inulina y jarabe de agave',
            body: 'La piña de agave es materia prima para inulina y jarabe. Estamos abiertos a acuerdos de compra anticipada que aseguren lotes de cosechas futuras.',
            cta: 'Asegura un lote',
            to: '/contacto?perfil=inulina',
          },
        ],
        speciesLabel: 'Cultivamos',
        species: ['Espadín', 'Salmiana', 'Sisal', 'Atrovirens', 'Cupreata', 'Potatorum'],
        others: 'y otras',
        alt: 'Piñas de agave jimadas',
      };

  return (
    <section id="materia-prima" className="section-pad scroll-mt-20 border-t border-border bg-paper-deep">
      <div className="container mx-auto grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="aspect-[4/5] overflow-hidden bg-paper lg:sticky lg:top-28">
            <img src="/images/home/pinas-jimadas.jpg" alt={c.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">
              <span className="inline-block h-1.5 w-1.5 bg-accent" />
              {c.eyebrow}
            </p>
            <h2 className="display-lg mt-4 text-ink">{c.title}</h2>
            <p className="lead mt-6">{c.lead}</p>
          </Reveal>

          <div className="mt-10 divide-y divide-border border-y border-border">
            {c.buyers.map((b) => (
              <Reveal key={b.title}>
                <article className="py-8">
                  <h3 className="font-display text-2xl font-bold text-ink">{b.title}</h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{b.body}</p>
                  <Link
                    to={b.to}
                    className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-ink"
                  >
                    {b.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="mr-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {c.speciesLabel}
            </span>
            {c.species.map((s) => (
              <span key={s} className="border border-ink/20 px-3 py-1 text-sm text-ink">
                {s}
              </span>
            ))}
            <span className="text-sm text-muted-foreground">{c.others}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RawMaterial;
