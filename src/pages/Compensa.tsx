import SolutionPage from '@/components/solutions/SolutionPage';
import MezcalROI from '@/components/solutions/MezcalROI';
import Portfolio from '@/components/home/Portfolio';
import { useLanguage } from '@/hooks/useLanguage';
import hero from '@/assets/homepage/ebano-parcela.jpg.asset.json';

const Compensa = () => {
  const language = useLanguage();
  const en = language === 'EN';

  return (
    <SolutionPage
      seo={{
        title: en
          ? 'Sponsor agave, get mezcal: offset with a real return | Gavé'
          : 'Apadrina agave y recibe mezcal: compensa con retorno real | Gavé',
        description: en
          ? 'Sponsor agave plants on land under restoration in San Luis Potosí, follow your parcel with photos and satellite data, and take part of the harvest as mezcal.'
          : 'Apadrina plantas de agave en tierra en restauración en San Luis Potosí, sigue tu parcela con fotos y datos satelitales y recibe parte de la cosecha en mezcal.',
        canonical: 'https://gaveagro.com/compensa',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Compensa con agave y recibe mezcal',
          serviceType:
            'Apadrinamiento de plantas de agave en restauración con retorno en mezcal y reporte de impacto',
          provider: { '@type': 'Organization', name: 'Gavé Agrotecnología', url: 'https://gaveagro.com/' },
          areaServed: 'Zonas áridas y semiáridas',
          url: 'https://gaveagro.com/compensa',
        },
      }}
      image={hero.url}
      eyebrow={en ? 'Companies · Teams · Individuals' : 'Empresas · Equipos · Personas'}
      title={en ? 'Offset on land you can point at — and get mezcal back' : 'Compensa en tierra que puedes señalar y recibe mezcal'}
      lead={
        en
          ? 'Sponsor agave plants on parcels under restoration in San Luis Potosí. You get the coordinates, the photographs and the satellite series of your parcel — and when the cycle closes, part of the harvest comes back to you as mezcal.'
          : 'Apadrina plantas de agave en parcelas en restauración en San Luis Potosí. Recibes las coordenadas, las fotografías y la serie satelital de tu parcela — y al cerrar el ciclo, parte de la cosecha regresa a ti en forma de mezcal.'
      }
      stats={
        en
          ? [
              { value: '30–60', label: 'tCO₂e / ha / year captured' },
              { value: '100', label: 'minimum sponsored plants' },
              { value: '5.5 yr', label: 'to harvest' },
              { value: '8 kg = 1 L', label: 'piña to mezcal yield' },
            ]
          : [
              { value: '30–60', label: 'tCO₂e / ha / año capturadas' },
              { value: '100', label: 'plantas mínimas por apadrinamiento' },
              { value: '5.5 años', label: 'para la cosecha' },
              { value: '8 kg = 1 L', label: 'rendimiento de piña a mezcal' },
            ]
      }
      blocks={
        en
          ? [
              {
                title: 'Crowdgrowing, in plain words',
                body: 'You fund the plant and its cultivation on land that is being restored. We plant it, keep it alive and harvest it. When the cycle closes you can take your share as mezcal, sell the harvest, or leave it in the ground as pure offset.',
              },
              {
                title: 'What you receive during the cycle',
                body: 'Parcel coordinates, dated field photography, satellite cover series and an annual report with captured tonnage estimates, restored surface and jobs supported.',
                bullets: ['Parcel coordinates', 'Dated field photos', 'Satellite series', 'Annual impact report'],
              },
              {
                title: 'Mezcal at the end of the cycle',
                body: 'A mature Espadín piña averages 60 kg, and roughly 8 kg of piña yields one litre of mezcal. Bulk mezcal trades around $250–300 MXN per litre, which is what the calculator below uses.',
              },
              {
                title: 'For companies and teams',
                body: 'Corporate programmes, client or employee gifting, event compensation and supplier-facing commitments — with a bottle at the end that tells the story better than a certificate.',
              },
              {
                title: 'Honest about credits and returns',
                body: 'Sponsorship funds restoration and reports measured outcomes; it is not the same as buying a verified carbon credit. And the mezcal return is an estimate tied to the agave and mezcal market, not a guaranteed yield.',
              },
              {
                title: 'Visit the land, meet the crew',
                body: 'Sponsors are welcome on the parcels. Every sponsored plant is put in the ground and maintained by crews from the surrounding communities.',
              },
            ]
          : [
              {
                title: 'Crowdgrowing, en palabras simples',
                body: 'Financias la planta y su cultivo en tierra que se está restaurando. Nosotros la plantamos, la mantenemos viva y la cosechamos. Al cerrar el ciclo puedes tomar tu parte en mezcal, vender la cosecha, o dejarla en el suelo como compensación pura.',
              },
              {
                title: 'Qué recibes durante el ciclo',
                body: 'Coordenadas de la parcela, fotografía de campo fechada, serie satelital de cobertura y un reporte anual con estimación de toneladas capturadas, superficie restaurada y empleos sostenidos.',
                bullets: ['Coordenadas de la parcela', 'Fotos de campo fechadas', 'Serie satelital', 'Reporte anual de impacto'],
              },
              {
                title: 'Mezcal al final del ciclo',
                body: 'Una piña madura de Espadín promedia 60 kg y aproximadamente 8 kg de piña rinden un litro de mezcal. El mezcal a granel se mueve alrededor de $250–300 MXN por litro, que es lo que usa la calculadora de abajo.',
              },
              {
                title: 'Para empresas y equipos',
                body: 'Programas corporativos, regalos a clientes o colaboradores, compensación de eventos y compromisos frente a tu cadena de proveedores — con una botella al final que cuenta la historia mejor que un certificado.',
              },
              {
                title: 'Honestos sobre bonos y retornos',
                body: 'El apadrinamiento financia restauración y reporta resultados medidos; no es lo mismo que comprar un bono de carbono verificado. Y el retorno en mezcal es una estimación ligada al mercado del agave y del mezcal, no un rendimiento garantizado.',
              },
              {
                title: 'Visita la tierra, conoce a la cuadrilla',
                body: 'Los padrinos son bienvenidos en las parcelas. Cada planta apadrinada la siembra y la mantiene gente de las comunidades vecinas.',
              },
            ]
      }
    >
      <MezcalROI />
      <Portfolio />
    </SolutionPage>
  );
};

export default Compensa;
