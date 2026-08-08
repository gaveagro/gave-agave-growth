import SolutionPage from '@/components/solutions/SolutionPage';
import { useLanguage } from '@/hooks/useLanguage';
import hero from '@/assets/homepage/ebano-parcela.jpg.asset.json';

const Compensa = () => {
  const language = useLanguage();
  const en = language === 'EN';

  return (
    <SolutionPage
      seo={{
        title: en ? 'Offset your footprint by restoring arid land | Gavé' : 'Compensa tu huella regenerando tierras áridas | Gavé',
        description: en
          ? 'Companies and individuals can sponsor restored hectares in arid Mexico, with photo, satellite and impact reporting on the exact land they funded.'
          : 'Empresas y personas pueden apadrinar hectáreas restauradas en zonas áridas de México, con reporte fotográfico, satelital y de impacto de la tierra que financiaron.',
        canonical: 'https://gaveagro.com/compensa',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Compensa y patrocina hectáreas en restauración',
          serviceType: 'Patrocinio de hectáreas restauradas con reporte de impacto verificable',
          provider: { '@type': 'Organization', name: 'Gavé Agrotecnología', url: 'https://gaveagro.com/' },
          areaServed: 'Zonas áridas y semiáridas',
          url: 'https://gaveagro.com/compensa',
        },
      }}
      image={hero.url}
      eyebrow={en ? 'Companies · Teams · Individuals' : 'Empresas · Equipos · Personas'}
      title={en ? 'Offset on land you can actually point at' : 'Compensa en tierra que puedes señalar en el mapa'}
      lead={
        en
          ? 'Sponsor hectares under restoration in San Luis Potosí. You get the coordinates, the photographs, the satellite series and an annual impact report on the exact parcel your contribution funded.'
          : 'Apadrina hectáreas en restauración en San Luis Potosí. Recibes las coordenadas, las fotografías, la serie satelital y un reporte anual de impacto de la parcela exacta que financió tu aportación.'
      }
      stats={
        en
          ? [
              { value: '30–60', label: 'tCO₂e / ha / year captured' },
              { value: '1 ha', label: 'minimum sponsorship unit' },
              { value: 'GPS', label: 'coordinates of your parcel' },
              { value: 'Annual', label: 'impact report' },
            ]
          : [
              { value: '30–60', label: 'tCO₂e / ha / año capturadas' },
              { value: '1 ha', label: 'unidad mínima de apadrinamiento' },
              { value: 'GPS', label: 'coordenadas de tu parcela' },
              { value: 'Anual', label: 'reporte de impacto' },
            ]
      }
      blocks={
        en
          ? [
              {
                title: 'How sponsorship works',
                body: 'You fund the establishment and first years of management of a defined surface. That money pays for plants, field crews, water works and monitoring — not for a certificate printed somewhere else.',
              },
              {
                title: 'What you receive',
                body: 'Parcel coordinates, dated field photography, satellite cover series and an annual report with captured tonnage estimates, restored surface and jobs supported.',
                bullets: ['Parcel coordinates', 'Dated field photos', 'Satellite series', 'Annual impact report'],
              },
              {
                title: 'For companies and teams',
                body: 'Corporate programmes, client or employee gifting, event compensation and supplier-facing sustainability commitments. We can prepare communication material for your own reporting.',
              },
              {
                title: 'Honest about credits',
                body: 'Sponsorship funds restoration and reports measured outcomes. It is not the same as buying a verified carbon credit — when you need certified credits, the carbon programme is the right route and we will say so.',
              },
              {
                title: 'Visit the land',
                body: 'Sponsors are welcome on the parcels. Seeing agave rows on stony ground and sheep grazing between them tells the story better than any brochure.',
              },
              {
                title: 'Local impact',
                body: 'Every sponsored hectare is planted and maintained by crews from the surrounding communities, in a region where drought and exhausted soil have shrunk the alternatives.',
              },
            ]
          : [
              {
                title: 'Cómo funciona el apadrinamiento',
                body: 'Financias el establecimiento y los primeros años de manejo de una superficie definida. Ese dinero paga planta, cuadrillas de campo, obras de agua y monitoreo — no un certificado impreso en otro lado.',
              },
              {
                title: 'Qué recibes',
                body: 'Coordenadas de la parcela, fotografía de campo fechada, serie satelital de cobertura y un reporte anual con estimación de toneladas capturadas, superficie restaurada y empleos sostenidos.',
                bullets: ['Coordenadas de la parcela', 'Fotos de campo fechadas', 'Serie satelital', 'Reporte anual de impacto'],
              },
              {
                title: 'Para empresas y equipos',
                body: 'Programas corporativos, regalos a clientes o colaboradores, compensación de eventos y compromisos de sustentabilidad frente a tu cadena de proveedores. Preparamos material de comunicación para tu propio reporte.',
              },
              {
                title: 'Honestos sobre los bonos',
                body: 'El apadrinamiento financia restauración y reporta resultados medidos. No es lo mismo que comprar un bono de carbono verificado: cuando necesitas bonos certificados, la ruta correcta es el programa de carbono y te lo diremos así.',
              },
              {
                title: 'Visita la tierra',
                body: 'Los padrinos son bienvenidos en las parcelas. Ver las hileras de agave sobre terreno pedregoso y los borregos pastoreando entre ellas cuenta la historia mejor que cualquier folleto.',
              },
              {
                title: 'Impacto local',
                body: 'Cada hectárea apadrinada se planta y se mantiene con cuadrillas de las comunidades vecinas, en una región donde la sequía y el suelo agotado han reducido las alternativas.',
              },
            ]
      }
    />
  );
};

export default Compensa;
