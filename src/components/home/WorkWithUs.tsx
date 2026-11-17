import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/hooks/useLanguage';

type Door = { who: string; what: string; cta: string; to: string };

const WorkWithUs = () => {
  const en = useLanguage() === 'EN';

  const c = en
    ? {
        eyebrow: 'Work with us',
        title: 'Who are you?',
        main: [
          { who: 'Mezcal and beverage producers', what: 'Espadín and Salmiana piña by harvest year, with an origin you can trace.', cta: 'Quote our harvest', to: '/contacto?perfil=bebidas' },
          { who: 'Distributors, bars and restaurants', what: 'Tajacú mezcal for your bar or your market.', cta: 'Request a tasting', to: '/contacto?perfil=tajacu' },
        ] as Door[],
        more: [
          { who: 'Inulin and syrup', what: 'Supply contracts with agreed price and schedule.', cta: 'Reserve volume', to: '/contacto?perfil=inulina' },
          { who: 'Ranches, companies and programmes', what: 'Regenerative advisory, agave plants, reforestation programmes.', cta: 'See services', to: '/servicios' },
          { who: 'Distribution and growth partners', what: 'We are looking for allies to take our harvest and Tajacú to more markets.', cta: 'Book a call', to: '/contacto?perfil=socio' },
        ] as Door[],
      }
    : {
        eyebrow: 'Trabaja con nosotros',
        title: '¿Quién eres?',
        main: [
          { who: 'Productores de mezcal y bebidas', what: 'Piña de Espadín y Salmiana por año de cosecha, con origen trazable.', cta: 'Cotiza nuestra cosecha', to: '/contacto?perfil=bebidas' },
          { who: 'Distribuidores, bares y restaurantes', what: 'Mezcal Tajacú para tu barra o tu mercado.', cta: 'Pide una cata', to: '/contacto?perfil=tajacu' },
        ] as Door[],
        more: [
          { who: 'Inulina y jarabe', what: 'Contratos de suministro con precio y calendario acordados.', cta: 'Reserva volumen', to: '/contacto?perfil=inulina' },
          { who: 'Ranchos, empresas y programas', what: 'Asesoría regenerativa, planta de agave y programas de reforestación.', cta: 'Ver servicios', to: '/servicios' },
          { who: 'Socios de distribución y crecimiento', what: 'Buscamos aliados para llevar nuestra cosecha y Tajacú a más mercados.', cta: 'Agenda una llamada', to: '/contacto?perfil=socio' },
        ] as Door[],
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

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {c.main.map((d) => (
            <Link
              key={d.who}
              to={d.to}
              className="group flex flex-col justify-between bg-ink-deep p-8 text-paper transition-colors hover:bg-ink md:min-h-[260px] md:p-10"
            >
              <div>
                <h3 className="font-display text-2xl font-bold md:text-3xl">{d.who}</h3>
                <p className="mt-4 max-w-md text-paper/70">{d.what}</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                {d.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {c.more.map((d) => (
            <li key={d.who}>
              <Link
                to={d.to}
                className="group flex h-full flex-col justify-between border border-border p-6 transition-colors hover:bg-paper-deep"
              >
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">{d.who}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d.what}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {d.cta}
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
