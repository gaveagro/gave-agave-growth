import { Droplets, Sun, MapPin, TrendingUp, Leaf, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import espadinPanoramica from '@/assets/hijuelos/espadin-panoramica.jpg';

const beneficios = [
  {
    icon: Droplets,
    title: 'Sin Riego',
    description: 'Cultivo de temporal que no requiere sistemas de irrigación. Se adapta a las lluvias naturales de la región.'
  },
  {
    icon: Sun,
    title: 'Adaptado al Clima',
    description: 'Especie probada en la Huasteca Potosina y regiones cálidas con humedad adecuada y sin riesgo histórico de heladas.'
  },
  {
    icon: TrendingUp,
    title: 'Alta Rentabilidad',
    description: 'Márgenes atractivos con precios de piña entre $6 y $18 por kg y pesos promedio de 60 kg por planta.'
  },
  {
    icon: MapPin,
    title: 'Ventaja Logística',
    description: 'Nuestras parcelas están en la Huasteca Potosina, lo que ofrece cercanía y menor costo de flete frente a proveedores de Oaxaca.'
  },
  {
    icon: Leaf,
    title: 'Bajo Mantenimiento',
    description: 'Costo de cultivo integral de $200-$250 por planta durante todo el ciclo productivo de 5-6 años.'
  },
  {
    icon: Shield,
    title: 'Acompañamiento Técnico',
    description: 'Asesoría en establecimiento, monitoreo durante el ciclo y guía para registro ante consejos reguladores de mezcal.'
  }
];

const regiones = [
  { nombre: 'Huasteca Potosina', detalle: 'Origen de nuestras plantas, clima ideal y tradición agavera' },
  { nombre: 'Tamaulipas (DO Mezcal)', detalle: 'Municipios vecinos con Denominación de Origen, excelente logística' },
  { nombre: 'Aguascalientes', detalle: 'Zonas con condiciones agroclimáticas aptas y sin heladas' },
  { nombre: 'Guanajuato', detalle: 'Regiones cálidas con humedad adecuada para espadín' },
];

const HijuelosBeneficios = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Beneficios */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            ¿Por Qué Cultivar Agave Espadín?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Un cultivo resiliente, de bajo costo operativo y con un mercado en crecimiento constante.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
          <div className="grid sm:grid-cols-2 gap-6">
            {beneficios.map((b, i) => (
              <Card key={i} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-5 flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <b.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm">{b.title}</h3>
                    <p className="text-muted-foreground text-xs">{b.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src={espadinPanoramica} alt="Plantación panorámica de agave espadín en la Huasteca Potosina" className="w-full h-80 object-cover" />
          </div>
        </div>

        {/* Regiones */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Regiones Ideales por Cercanía
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nuestras plantas se encuentran en parcelas de la Huasteca Potosina. Los estados vecinos con Denominación de Origen de Mezcal 
            son los candidatos ideales por cercanía logística y condiciones agroclimáticas: humedad adecuada y ausencia histórica de heladas. 
            Comprarnos resulta más conveniente que traer espadín desde Oaxaca.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {regiones.map((r, i) => (
            <div key={i} className="bg-background rounded-lg p-5 text-center shadow-sm border border-border">
              <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
              <h4 className="font-semibold text-foreground text-sm">{r.nombre}</h4>
              <p className="text-muted-foreground text-xs mt-1">{r.detalle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HijuelosBeneficios;
