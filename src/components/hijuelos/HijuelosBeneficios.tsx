import { Droplets, Sun, MapPin, TrendingUp, Leaf, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const beneficios = [
  {
    icon: Droplets,
    title: 'Sin Riego',
    description: 'Cultivo de temporal que no requiere sistemas de irrigación. Se adapta a las lluvias naturales de la región.'
  },
  {
    icon: Sun,
    title: 'Adaptado al Clima',
    description: 'Especie probada en la Huasteca Potosina y regiones cálidas sin riesgo de heladas.'
  },
  {
    icon: TrendingUp,
    title: 'Alta Rentabilidad',
    description: 'Márgenes atractivos con precios de piña entre $6 y $18 por kg y pesos promedio de 60 kg por planta.'
  },
  {
    icon: MapPin,
    title: 'Denominación de Origen',
    description: 'Regiones elegibles para producción de mezcal con DO: Tamaulipas, San Luis Potosí, Aguascalientes, Guanajuato.'
  },
  {
    icon: Leaf,
    title: 'Bajo Mantenimiento',
    description: 'Costo de cultivo integral de $200-$250 por planta durante todo el ciclo productivo.'
  },
  {
    icon: Shield,
    title: 'Acompañamiento Técnico',
    description: 'Asesoría en establecimiento, monitoreo durante el ciclo y guía para registro ante consejos reguladores.'
  }
];

const regiones = [
  { nombre: 'Huasteca Potosina', detalle: 'Clima ideal, tradición agavera' },
  { nombre: 'Tamaulipas (DO Mezcal)', detalle: 'Municipios con Denominación de Origen' },
  { nombre: 'Aguascalientes', detalle: 'Condiciones agroclimáticas aptas' },
  { nombre: 'Guanajuato', detalle: 'Zonas libres de heladas' },
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {beneficios.map((b, i) => (
            <Card key={i} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <b.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{b.title}</h3>
                  <p className="text-muted-foreground text-sm">{b.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Regiones */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Regiones Objetivo
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Dirigido a productores y propietarios de tierra en zonas aptas para el cultivo de agave espadín (sin heladas).
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
