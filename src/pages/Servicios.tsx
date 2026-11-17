import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SolutionPage from '@/components/solutions/SolutionPage';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/hooks/useLanguage';

const Servicios = () => {
  const en = useLanguage() === 'EN';

  const links = en
    ? [
        { label: 'Agave nursery: Espadín and Salmiana', to: '/vivero' },
        { label: 'Espadín pups for the Huasteca', to: '/hijuelos-espadin' },
        { label: 'Tell us about your ranch or programme', to: '/contacto' },
      ]
    : [
        { label: 'Vivero: Espadín y Salmiana', to: '/vivero' },
        { label: 'Hijuelos de Espadín para la Huasteca', to: '/hijuelos-espadin' },
        { label: 'Cuéntanos de tu rancho o programa', to: '/contacto' },
      ];

  return (
    <SolutionPage
      seo={{
        title: en
          ? 'Services: regenerative agriculture, agave plants and programmes | Gavé'
          : 'Servicios: agricultura regenerativa, planta de agave y programas | Gavé',
        description: en
          ? 'What we learned growing agave with partner communities, applied to your land: regenerative agriculture and livestock advisory, Espadín and Salmiana plants, and restoration programmes for companies and institutions.'
          : 'Lo que aprendimos cultivando agave con comunidades socias, aplicado a tu tierra: asesoría en agricultura y ganadería regenerativa, planta de Espadín y Salmiana, y programas de restauración para empresas e instituciones.',
        canonical: 'https://gaveagro.com/servicios',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Asesoría en agricultura y ganadería regenerativa con agave',
          provider: { '@type': 'Organization', name: 'Gavé', url: 'https://gaveagro.com/' },
          areaServed: 'MX',
          url: 'https://gaveagro.com/servicios',
        },
      }}
      image="/images/home/servicios.jpg"
      eyebrow={en ? 'Ranches · Producers · Programmes' : 'Ranchos · Productores · Programas'}
      title={en ? 'What we learned in the field, applied to your land' : 'Lo que aprendimos en campo, aplicado a tu tierra'}
      lead={
        en
          ? 'Years of growing agave on tired land with partner communities taught us how to make dry land produce again. We share that through three services.'
          : 'Años de cultivar agave en tierra cansada, junto con comunidades socias, nos enseñaron a hacer producir otra vez la tierra seca. Lo compartimos en tres servicios.'
      }
      blocks={
        en
          ? [
              {
                title: 'Regenerative agriculture and livestock',
                body: 'For ranch owners who want their land to produce more without wearing it out. We design the change of management with you and support it in the field.',
                bullets: [
                  'Diagnosis of the ranch and its degradation history',
                  'Agave plus companion dryland species on the same hectare',
                  'Rational grazing and herd management',
                  'Water harvesting works and rest periods',
                ],
              },
              {
                title: 'Agave plants by the lot',
                body: 'Espadín pups adapted to the Huasteca Potosina for mezcal supply, and Salmiana for arid land. Quoted by lot, by size and volume, with establishment guidance.',
              },
              {
                title: 'Programmes and tenders',
                body: 'Companies, foundations and institutions running reforestation, biodiversity or rural development programmes can work with us to plant and maintain agave on land that needs it, with communities who already know how to look after it.',
              },
              {
                title: 'How we work',
                body: 'The owner keeps the land and the operation. We scope each project case by case, agree on a fee or terms by project, and report with dated field photography and visits open to you.',
              },
            ]
          : [
              {
                title: 'Agricultura y ganadería regenerativa',
                body: 'Para dueños de ranchos que quieren que su tierra produzca más sin agotarla. Diseñamos contigo el cambio de manejo y lo acompañamos en campo.',
                bullets: [
                  'Diagnóstico del rancho y de su historial de degradación',
                  'Agave con especies acompañantes de zona árida en la misma hectárea',
                  'Pastoreo racional y manejo del hato',
                  'Obras de cosecha de agua y periodos de descanso',
                ],
              },
              {
                title: 'Planta de agave por lote',
                body: 'Hijuelos de Espadín adaptados a la Huasteca Potosina para abasto mezcalero, y Salmiana para zonas áridas. Cotizamos por lote, según talla y volumen, con acompañamiento de establecimiento.',
              },
              {
                title: 'Programas y licitaciones',
                body: 'Empresas, fundaciones e instituciones con programas de reforestación, biodiversidad o desarrollo rural pueden trabajar con nosotros para sembrar y mantener agave en tierra que lo necesita, con comunidades que ya saben cuidarlo.',
              },
              {
                title: 'Cómo trabajamos',
                body: 'El dueño conserva la tierra y la operación. Definimos cada proyecto caso por caso, acordamos honorarios o términos por proyecto, y reportamos con fotografía de campo fechada y visitas abiertas para ti.',
              },
            ]
      }
    >
      <section className="section-pad border-t border-border bg-paper-deep">
        <div className="container mx-auto">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{en ? 'Go deeper' : 'Más detalle'}</p>
          </Reveal>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="group flex items-center justify-between gap-6 py-6 font-display text-xl text-ink transition-colors hover:text-primary md:text-2xl"
                >
                  {l.label}
                  <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SolutionPage>
  );
};

export default Servicios;
