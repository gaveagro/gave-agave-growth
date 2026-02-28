import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { TrendingUp, DollarSign, BarChart3, Clock, Info } from 'lucide-react';

const HijuelosSimulador = () => {
  const [numPlantas, setNumPlantas] = useState(2400);
  const [precioPorKg, setPrecioPorKg] = useState(12);

  const precioHijuelo = 25;
  const pesoPlanta = 60;
  const costoCultivo = 180;
  const anos = 5.5;

  const inversionHijuelos = numPlantas * precioHijuelo;
  const costoTotalCultivo = numPlantas * costoCultivo;
  const inversionTotal = inversionHijuelos + costoTotalCultivo;
  const ingresoBruto = numPlantas * pesoPlanta * precioPorKg;
  const gananciaNeta = ingresoBruto - inversionTotal;
  const roiTotal = inversionTotal > 0 ? (gananciaNeta / inversionTotal) * 100 : 0;
  const roiAnual = anos > 0 ? roiTotal / anos : 0;
  const hectareas = numPlantas / 2400;

  const formatMXN = (n: number) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);

  return (
    <section id="simulador" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Simulador de Rentabilidad
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Calcula tu inversión y retorno estimado como productor de agave espadín. Ajusta el número de plantas y el precio de venta.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Parámetros de tu Plantación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Num plantas - slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-foreground">Número de plantas</label>
                  <span className="text-sm font-semibold text-primary">
                    {numPlantas.toLocaleString()} ({hectareas.toFixed(1)} ha)
                  </span>
                </div>
                <Slider
                  value={[numPlantas]}
                  onValueChange={([v]) => setNumPlantas(v)}
                  min={500}
                  max={24000}
                  step={100}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>500</span><span>24,000</span>
                </div>
              </div>

              {/* Precio por kg - slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-foreground">Precio de venta por kg</label>
                  <span className="text-sm font-semibold text-primary">{formatMXN(precioPorKg)}</span>
                </div>
                <Slider
                  value={[precioPorKg]}
                  onValueChange={([v]) => setPrecioPorKg(v)}
                  min={6}
                  max={18}
                  step={1}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>$6/kg</span><span>$18/kg</span>
                </div>
              </div>

              {/* Fixed params display */}
              <div className="bg-secondary rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <Info className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Valores fijos del modelo</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Precio por hijuelo</span>
                    <p className="font-semibold text-foreground">{formatMXN(precioHijuelo)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Peso por piña</span>
                    <p className="font-semibold text-foreground">{pesoPlanta} kg</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Costo de cultivo/planta</span>
                    <p className="font-semibold text-foreground">{formatMXN(costoCultivo)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Maduración</span>
                    <p className="font-semibold text-foreground">{anos} años</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  * El precio del hijuelo corresponde a talla pequeña ($25). Disponemos de otras tallas con precios desde $25 hasta $45 MXN.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            <Card className="gradient-hero-gave text-primary-foreground">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6 text-primary-foreground/80">Proyección Financiera</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-gave-yellow" />
                      <span className="text-sm text-primary-foreground/70">Inversión en hijuelos</span>
                    </div>
                    <p className="text-xl font-bold">{formatMXN(inversionHijuelos)}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-gave-yellow" />
                      <span className="text-sm text-primary-foreground/70">Costo de cultivo</span>
                    </div>
                    <p className="text-xl font-bold">{formatMXN(costoTotalCultivo)}</p>
                  </div>
                  <div className="col-span-2 border-t border-primary-foreground/20 pt-4">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-gave-yellow" />
                      <span className="text-sm text-primary-foreground/70">Inversión total</span>
                    </div>
                    <p className="text-2xl font-bold">{formatMXN(inversionTotal)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6 text-foreground">Retorno Estimado</h3>
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Ingreso bruto</span>
                    </div>
                    <span className="text-lg font-bold text-foreground">{formatMXN(ingresoBruto)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Ganancia neta</span>
                    </div>
                    <span className={`text-lg font-bold ${gananciaNeta >= 0 ? 'text-primary' : 'text-destructive'}`}>
                      {formatMXN(gananciaNeta)}
                    </span>
                  </div>
                  <div className="border-t border-border pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">ROI total</span>
                    </div>
                    <span className={`text-lg font-bold ${roiTotal >= 0 ? 'text-primary' : 'text-destructive'}`}>
                      {roiTotal.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">ROI anualizado ({anos} años)</span>
                    </div>
                    <span className={`text-lg font-bold ${roiAnual >= 0 ? 'text-primary' : 'text-destructive'}`}>
                      {roiAnual.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-xs text-muted-foreground text-center">
              * Los cálculos son estimaciones. Los resultados reales pueden variar según condiciones de mercado, clima y manejo agronómico.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HijuelosSimulador;
