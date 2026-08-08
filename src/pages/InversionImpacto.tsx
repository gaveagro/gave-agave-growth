import SolutionPage from '@/components/solutions/SolutionPage';
import { useLanguage } from '@/hooks/useLanguage';
import hero from '@/assets/homepage/impacto-parcela.jpg.asset.json';

const InversionImpacto = () => {
  const language = useLanguage();
  const en = language === 'EN';

  return (
    <SolutionPage
      seo={{
        title: en
          ? 'Impact investment in agave agroforestry | Gavé'
          : 'Inversión de impacto en agroforestería con agave | Gavé',
        description: en
          ? 'Fund agave-based agroforestry and silvopastoral systems in arid Mexico: carbon capture, regenerative livestock, water harvesting and satellite MRV.'
          : 'Financia sistemas agroforestales y agrosilvopastoriles con agave en zonas áridas de México: captura de carbono, ganadería regenerativa, cosecha de agua y MRV satelital.',
        canonical: 'https://gaveagro.com/inversion-de-impacto',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Inversión de impacto en sistemas agroforestales con agave',
          serviceType: 'Estructuración de proyectos agroforestales y agrosilvopastoriles para inversión de impacto',
          provider: { '@type': 'Organization', name: 'Gavé Agrotecnología', url: 'https://gaveagro.com/' },
          areaServed: 'Zonas áridas y semiáridas',
          url: 'https://gaveagro.com/inversion-de-impacto',
        },
      }}
      image={hero.url}
      eyebrow={en ? 'Funds · NGOs · Governments · Corporates' : 'Fondos · ONGs · Gobiernos · Empresas'}
      title={en ? 'Impact investment with evidence attached' : 'Inversión de impacto con evidencia adjunta'}
      lead={
        en
          ? 'Gavé structures agave-based agroforestry and silvopastoral projects on arid Mexican land, combining ecological restoration, regenerative livestock and a measurement layer designed for third-party verification.'
          : 'Gavé estructura proyectos agroforestales y agrosilvopastoriles con agave en tierras áridas de México, combinando restauración ecológica, ganadería regenerativa y una capa de medición diseñada para verificación de terceros.'
      }
      stats={
        en
          ? [
              { value: '30–60', label: 'tCO₂e / ha / year' },
              { value: '3', label: 'revenue streams per hectare' },
              { value: '0', label: 'irrigation required' },
              { value: '500+', label: 'hectares under restoration' },
            ]
          : [
              { value: '30–60', label: 'tCO₂e / ha / año' },
              { value: '3', label: 'fuentes de ingreso por hectárea' },
              { value: '0', label: 'riego requerido' },
              { value: '500+', label: 'hectáreas en restauración' },
            ]
      }
      blocks={
        en
          ? [
              {
                title: 'What the capital buys',
                body: 'Capital goes into establishing the productive and ecological infrastructure of a hectare, not into speculation on a single commodity.',
                bullets: [
                  'Establishment of agave and companion dryland species — mezquite (Prosopis spp.), nopal rastrero (Opuntia spp.), costilla de vaca (Atriplex canescens), leucaena (Leucaena leucocephala)',
                  'Water harvesting works: keylines, ditches, gabions, ponds',
                  'Herd integration and rational grazing (Voisin) infrastructure',
                  'Baseline, monitoring and MRV layer',
                ],
              },
              {
                title: 'Three revenue streams, one hectare',
                body: 'Biomass at the end of the cycle, livestock revenue during the maturing years, and environmental credits once the project is certified. Diversification is what protects the return from agave price cycles.',
              },
              {
                title: 'Reporting your board can use',
                body: 'Fixed-calendar monitoring, auditable records and reporting formats we can align to the frameworks you already use, from ESG reporting to development-finance requirements.',
              },
              {
                title: 'Where we operate',
                body: 'Any arid or semi-arid land where the system fits — we are not limited to one state or one country. Current operations run in San Luis Potosí and the Huasteca Potosina, with expansion into Tamaulipas and other dryland regions. Land where conventional agriculture has already failed is exactly where restoration additionality is highest.',
              },
              {
                title: 'Ticket and structure',
                body: 'We work per project rather than per plant: hectare-based mandates, co-investment with local landowners and blended structures with grant or concessional layers where they apply.',
              },
              {
                title: 'Community and land tenure',
                body: 'Every project runs with local crews and with tenure reviewed up front. Rural employment and water security in the community are part of the outcome, not a side note.',
              },
            ]
          : [
              {
                title: 'Qué compra el capital',
                body: 'El capital se destina a establecer la infraestructura productiva y ecológica de una hectárea, no a especular con un solo commodity.',
                bullets: [
                  'Establecimiento de agave y especies acompañantes de zona árida: mezquite (Prosopis spp.), nopal rastrero (Opuntia spp.), costilla de vaca (Atriplex canescens), leucaena (Leucaena leucocephala)',
                  'Obras de cosecha de agua: keylines, zanjas, gaviones, bordos',
                  'Integración del hato e infraestructura de ganadería racional (pastoreo Voisin)',
                  'Línea base, monitoreo y capa de MRV',
                ],
              },
              {
                title: 'Tres fuentes de ingreso, una hectárea',
                body: 'Biomasa al final del ciclo, ingresos ganaderos durante los años de maduración y bonos ambientales una vez certificado el proyecto. Esa diversificación es lo que protege el retorno frente a los ciclos de precio del agave.',
              },
              {
                title: 'Reportes que tu comité puede usar',
                body: 'Monitoreo en calendario fijo, registros auditables y formatos de reporte que podemos alinear a los marcos que ya utilizas, desde reporte ESG hasta requisitos de banca de desarrollo.',
              },
              {
                title: 'Dónde operamos',
                body: 'Cualquier zona árida o semiárida donde el sistema tenga sentido: no nos limitamos a un estado ni a un país. Hoy operamos en San Luis Potosí y la Huasteca Potosina, con expansión hacia Tamaulipas y otras regiones de tierras secas. La tierra donde la agricultura convencional ya fracasó es justo donde la adicionalidad de la restauración es mayor.',
              },
              {
                title: 'Ticket y estructura',
                body: 'Trabajamos por proyecto y no por planta: mandatos por hectárea, coinversión con dueños de tierra locales y estructuras mixtas con tramos concesionales o de donativo cuando aplican.',
              },
              {
                title: 'Comunidad y tenencia de la tierra',
                body: 'Cada proyecto opera con cuadrillas locales y con la tenencia revisada desde el inicio. El empleo rural y la seguridad hídrica de la comunidad son parte del resultado, no una nota al pie.',
              },
            ]
      }
    />
  );
};

export default InversionImpacto;
