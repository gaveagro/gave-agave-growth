import { Card, CardContent } from '@/components/ui/card';
import { Ruler, Package, Sprout } from 'lucide-react';
import hijuelo1 from '@/assets/hijuelos/hijuelo-1.jpg';
import hijuelo2 from '@/assets/hijuelos/hijuelo-2.jpg';
import hijuelo3 from '@/assets/hijuelos/hijuelo-3.jpg';
import hijueloRaices from '@/assets/hijuelos/hijuelo-raices.jpg';

const galeria = [hijuelo1, hijuelo2, hijueloRaices, hijuelo3];

const ejemplos = [
  { altura: '20 cm', precio: '$20', nota: 'Planta pequeña' },
  { altura: '25 cm', precio: '$25', nota: 'Talla promedio', destacado: true },
  { altura: '30 cm', precio: '$30', nota: 'Planta grande, menor tiempo a cosecha' },
];

const HijuelosPrecios = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Precio transparente
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            $1 MXN por cada centímetro de altura
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Un modelo simple y justo: pagas por el tamaño real de la planta. En un pedido típico las plantas
            miden entre 20 y 30 cm, y el precio del lote se calcula sobre la altura promedio.
          </p>
        </div>

        {/* Formula visual */}
        <div className="max-w-3xl mx-auto mb-14">
          <div className="bg-gradient-to-br from-primary/5 via-secondary to-primary/5 rounded-2xl p-8 border border-primary/20">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
              <div className="flex items-center gap-3">
                <Ruler className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Altura</p>
                  <p className="text-2xl font-bold text-foreground">cm</p>
                </div>
              </div>
              <span className="text-3xl font-light text-muted-foreground">×</span>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Precio</p>
                <p className="text-2xl font-bold text-primary">$1 MXN</p>
              </div>
              <span className="text-3xl font-light text-muted-foreground">=</span>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Costo por hijuelo</p>
                <p className="text-2xl font-bold text-foreground">MXN</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ejemplos */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-14">
          {ejemplos.map((e, i) => (
            <Card key={i} className={`text-center transition-all hover:shadow-md ${e.destacado ? 'border-primary ring-2 ring-primary/20 shadow-md' : ''}`}>
              <CardContent className="p-6">
                {e.destacado && (
                  <span className="inline-block bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full mb-2">
                    Talla común
                  </span>
                )}
                <p className="text-sm text-muted-foreground mb-1">{e.altura}</p>
                <p className="text-3xl font-bold text-primary mb-2">{e.precio}</p>
                <p className="text-xs text-muted-foreground">{e.nota}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cómo se cobra el lote */}
        <div className="max-w-3xl mx-auto mb-14">
          <div className="flex gap-4 items-start bg-secondary rounded-xl p-6">
            <Package className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">¿Cómo se calcula el precio del lote?</h3>
              <p className="text-sm text-muted-foreground">
                Se promedia la altura de las plantas del pedido y ese promedio se aplica a todo el lote.
                Así el cobro es simple y transparente, sin medir planta por planta.
              </p>
            </div>
          </div>
        </div>

        {/* Galería */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          {galeria.map((img, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-md aspect-square">
              <img src={img} alt={`Hijuelo de agave espadín ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
        </div>

        {/* Densidad */}
        <div className="bg-secondary rounded-2xl p-8 max-w-3xl mx-auto text-center">
          <Sprout className="w-8 h-8 text-primary mx-auto mb-3" />
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
