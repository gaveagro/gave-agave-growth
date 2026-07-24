import { Droplets, Sun, MapPin, TrendingUp, Leaf, Shield, Mountain, Sprout } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import espadinPanoramica from '@/assets/hijuelos/espadin-panoramica.jpg';

const beneficios = [
  {
    icon: Droplets,
    title: 'Tolerante a la Sequía',
    description: 'Cultivo de temporal, ideal para zonas afectadas por sequía y donde depender del riego ya no es viable.'
  },
  {
    icon: Mountain,
    title: 'Se Adapta a Suelos Pobres',
    description: 'Prospera incluso en suelos cansados o pedregosos. Perfecta para descansar terrenos agotados por monocultivo (como la caña).'
  },
  {
    icon: Sprout,
    title: 'Regenera el Suelo',
    description: 'Su sistema radicular y hojarasca ayudan a recuperar suelos degradados. El calcio es su principal nutriente, además de los macronutrientes.'
  },
  {
    icon: Sun,
    title: 'Clima Ideal',
    description: 'Especie probada en la Huasteca Potosina: humedad adecuada, calor y sin riesgo histórico de heladas.'
  },
  {
    icon: TrendingUp,
    title: 'Alta Rentabilidad',
    description: 'Márgenes atractivos con precios de piña entre $6 y $18 por kg y pesos promedio de 60 kg por planta.'
  },
  {
    icon: MapPin,
    title: 'Ventaja Logística',
    description: 'Nuestras parcelas están en la Huasteca Potosina: cercanía y menor costo de flete frente a proveedores de Oaxaca.'
  },
  {
    icon: Leaf,
    title: 'Bajo Mantenimiento',
    description: 'Costo de cultivo integral de ~$110 por planta durante todo el ciclo productivo de 5-6 años.'
  },
  {
    icon: Shield,
    title: 'Acompañamiento Técnico',
    description: 'Asesoría en establecimiento, monitoreo durante el ciclo y guía para registro ante consejos reguladores de mezcal.'
  }
];

const regiones = [
  { nombre: 'Huasteca Potosina', detalle: 'Origen de nuestras plantas, clima ideal y tradición agavera' },
  { nombre: 'Municipios de Tamaulipas con DO Mezcal', detalle: 'Vecinos con Denominación de Origen, clima ideal y excelente logística' },
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
            Un cultivo resiliente que se adapta donde otros ya no rinden: suelos cansados, sequía y bajo mantenimiento.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
          <div className="grid sm:grid-cols-2 gap-4">
            {beneficios.map((b, i) => (
              <Card key={i} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-5 flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <b.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm">{b.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{b.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src={espadinPanoramica} alt="Plantación panorámica de agave espadín en la Huasteca Potosina" className="w-full h-96 object-cover" />
          </div>
        </div>

        {/* Highlight: para productores huastecos */}
        <div className="max-w-4xl mx-auto mb-16 bg-background rounded-2xl p-8 border-l-4 border-primary shadow-sm">
          <h3 className="text-xl font-bold text-foreground mb-3">
            Una alternativa real para tierras cansadas por la caña
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            En la Huasteca Potosina, muchos productores han sufrido la degradación del suelo por años de monocultivo
            de caña y la creciente escasez de agua. El agave espadín ofrece una alternativa de bajo insumo, tolerante
            a sequía y capaz de prosperar en suelos pobres o pedregosos, lo que lo convierte en un excelente cultivo
            de rotación para regenerar la tierra mientras genera ingresos.
          </p>
        </div>

        {/* Regiones */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Regiones Ideales
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nuestras plantas se encuentran en la Huasteca Potosina. Estas son las regiones con el clima ideal para 
            espadín (humedad adecuada, sin heladas) y con Denominación de Origen de Mezcal.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {regiones.map((r, i) => (
            <div key={i} className="bg-background rounded-lg p-6 text-center shadow-sm border border-border">
              <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
              <h4 className="font-semibold text-foreground">{r.nombre}</h4>
              <p className="text-muted-foreground text-sm mt-1">{r.detalle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HijuelosBeneficios;
