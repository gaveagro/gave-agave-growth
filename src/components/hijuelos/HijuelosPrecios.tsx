import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const precios = [
  {
    talla: 'Pequeña',
    diametro: '15-20 cm',
    rango: '$25 - $30',
    ideal: 'Volúmenes grandes, presupuesto ajustado',
    destacado: false,
  },
  {
    talla: 'Mediana',
    diametro: '20-30 cm',
    rango: '$30 - $38',
    ideal: 'Mejor relación costo-beneficio',
    destacado: true,
  },
  {
    talla: 'Grande',
    diametro: '30-40 cm',
    rango: '$38 - $45',
    ideal: 'Menor tiempo a cosecha, mayor vigor',
    destacado: false,
  },
];

const HijuelosPrecios = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Precios por Hijuelo
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            El precio varía según la talla de la planta y el volumen de compra. Contáctanos para una cotización a tu medida.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {precios.map((p, i) => (
            <Card key={i} className={`relative overflow-hidden transition-shadow hover:shadow-lg ${p.destacado ? 'border-primary shadow-md ring-2 ring-primary/20' : ''}`}>
              {p.destacado && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg font-medium">
                  Recomendada
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg">{p.talla}</CardTitle>
                <p className="text-muted-foreground text-sm">Diámetro: {p.diametro}</p>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-3xl font-bold text-primary">{p.rango}</p>
                <p className="text-sm text-muted-foreground">MXN por hijuelo</p>
                <div className="flex items-start gap-2 text-sm text-left">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{p.ideal}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Densidad de plantación */}
        <div className="bg-secondary rounded-2xl p-8 max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-bold text-foreground mb-3">Diseño de Plantación</h3>
          <p className="text-4xl font-bold text-primary mb-2">2,400</p>
          <p className="text-muted-foreground">plantas por hectárea (diseño recomendado)</p>
          <p className="text-sm text-muted-foreground mt-3">
            Marco de plantación optimizado para maximizar rendimiento y facilitar labores culturales.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HijuelosPrecios;
