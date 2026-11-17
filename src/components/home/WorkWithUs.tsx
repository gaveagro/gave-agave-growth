import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/hooks/useLanguage';

const WorkWithUs = () => {
  const en = useLanguage() === 'EN';

  const c = en
    ? {
        eyebrow: 'Work with us',
        title: 'Who are you?',
        rows: [
          { who: 'Beverage producers', what: 'Espadín and Salmiana piña by harvest year.', cta: 'Quote', to: '/contacto?perfil=bebidas' },
          { who: 'Inulin and syrup buyers', what: 'Forward purchase of lots from future harvests.', cta: 'Secure a lot', to: '/contacto?perfil=inulina' },
          { who: 'Distributors, bars and restaurants', what: 'Tajacú mezcal for your bar or your market.', cta: 'Request a tasting', to: '/contacto?perfil=tajacu' },
          { who: 'Ranches, companies and programmes', what: 'Regenerative advisory, agave plants, reforestation programmes and tenders.', cta: 'See services', to: '/servicios' },
          { who: 'Strategic partners', what: 'Join the next stage of Gavé.', cta: 'Book a call', to: '/contacto?perfil=socio' },
        ],
      }
    : {
        eyebrow: 'Trabaja con nosotros',
        title: '¿Quién eres?',
        rows: [
          { who: 'Productores de bebidas', what: 'Piña de Espadín y Salmiana por año de cosecha.', cta: 'Cotiza', to: '/contacto?perfil=bebidas' },
          { who: 'Compradores de inulina y jarabe', what: 'Compra anticipada de lotes de cosechas futuras.', cta: 'Asegura un lote', to: '/contacto?perfil=inulina' },
          { who: 'Distribuidores, bares y restaurantes', what: 'Mezcal Tajacú para tu barra o tu mercado.', cta: 'Pide una cata', to: '/contacto?perfil=tajacu' },
          { who: 'Ranchos, empresas y programas', what: 'Asesoría regenerativa, planta de agave, programas de reforestación y licitaciones.', cta: 'Ver servicios', to: '/servicios' },
          { who: 'Socios estratégicos', what: 'Súmate a la siguiente etapa de Gavé.', cta: 'Agenda una llamada', to: '/contacto?perfil=socio' },
        ],
      };

  return (
    <section id="trabaja" className="section-pad scroll-mt-20">
      <div className="container mx-auto">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">
            <span className="inline-block h-1.5 w-1.5 bg-accent" />
            {c.eyebrow}
          </p>
          <h2 className="display-lg mt-4 text-ink">{c.title}</h2>
        </Reveal>
        <ul className="mt-12 divide-y divide-border border-y border-border">
          {c.rows.map((r) => (
            <li key={r.who}>
              <Link
                to={r.to}
                className="group grid gap-2 py-7 transition-colors hover:bg-paper-deep md:grid-cols-12 md:items-center md:gap-6 md:px-4"
              >
                <span className="font-display text-xl font-bold text-ink md:col-span-5 md:text-2xl">{r.who}</span>
                <span className="text-muted-foreground md:col-span-5">{r.what}</span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary md:col-span-2 md:justify-end">
                  {r.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WorkWithUs;
