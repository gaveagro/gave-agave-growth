import SolutionPage from '@/components/solutions/SolutionPage';
import { useLanguage } from '@/hooks/useLanguage';
import hero from '@/assets/homepage/moctezuma-silvopastoril.jpg.asset.json';

const BonosCarbono = () => {
  const language = useLanguage();
  const en = language === 'EN';

  return (
    <SolutionPage
      seo={{
        title: en
          ? 'Carbon credit certification for arid-land ranches | Gavé'
          : 'Certificación de bonos de carbono para ranchos en zonas áridas | Gavé',
        description: en
          ? 'Gavé takes arid and semi-arid ranches through baseline, MRV, methodology and certification to issue carbon and regenerative-livestock credits, working on commission over the credits generated.'
          : 'Gavé lleva ranchos en zonas áridas y semiáridas por línea base, MRV, metodología y certificación para emitir bonos de carbono y de ganadería regenerativa, trabajando por comisión sobre los bonos generados.',
        canonical: 'https://gaveagro.com/bonos-de-carbono',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Certificación de bonos de carbono para ranchos',
          serviceType: 'Línea base, MRV, metodología y acompañamiento a certificación de bonos ambientales',
          provider: { '@type': 'Organization', name: 'Gavé Agrotecnología', url: 'https://gaveagro.com/' },
          areaServed: 'Zonas áridas y semiáridas',
          url: 'https://gaveagro.com/bonos-de-carbono',
        },
      }}
      image={hero.url}
      eyebrow={en ? 'Ranch owners · Arid & semi-arid zones' : 'Dueños de rancho · Zonas áridas y semiáridas'}
      title={en ? 'Your ranch already captures carbon. Let’s make it issuable.' : 'Tu rancho ya captura carbono. Hagámoslo emisible.'}
      lead={
        en
          ? 'Arid-land ranches hold enormous restoration potential that never reaches a market because nobody measured it. Gavé builds the baseline, the management change and the MRV that turn that potential into certified credits — and works on commission over the credits generated.'
          : 'Los ranchos en zonas áridas guardan un potencial de restauración enorme que nunca llega a un mercado porque nadie lo midió. Gavé construye la línea base, el cambio de manejo y el MRV que convierten ese potencial en bonos certificados, y trabaja por comisión sobre los bonos generados.'
      }
      stats={
        en
          ? [
              { value: 'Case by case', label: 'ranch size assessed per project' },
              { value: '5', label: 'stages to issuance' },
              { value: 'MRV', label: 'satellite + field sampling' },
              { value: 'Fee', label: 'commission over credits issued' },
            ]
          : [
              { value: 'Caso por caso', label: 'la superficie se evalúa por proyecto' },
              { value: '5', label: 'etapas hasta la emisión' },
              { value: 'MRV', label: 'satelital + muestreo en campo' },
              { value: 'Comisión', label: 'sobre los bonos emitidos' },
            ]
      }
      blocks={
        en
          ? [
              {
                title: 'Who qualifies',
                body: 'Any arid or semi-arid ranch with clear land tenure, anywhere the climate fits — we are not limited to a single state or country. There is no rigid hectare minimum: we assess each ranch case by case, because what drives the project is the degradation history and the restoration potential, not a number on a title deed. A weak baseline is not a problem — it is the source of additionality.',
              },
              {
                title: 'The species mix — not agave alone',
                body: 'Agave is the backbone, but the system is multi-species by design. Each species does a different job on the same hectare: soil cover, nitrogen, shade, fodder and deep root structure.',
                bullets: [
                  'Agave (Agave spp.) — biomass, soil retention and long-cycle carbon',
                  'Mezquite (Prosopis spp.) — nitrogen fixation, shade and pods as fodder',
                  'Nopal rastrero (Opuntia spp.) — ground cover, water in the diet of the herd',
                  'Costilla de vaca (Atriplex canescens) — saline-tolerant, high-protein browse',
                  'Leucaena (Leucaena leucocephala) — fast-growing protein bank',
                  'Agave Salmiana leaves as fodder and silage for the herd',
                ],
              },
              {
                title: 'The management change',
                body: 'Credits come from doing something different: rational grazing (Voisin) and regenerative livestock management, establishment of agave and the companion dryland species, water harvesting works, and rest periods that let vegetation and soil carbon recover.',
              },
              {
                title: 'Measurement, reporting, verification',
                body: 'Satellite indices for cover and biomass, field sampling for soil carbon, herd tracking and a fixed monitoring calendar — recorded as an auditable history from day one.',
                bullets: [
                  'Soil and cover baseline',
                  'Satellite time series',
                  'Field carbon sampling campaigns',
                  'Auditable documentation trail',
                ],
              },
              {
                title: 'Methodology and certification',
                body: 'We select the methodology that fits the site and the target market — removals, soil carbon, regenerative livestock for arid zones — and run validation and verification with an accredited body.',
              },
              {
                title: 'Commercial terms',
                body: 'The owner keeps the land and the operation. Gavé provides design, MRV and the certification process, and works on commission over the credits generated. No upfront sale of your land or your herd.',
              },
              {
                title: 'Realistic timeline',
                body: 'Baseline and design in the first months, then multi-year monitoring before the first verified issuance. Anyone promising credits in one season is not describing a real certification process.',
              },
            ]
          : [
              {
                title: 'Quién califica',
                body: 'Cualquier rancho en zona árida o semiárida con tenencia clara, en donde el clima corresponda: no nos limitamos a un estado ni a un país. No hay un mínimo rígido de hectáreas — evaluamos cada rancho caso por caso, porque lo que mueve al proyecto es el historial de degradación y el potencial de restauración, no un número en la escritura. Una línea base pobre no es un problema: es la fuente de la adicionalidad.',
              },
              {
                title: 'Las especies — no solo agave',
                body: 'El agave es la columna vertebral, pero el sistema es multiespecie por diseño. Cada especie hace un trabajo distinto en la misma hectárea: cobertura de suelo, nitrógeno, sombra, forraje y estructura de raíz profunda.',
                bullets: [
                  'Agave (Agave spp.) — biomasa, retención de suelo y carbono de ciclo largo',
                  'Mezquite (Prosopis spp.) — fijación de nitrógeno, sombra y vainas como forraje',
                  'Nopal rastrero (Opuntia spp.) — cobertura de suelo y agua en la dieta del hato',
                  'Costilla de vaca (Atriplex canescens) — tolerante a salinidad, ramoneo alto en proteína',
                  'Leucaena (Leucaena leucocephala) — banco de proteína de crecimiento rápido',
                  'Hojas de agave Salmiana como forraje y ensilado para el hato',
                ],
              },
              {
                title: 'El cambio de manejo',
                body: 'Los bonos surgen de hacer algo distinto: ganadería racional (pastoreo racional Voisin) y manejo regenerativo del hato, establecimiento de agave y de las especies acompañantes de zona árida, obras de cosecha de agua y descansos que permiten recuperar vegetación y carbono en suelo.',
              },
              {
                title: 'Medición, reporte y verificación',
                body: 'Índices satelitales de cobertura y biomasa, muestreo de carbono en suelo, trazabilidad del hato y un calendario fijo de monitoreo, registrado como historial auditable desde el primer día.',
                bullets: [
                  'Línea base de suelo y cobertura',
                  'Series de tiempo satelitales',
                  'Campañas de muestreo de carbono en campo',
                  'Expediente documental auditable',
                ],
              },
              {
                title: 'Metodología y certificación',
                body: 'Seleccionamos la metodología que corresponde al sitio y al mercado objetivo — remociones, carbono en suelo, ganadería regenerativa en zonas áridas — y acompañamos la validación y verificación con un organismo acreditado.',
              },
              {
                title: 'Términos comerciales',
                body: 'El dueño conserva la tierra y la operación. Gavé aporta diseño, MRV y el proceso de certificación, y trabaja por comisión sobre los bonos generados. Sin venta anticipada de tu tierra ni de tu hato.',
              },
              {
                title: 'Tiempos realistas',
                body: 'Línea base y diseño en los primeros meses, después años de monitoreo antes de la primera emisión verificada. Quien promete bonos en una temporada no está describiendo un proceso real de certificación.',
              },
            ]
      }
    />
  );
};

export default BonosCarbono;
