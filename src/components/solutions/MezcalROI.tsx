import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/hooks/useLanguage';

const PESO_PINA = 60; // kg por piña
const KG_POR_LITRO = 8; // 8 kg de piña por litro de mezcal
const PRECIO_PLANTA = 25; // MXN
const COSTO_CULTIVO = 110; // MXN por planta hasta cosecha
const ANOS = 5.5;
const PRECIO_GRANEL_MIN = 250; // MXN por litro a granel
const PRECIO_GRANEL_MAX = 300;

const MezcalROI = () => {
  const language = useLanguage();
  const en = language === 'EN';
  const [plantas, setPlantas] = useState(1000);

  const inversion = plantas * (PRECIO_PLANTA + COSTO_CULTIVO);
  const litros = (plantas * PESO_PINA) / KG_POR_LITRO;
  const ingresoMin = litros * PRECIO_GRANEL_MIN;
  const ingresoMax = litros * PRECIO_GRANEL_MAX;
  const netoMin = ingresoMin - inversion;
  const netoMax = ingresoMax - inversion;
  const roiMin = inversion > 0 ? (netoMin / inversion) * 100 : 0;
  const roiMax = inversion > 0 ? (netoMax / inversion) * 100 : 0;
  const hectareas = plantas / 2400;

  const mxn = (n: number) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);

  const c = en
    ? {
        eyebrow: 'Mezcal calculator',
        title: 'What a sponsored lot turns into',
        lead: 'Move the number of plants and see the estimated cost, the litres of mezcal that lot can yield and the gross return at bulk prices.',
        plants: 'Sponsored plants',
        invest: 'Estimated total cost',
        investNote: `${mxn(PRECIO_PLANTA)} plant + ${mxn(COSTO_CULTIVO)} cultivation per plant`,
        litres: 'Estimated litres of mezcal',
        litresNote: `${PESO_PINA} kg per piña · ${KG_POR_LITRO} kg per litre`,
        revenue: 'Gross revenue at bulk price',
        revenueNote: `${mxn(PRECIO_GRANEL_MIN)}–${mxn(PRECIO_GRANEL_MAX)} per litre in bulk`,
        net: 'Estimated net result',
        roi: 'Total return over the cycle',
        roiNote: `Cycle of ${ANOS} years`,
        disclaimer:
          'Estimates, not a promise of return. Yields depend on soil, rainfall, management and the mezcal market at the time of harvest. We share the assumptions so you can challenge them.',
      }
    : {
        eyebrow: 'Calculadora de mezcal',
        title: 'En qué se convierte un lote apadrinado',
        lead: 'Mueve el número de plantas y observa el costo estimado, los litros de mezcal que puede rendir ese lote y el retorno bruto a precio de granel.',
        plants: 'Plantas apadrinadas',
        invest: 'Costo total estimado',
        investNote: `${mxn(PRECIO_PLANTA)} de planta + ${mxn(COSTO_CULTIVO)} de cultivo por planta`,
        litres: 'Litros de mezcal estimados',
        litresNote: `${PESO_PINA} kg por piña · ${KG_POR_LITRO} kg por litro`,
        revenue: 'Ingreso bruto a precio de granel',
        revenueNote: `${mxn(PRECIO_GRANEL_MIN)}–${mxn(PRECIO_GRANEL_MAX)} por litro a granel`,
        net: 'Resultado neto estimado',
        roi: 'Retorno total del ciclo',
        roiNote: `Ciclo de ${ANOS} años`,
        disclaimer:
          'Son estimaciones, no una promesa de rendimiento. El resultado depende del suelo, la lluvia, el manejo y el mercado del mezcal al momento de la cosecha. Compartimos los supuestos para que los puedas cuestionar.',
      };

  return (
    <section id="calculadora" className="section-pad border-t border-border bg-paper-deep">
      <div className="container mx-auto">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 className="display-lg mt-4 text-ink">{c.title}</h2>
          <p className="lead mt-5">{c.lead}</p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="border-t border-ink/20 pt-6">
            <div className="flex items-baseline justify-between">
              <label htmlFor="plantas" className="text-sm font-medium text-ink">
                {c.plants}
              </label>
              <span className="font-display text-2xl text-ink">
                {plantas.toLocaleString('es-MX')}{' '}
                <span className="text-sm text-muted-foreground">({hectareas.toFixed(1)} ha)</span>
              </span>
            </div>
            <Slider
              id="plantas"
              className="mt-5"
              value={[plantas]}
              onValueChange={([v]) => setPlantas(v)}
              min={100}
              max={24000}
              step={100}
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>100</span>
              <span>24,000</span>
            </div>
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">{c.disclaimer}</p>
          </div>

          <div className="grid gap-px bg-border sm:grid-cols-2">
            {[
              { label: c.invest, value: mxn(inversion), note: c.investNote },
              {
                label: c.litres,
                value: `${Math.round(litros).toLocaleString('es-MX')} L`,
                note: c.litresNote,
              },
              { label: c.revenue, value: `${mxn(ingresoMin)} – ${mxn(ingresoMax)}`, note: c.revenueNote },
              { label: c.net, value: `${mxn(netoMin)} – ${mxn(netoMax)}`, note: '' },
              {
                label: c.roi,
                value: `${roiMin.toFixed(0)}% – ${roiMax.toFixed(0)}%`,
                note: c.roiNote,
              },
            ].map((k) => (
              <div key={k.label} className="bg-background p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{k.label}</p>
                <p className="mt-3 font-display text-2xl text-ink">{k.value}</p>
                {k.note && <p className="mt-2 text-xs text-muted-foreground">{k.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MezcalROI;
