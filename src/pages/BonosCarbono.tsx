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
          ? 'Gavé takes arid-land ranches of 8,000+ ha through baseline, MRV, methodology and certification to issue carbon and regenerative-livestock credits.'
          : 'Gavé lleva ranchos de +8,000 ha en zonas áridas por línea base, MRV, metodología y certificación para emitir bonos de carbono y de ganadería regenerativa.',
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
      eyebrow={en ? 'Ranch owners · 8,000+ ha · Arid zones' : 'Dueños de rancho · +8,000 ha · Zonas áridas'}
      title={en ? 'Your ranch already captures carbon. Let’s make it issuable.' : 'Tu rancho ya captura carbono. Hagámoslo emisible.'}
      lead={
        en
          ? 'Large arid-land ranches hold enormous restoration potential that never reaches a market because nobody measured it. Gavé builds the baseline, the management change and the MRV that turn that potential into certified credits.'
          : 'Los ranchos grandes en zonas áridas guardan un potencial de restauración enorme que nunca llega a un mercado porque nadie lo midió. Gavé construye la línea base, el cambio de manejo y el MRV que convierten ese potencial en bonos certificados.'
      }
      stats={
        en
          ? [
              { value: '8,000+', label: 'target ha per project' },
              { value: '5', label: 'stages to issuance' },
              { value: 'MRV', label: 'satellite + field sampling' },
              { value: 'Fee', label: 'commission over credits issued' },
            ]
          : [
              { value: '+8,000', label: 'ha objetivo por proyecto' },
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
                body: 'Arid or semi-arid ranches above roughly 8,000 hectares, ideally with a history of overgrazing or degradation and clear land tenure. A weak baseline is not a problem — it is the source of additionality.',
              },
              {
                title: 'The management change',
                body: 'Credits come from doing something different: planned grazing, agave and native species establishment, water harvesting works and rest periods that let vegetation and soil carbon recover.',
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
                body: 'Ranchos áridos o semiáridos de aproximadamente 8,000 hectáreas en adelante, idealmente con historial de sobrepastoreo o degradación y tenencia clara. Una línea base pobre no es un problema: es la fuente de la adicionalidad.',
              },
              {
                title: 'El cambio de manejo',
                body: 'Los bonos surgen de hacer algo distinto: pastoreo planificado, establecimiento de agave y especies nativas, obras de cosecha de agua y descansos que permiten recuperar vegetación y carbono en suelo.',
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
