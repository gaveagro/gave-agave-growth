import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, DollarSign, BarChart3, Clock } from 'lucide-react';

const HijuelosSimulador = () => {
  const [numPlantas, setNumPlantas] = useState(2400);
  const [pesoPlanta, setPesoPlanta] = useState(60);
  const [precioPorKg, setPrecioPorKg] = useState(12);
  const [costoCultivo, setCostoCultivo] = useState(225);
  const [precioHijuelo, setPrecioHijuelo] = useState(35);
  const [anosMaduracion, setAnosMaduracion] = useState('5.5');

  const anos = parseFloat(anosMaduracion);
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
            Calcula tu inversión y retorno estimado como productor de agave espadín. Ajusta los parámetros según tu plan.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Parámetros de tu Plantación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Num plantas */}
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

              {/* Precio hijuelo */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-foreground">Precio por hijuelo</label>
                  <span className="text-sm font-semibold text-primary">{formatMXN(precioHijuelo)}</span>
                </div>
                <Slider
                  value={[precioHijuelo]}
                  onValueChange={([v]) => setPrecioHijuelo(v)}
                  min={25}
                  max={45}
                  step={1}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>$25</span><span>$45</span>
                </div>
              </div>

              {/* Peso planta */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-foreground">Peso por piña a cosecha</label>
                  <span className="text-sm font-semibold text-primary">{pesoPlanta} kg</span>
                </div>
                <Slider
                  value={[pesoPlanta]}
                  onValueChange={([v]) => setPesoPlanta(v)}
                  min={40}
                  max={80}
                  step={5}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>40 kg</span><span>80 kg</span>
                </div>
              </div>

              {/* Precio por kg */}
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

              {/* Costo cultivo */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-foreground">Costo de cultivo por planta</label>
                  <span className="text-sm font-semibold text-primary">{formatMXN(costoCultivo)}</span>
                </div>
                <Slider
                  value={[costoCultivo]}
                  onValueChange={([v]) => setCostoCultivo(v)}
                  min={200}
                  max={250}
                  step={5}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>$200</span><span>$250</span>
                </div>
              </div>

              {/* Años maduración */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Tiempo de maduración</label>
                <Select value={anosMaduracion} onValueChange={setAnosMaduracion}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 años</SelectItem>
                    <SelectItem value="5.5">5.5 años</SelectItem>
                    <SelectItem value="6">6 años</SelectItem>
                  </SelectContent>
                </Select>
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
