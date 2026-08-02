import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/hooks/useLanguage';

const data = [
  { year: 'Año 0', co2: 0 },
  { year: 'Año 1', co2: 22 },
  { year: 'Año 2', co2: 58 },
  { year: 'Año 3', co2: 108 },
  { year: 'Año 4', co2: 172 },
  { year: 'Año 5', co2: 248 },
  { year: 'Año 6', co2: 330 },
];

const EvidenceSection = () => {
  const language = useLanguage();

  const c =
    language === 'EN'
      ? {
          eyebrow: 'Evidence & certification',
          title: 'From a hectare to an issuable credit',
          body:
            'Buyers of impact and carbon do not buy intentions, they buy evidence. Gavé builds the measurement layer from day one so a project can move through validation and verification without rebuilding its history.',
          chartTitle: 'Cumulative capture per hectare',
          chartUnit: 'tCO₂e accumulated / ha',
          steps: [
            ['01', 'Baseline', 'Soil sampling, cover and biomass baseline, land tenure and eligibility review.'],
            ['02', 'Design', 'Agroforestry / silvopastoral design, grazing plan and water harvesting works.'],
            ['03', 'Monitoring', 'Satellite indices plus field sampling on a fixed calendar, stored as an auditable record.'],
            ['04', 'Certification', 'Methodology selection, validation and verification with an accredited body.'],
            ['05', 'Issuance', 'Credits issued and placed; Gavé works on commission over the credits generated.'],
          ],
        }
      : {
          eyebrow: 'Evidencia y certificación',
          title: 'De una hectárea a un bono emisible',
          body:
            'Quien compra impacto y carbono no compra intenciones, compra evidencia. Gavé construye la capa de medición desde el día uno para que un proyecto pueda pasar validación y verificación sin tener que reconstruir su historia.',
          chartTitle: 'Captura acumulada por hectárea',
          chartUnit: 'tCO₂e acumuladas / ha',
          steps: [
            ['01', 'Línea base', 'Muestreo de suelo, línea base de cobertura y biomasa, revisión de tenencia y elegibilidad.'],
            ['02', 'Diseño', 'Diseño agroforestal / agrosilvopastoril, plan de pastoreo y obras de cosecha de agua.'],
            ['03', 'Monitoreo', 'Índices satelitales y muestreo en campo en calendario fijo, con registro auditable.'],
            ['04', 'Certificación', 'Selección de metodología, validación y verificación con organismo acreditado.'],
            ['05', 'Emisión', 'Emisión y colocación de bonos; Gavé trabaja por comisión sobre los bonos generados.'],
          ],
        };

  return (
    <section id="evidencia" className="section-pad bg-ink text-paper">
      <div className="container mx-auto">
        <div className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-paper/60">{c.eyebrow}</p>
            <h2 className="display-lg mt-4 text-paper">{c.title}</h2>
            <p className="mt-6 max-w-xl text-paper/70">{c.body}</p>

            <div className="mt-10 border border-paper/15 p-5">
              <p className="text-sm font-medium text-paper/80">{c.chartTitle}</p>
              <p className="text-xs text-paper/50">{c.chartUnit}</p>
              <div className="mt-5 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                    <defs>
                      <linearGradient id="co2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="hsl(var(--paper) / 0.12)" vertical={false} />
                    <XAxis
                      dataKey="year"
                      tick={{ fill: 'hsl(var(--paper) / 0.5)', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: 'hsl(var(--paper) / 0.5)', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'hsl(var(--ink-deep))',
                        border: '1px solid hsl(var(--paper) / 0.2)',
                        borderRadius: 0,
                        color: 'hsl(var(--paper))',
                        fontSize: 12,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="co2"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      fill="url(#co2)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-3 text-xs text-paper/40">
                {language === 'EN'
                  ? 'Illustrative curve based on 30–60 tCO₂e/ha/year ranges in agave silvopastoral systems.'
                  : 'Curva ilustrativa basada en rangos de 30–60 tCO₂e/ha/año en sistemas agrosilvopastoriles con agave.'}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="border-t border-paper/15">
              {c.steps.map(([n, title, body]) => (
                <li key={n} className="grid grid-cols-[auto_1fr] gap-6 border-b border-paper/15 py-6">
                  <span className="font-display text-sm text-accent">{n}</span>
                  <div>
                    <p className="font-display text-xl text-paper">{title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-paper/60">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default EvidenceSection;
