import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/hooks/useLanguage';
import comunidad from '@/assets/homepage/comunidad-socios.jpg.asset.json';

const SocialImpact = () => {
  const language = useLanguage();
  const en = language === 'EN';

  const c = en
    ? {
        eyebrow: 'Social impact',
        title: 'The communities are partners, not labour',
        body: 'Arid land does not empty out because of drought alone — it empties out when the people who live there have no stake in what happens to it. We work with the communities that inhabit each region as partners in the project: they contribute land, knowledge and work, and they participate in the economic, technical and cultural value the parcel generates.',
        points: [
          {
            k: 'Economic participation',
            v: 'Communities take part in the value of the parcel over the whole cycle — not a one-off wage, but sustained income from establishment, maintenance, grazing and harvest.',
          },
          {
            k: 'Technical transfer',
            v: 'Agronomic training, monitoring and nursery management stay in the region, so the capability outlives any single project.',
          },
          {
            k: 'Cultural continuity',
            v: 'Local knowledge of the land, the agave and its uses is built into the design of the system instead of being replaced by it.',
          },
          {
            k: 'Tének case study',
            v: 'Our most developed case today is with Tének communities of the Huasteca Potosina, and the same partnership model travels to every region where we work.',
          },
        ],
        alt: 'Gavé technicians and community members reviewing an agave parcel together',
      }
    : {
        eyebrow: 'Impacto social',
        title: 'Las comunidades son socias, no mano de obra',
        body: 'La tierra árida no se vacía solo por la sequía — se vacía cuando quienes la habitan no tienen parte en lo que ocurre con ella. Trabajamos con las comunidades de cada región como socias del proyecto: aportan tierra, conocimiento y trabajo, y participan del valor económico, técnico y cultural que genera la parcela.',
        points: [
          {
            k: 'Participación económica',
            v: 'Las comunidades participan del valor de la parcela durante todo el ciclo: no un jornal aislado, sino ingreso sostenido en establecimiento, mantenimiento, pastoreo y cosecha.',
          },
          {
            k: 'Transferencia técnica',
            v: 'La capacitación agronómica, el monitoreo y el manejo de vivero se quedan en la región, así la capacidad sobrevive a cualquier proyecto en particular.',
          },
          {
            k: 'Continuidad cultural',
            v: 'El conocimiento local del terreno, del agave y de sus usos se integra al diseño del sistema en lugar de ser sustituido por él.',
          },
          {
            k: 'Caso Tének',
            v: 'Nuestro caso más desarrollado hoy es con comunidades Tének de la Huasteca Potosina, y el mismo modelo de sociedad viaja a cada región donde trabajamos.',
          },
        ],
        alt: 'Técnicos de Gavé y miembros de la comunidad revisando juntos una parcela de agave',
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
            src={comunidad.url}
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
