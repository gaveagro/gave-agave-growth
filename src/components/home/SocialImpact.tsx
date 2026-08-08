import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/hooks/useLanguage';
import cuadrilla from '@/assets/hijuelos/plantacion-trabajadores.jpg';

const SocialImpact = () => {
  const language = useLanguage();
  const en = language === 'EN';

  const c = en
    ? {
        eyebrow: 'Social impact',
        title: 'Regeneration is also a payroll',
        body: 'Arid land does not empty out because of drought alone — it empties out because there is no work. Every hectare we plant is paid days of work in the communities around the parcel, most of them Tének families from the Huasteca Potosina.',
        points: [
          {
            k: 'Rural employment',
            v: 'Planting, terracing, maintenance and harvest are done by local crews, hired in the same municipalities where the parcels are.',
          },
          {
            k: 'Tének communities',
            v: 'We work with Tének families of the Huasteca Potosina, combining their knowledge of the land with agronomic and monitoring support.',
          },
          {
            k: 'Work that stays',
            v: 'An agave cycle lasts years, so the work is not one planting season: it is maintenance, grazing and harvest sustained over time.',
          },
          {
            k: 'Value kept nearby',
            v: 'Where volume allows it, the piña is processed in the region instead of leaving as raw tonnage.',
          },
        ],
        alt: 'Local crew planting agave in the Huasteca Potosina',
      }
    : {
        eyebrow: 'Impacto social',
        title: 'Regenerar también es una nómina',
        body: 'La tierra árida no se vacía solo por la sequía — se vacía porque no hay trabajo. Cada hectárea que plantamos son jornales pagados en las comunidades alrededor de la parcela, en su mayoría familias Tének de la Huasteca Potosina.',
        points: [
          {
            k: 'Empleo rural',
            v: 'La plantación, las terrazas, el mantenimiento y la cosecha los hacen cuadrillas locales, contratadas en los mismos municipios donde están las parcelas.',
          },
          {
            k: 'Comunidades Tének',
            v: 'Trabajamos con familias Tének de la Huasteca Potosina, combinando su conocimiento del terreno con acompañamiento agronómico y de monitoreo.',
          },
          {
            k: 'Trabajo que se queda',
            v: 'Un ciclo de agave dura años, así que el trabajo no es una temporada de siembra: es mantenimiento, pastoreo y cosecha sostenidos en el tiempo.',
          },
          {
            k: 'Valor que se queda cerca',
            v: 'Donde el volumen lo permite, la piña se procesa en la región en lugar de salir como tonelaje en bruto.',
          },
        ],
        alt: 'Cuadrilla local plantando agave en la Huasteca Potosina',
      };

  return (
    <section className="section-pad border-t border-border bg-paper-deep">
      <div className="container mx-auto grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 className="display-lg mt-4 text-ink">{c.title}</h2>
          <p className="lead mt-6">{c.body}</p>
          <dl className="mt-10 grid gap-px bg-border sm:grid-cols-2">
            {c.points.map((p) => (
              <div key={p.k} className="bg-background p-6">
                <dt className="font-display text-lg text-ink">{p.k}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal>
          <img
            src={cuadrilla}
            alt={c.alt}
            loading="lazy"
            decoding="async"
            className="h-full max-h-[560px] w-full object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
};

export default SocialImpact;
