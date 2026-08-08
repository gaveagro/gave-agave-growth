import { Link } from 'react-router-dom';
import { ArrowUpRight, Landmark, Mountain, Sprout, HeartHandshake } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/hooks/useLanguage';

const FourDoors = () => {
  const language = useLanguage();

  const c =
    language === 'EN'
      ? {
          eyebrow: 'Four ways to work with Gavé',
          title: 'Pick the door that fits you',
          doors: [
            {
              icon: Landmark,
              to: '/inversion-de-impacto',
              tag: 'Funds · NGOs · Governments',
              title: 'Impact investment',
              body: 'Fund agave-based agroforestry and silvopastoral projects with verified environmental outcomes and a financial return.',
            },
            {
              icon: Mountain,
              to: '/bonos-de-carbono',
              tag: 'Ranch owners · arid zones',
              title: 'Carbon credit certification',
              body: 'We take arid-land ranches through MRV, methodology and certification so they can issue carbon and regenerative-livestock credits.',
            },
            {
              icon: Sprout,
              to: '/vivero',
              tag: 'Producers · Reforestation',
              title: 'Nursery: Espadín & Salmiana',
              body: 'Field-ready agave plants at volume. Salmiana is the species of choice for arid-land reforestation; Espadín for mezcal supply.',
            },
            {
              icon: HeartHandshake,
              to: '/compensa',
              tag: 'Companies · Individuals',
              title: 'Offset & sponsorship',
              body: 'Sponsor restored hectares to offset your footprint, with photo, satellite and impact reporting on the land you funded.',
            },
          ],
          cta: 'Explore',
        }
      : {
          eyebrow: 'Cuatro formas de trabajar con Gavé',
          title: 'Elige la puerta que te corresponde',
          doors: [
            {
              icon: Landmark,
              to: '/inversion-de-impacto',
              tag: 'Fondos · ONGs · Gobiernos',
              title: 'Inversión de impacto',
              body: 'Financia proyectos agroforestales y agrosilvopastoriles con agave, con resultados ambientales verificables y retorno financiero.',
            },
            {
              icon: Mountain,
              to: '/bonos-de-carbono',
              tag: 'Ranchos en zonas áridas',
              title: 'Certificación de bonos de carbono',
              body: 'Llevamos ranchos en zonas áridas por el MRV, la metodología y la certificación para emitir bonos de carbono y de ganadería regenerativa.',
            },
            {
              icon: Sprout,
              to: '/vivero',
              tag: 'Productores · Reforestación',
              title: 'Vivero: Espadín y Salmiana',
              body: 'Planta lista para campo, en volumen. Salmiana es la especie ideal para reforestar zonas áridas; Espadín para abasto mezcalero.',
            },
            {
              icon: HeartHandshake,
              to: '/compensa',
              tag: 'Empresas · Personas',
              title: 'Compensa y patrocina',
              body: 'Apadrina hectáreas restauradas para compensar tu huella, con reporte fotográfico, satelital y de impacto de la tierra que financiaste.',
            },
          ],
          cta: 'Explorar',
        };

  return (
    <section id="puertas" className="section-pad border-t border-border bg-paper-deep">
      <div className="container mx-auto">
        <Reveal>
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 className="display-lg mt-4 max-w-2xl text-ink">{c.title}</h2>
        </Reveal>

        <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2">
          {c.doors.map((d, i) => (
            <Reveal key={d.to} delay={i * 0.06}>
              <Link
                to={d.to}
                className="group flex h-full flex-col justify-between bg-background p-8 transition-colors hover:bg-ink md:p-10"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <d.icon className="h-7 w-7 text-ink transition-colors group-hover:text-accent" strokeWidth={1.4} />
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                  <p className="eyebrow mt-8 group-hover:text-paper/60">{d.tag}</p>
                  <h3 className="mt-3 font-display text-2xl font-medium text-ink transition-colors group-hover:text-paper md:text-3xl">
                    {d.title}
                  </h3>
                  <p className="mt-4 max-w-md text-muted-foreground transition-colors group-hover:text-paper/70">
                    {d.body}
                  </p>
                </div>
                <span className="mt-8 text-sm font-medium text-ink transition-colors group-hover:text-accent">
                  {c.cta} →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FourDoors;
