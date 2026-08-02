import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SolutionPage from '@/components/solutions/SolutionPage';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/hooks/useLanguage';
import hero from '@/assets/homepage/tanchachin-parcela.jpg.asset.json';

const Vivero = () => {
  const language = useLanguage();
  const en = language === 'EN';

  return (
    <SolutionPage
      seo={{
        title: en ? 'Agave nursery: Espadín and Salmiana plants | Gavé' : 'Vivero de agave: planta Espadín y Salmiana | Gavé',
        description: en
          ? 'Field-ready agave plants at volume. Espadín pups at $1 MXN per centimetre of height, and Salmiana for arid-land reforestation.'
          : 'Planta de agave lista para campo, en volumen. Hijuelos de Espadín a $1 MXN por centímetro de altura y Salmiana para reforestación de zonas áridas.',
        canonical: 'https://gaveagro.com/vivero',
      }}
      image={hero.url}
      eyebrow={en ? 'Producers · Reforestation programmes' : 'Productores · Programas de reforestación'}
      title={en ? 'Plants that survive where nothing else does' : 'Planta que sobrevive donde nada más lo hace'}
      lead={
        en
          ? 'Espadín for mezcal supply in Denomination of Origin regions, Salmiana for arid-land reforestation. Rainfed, drought tolerant and comfortable on poor, stony soils.'
          : 'Espadín para abasto mezcalero en regiones con Denominación de Origen, Salmiana para reforestar zonas áridas. De temporal, tolerante a la sequía y cómoda en suelos pobres y pedregosos.'
      }
      stats={
        en
          ? [
              { value: '$1/cm', label: 'per centimetre of Espadín pup height' },
              { value: '0', label: 'irrigation required' },
              { value: '20–30 cm', label: 'typical plant size per order' },
              { value: 'Ca', label: 'calcium, its main nutrient' },
            ]
          : [
              { value: '$1/cm', label: 'por centímetro de altura del hijuelo Espadín' },
              { value: '0', label: 'riego requerido' },
              { value: '20–30 cm', label: 'tamaño típico de planta por pedido' },
              { value: 'Ca', label: 'calcio, su nutriente principal' },
            ]
      }
      blocks={
        en
          ? [
              {
                title: 'Agave Salmiana — reforestation',
                body: 'The reference species for regenerating arid land: deep rosettes, long cycle, strong soil-holding capacity and high tolerance to frost and drought. Ideal for public and corporate reforestation programmes on land that irrigation can no longer save.',
              },
              {
                title: 'Agave Espadín — mezcal supply',
                body: 'Angustifolia Haw pups adapted to the Huasteca Potosina and the Denomination of Origin municipalities of Tamaulipas — the regions whose climate genuinely fits this species.',
              },
              {
                title: 'Simple pricing',
                body: 'Espadín pups are priced at $1 MXN per centimetre of plant height. Orders typically carry plants between 20 and 30 cm, and we average the lot to set the price per plant. No hidden tables.',
              },
              {
                title: 'Soil: the argument that matters',
                body: 'Agave adapts to poor and stony soils, and its main nutrient is calcium beyond the macronutrients — limestone ground is an advantage. It is a real way to rest land exhausted by decades of monoculture such as sugarcane, while it regenerates.',
              },
              {
                title: 'Beyond the plant',
                body: 'Depending on purchase volume we can commit to buying back the harvest for mezcal, process the piñas together with you, run the processing for you, or simply help you place the tonnage with a buyer.',
              },
              {
                title: 'Logistics',
                body: 'Shipments organised by lot with planting windows advised for your region, plus establishment guidance for the first two seasons.',
              },
            ]
          : [
              {
                title: 'Agave Salmiana — reforestación',
                body: 'La especie de referencia para regenerar zonas áridas: rosetas profundas, ciclo largo, gran capacidad de sujetar suelo y alta tolerancia a heladas y sequía. Ideal para programas de reforestación públicos y corporativos en tierras que el riego ya no puede salvar.',
              },
              {
                title: 'Agave Espadín — abasto mezcalero',
                body: 'Hijuelos de Angustifolia Haw adaptados a la Huasteca Potosina y a los municipios con Denominación de Origen de Tamaulipas, las regiones cuyo clima realmente corresponde a esta especie.',
              },
              {
                title: 'Precio simple',
                body: 'Los hijuelos de Espadín se cotizan a $1 MXN por centímetro de altura de la planta. Los pedidos normalmente traen plantas de 20 a 30 cm y promediamos el lote para fijar el precio por planta. Sin tablas escondidas.',
              },
              {
                title: 'El suelo: el argumento que importa',
                body: 'El agave se adapta a suelos pobres y pedregosos, y su nutriente principal es el calcio además de los macronutrientes: el terreno calizo es una ventaja. Es una forma real de descansar tierras cansadas por décadas de monocultivo como la caña, mientras se regeneran.',
              },
              {
                title: 'Más allá de la planta',
                body: 'Según el volumen de compra podemos comprometernos a comprar la cosecha para hacer mezcal, procesar las piñas junto contigo, maquilar el proceso para ti, o simplemente ayudarte a colocar el tonelaje con un comprador.',
              },
              {
                title: 'Logística',
                body: 'Envíos organizados por lote, con ventanas de plantación recomendadas para tu región y acompañamiento de establecimiento durante las primeras dos temporadas.',
              },
            ]
      }
    >
      <section className="section-pad border-t border-border bg-paper-deep">
        <div className="container mx-auto">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{en ? 'Espadín landing page' : 'Landing de Espadín'}</p>
            <h2 className="display-lg mt-4 text-ink">
              {en ? 'Buying Espadín pups for the Huasteca?' : '¿Vas a comprar hijuelos de Espadín para la Huasteca?'}
            </h2>
            <p className="lead mt-5">
              {en
                ? 'There is a dedicated page with the profitability simulator, mezcal yield calculator and quote request.'
                : 'Hay una página dedicada con simulador de rentabilidad, calculadora de rendimiento de mezcal y solicitud de cotización.'}
            </p>
            <Button asChild size="lg" className="mt-8 rounded-none">
              <Link to="/hijuelos-espadin">{en ? 'Go to Espadín page' : 'Ir a la página de Espadín'}</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </SolutionPage>
  );
};

export default Vivero;
