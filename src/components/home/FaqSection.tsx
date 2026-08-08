import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/hooks/useLanguage';
import InvestmentModal from '@/components/InvestmentModal';

type Group = { id: string; label: string; items: { q: string; a: string }[] };

export const groupsES: Group[] = [
  {
    id: 'impacto',
    label: 'Inversión de impacto',
    items: [
      {
        q: '¿Qué se financia exactamente?',
        a: 'Sistemas agroforestales y agrosilvopastoriles en tierras áridas y degradadas: establecimiento de agave, obras de cosecha de agua, integración de ganadería regenerativa con pastoreo planificado y la capa de monitoreo y de campo. El activo no es una plantación aislada, es un rancho con un plan de manejo y un sistema de medición.',
      },
      {
        q: '¿Cómo se estructura el retorno?',
        a: 'Combinamos tres fuentes: la venta de biomasa de agave al final del ciclo, los ingresos anuales de la ganadería durante el periodo de maduración, y los bonos ambientales que el proyecto pueda emitir una vez certificado. Esa diversificación es precisamente lo que reduce la dependencia del precio spot del agave.',
      },
      {
        q: '¿Qué evidencia de impacto entregan?',
        a: 'Línea base de suelo y cobertura, monitoreo, muestreo de carbono en campo y reportes periódicos. Todo queda como registro auditable, pensado desde el inicio para pasar validación y verificación de terceros.',
      },
      {
        q: '¿Trabajan con fondos, ONGs y gobiernos fuera de México?',
        a: 'Sí. El proyecto está en México, pero la estructura de financiamiento y reporte está diseñada para contrapartes internacionales. Podemos adaptar formatos de reporte a los marcos que ya utilices.',
      },
    ],
  },
  {
    id: 'bonos',
    label: 'Bonos de carbono',
    items: [
      {
        q: 'Tengo un rancho en zona árida, ¿aplica? ¿Cuál es la superficie mínima?',
        a: 'No manejamos un mínimo rígido de hectáreas: evaluamos cada rancho caso por caso. El perfil que buscamos es zona árida o semiárida con historial de sobrepastoreo o degradación y tenencia clara, sin importar el estado ni el país, porque ahí el potencial de captura adicional es mayor y la línea base juega a favor del proyecto.',
      },
      {
        q: '¿Qué pone Gavé y qué pone el dueño del rancho?',
        a: 'El dueño pone la tierra y la operación. Gavé pone el diseño del sistema, el plan de pastoreo, las obras de agua, la capa de MRV y el acompañamiento con el organismo certificador. Gavé trabaja por comisión sobre los bonos generados.',
      },
      {
        q: '¿Qué tipo de bonos se pueden emitir?',
        a: 'Principalmente carbono por remoción y por suelo, y esquemas de ganadería regenerativa aplicables a zonas áridas. La metodología final depende del diagnóstico de línea base y del mercado objetivo del proyecto.',
      },
      {
        q: '¿Cuánto tarda el proceso?',
        a: 'La línea base y el diseño toman los primeros meses; la validación y las primeras verificaciones dependen del organismo y de la metodología. Es un proceso de años, no de semanas — por eso la medición debe arrancar desde el primer día.',
      },
    ],
  },
  {
    id: 'vivero',
    label: 'Vivero y planta',
    items: [
      {
        q: '¿Qué especies manejan?',
        a: 'Agave Angustifolia Haw (Espadín) para abasto mezcalero en regiones con Denominación de Origen, y Agave Salmiana, la especie de referencia para reforestar y regenerar zonas áridas.',
      },
      {
        q: '¿Cómo se cotiza la planta?',
        a: 'Los hijuelos de Espadín se venden a $1 MXN por centímetro de altura de la planta. En la práctica, un pedido trae plantas de 20 a 30 cm y se promedia la altura del lote para fijar el precio por planta.',
      },
      {
        q: '¿Qué suelo necesita?',
        a: 'Se adapta muy bien a suelos pobres y pedregosos. Su principal nutriente es el calcio, además de los macronutrientes, así que los terrenos calizos son una ventaja. Es una excelente opción para descansar tierras cansadas por monocultivo, por ejemplo después de años de caña.',
      },
      {
        q: '¿Requiere riego?',
        a: 'No. Es un cultivo de temporal con alta tolerancia a la sequía, lo que lo vuelve una alternativa realista donde el riego ya no es viable o es demasiado caro.',
      },
    ],
  },
  {
    id: 'crowdgrowing',
    label: 'Crowdgrowing',
    items: [
      {
        q: 'He leído noticias sobre los precios bajos del agave. ¿Sigue teniendo sentido?',
        a: 'Es una pregunta honesta y la respuesta también: el precio del kilo de agave es cíclico y hoy está en la parte baja del ciclo, después de una sobreoferta de plantación. Por eso Gavé dejó de ser una apuesta a un solo precio: el modelo actual combina biomasa, ganadería, servicios de vivero y bonos ambientales. Quien entra hoy al ciclo de siembra llega a cosecha en 5 a 7 años, es decir, en otro punto del ciclo de precios.',
      },
      {
        q: '¿Sigue abierto el modelo de crowdgrowing?',
        a: 'Sí, sigue abierto para quien quiera adquirir plantas bajo ese esquema, pero ya no es la única ni la principal vía de trabajo con Gavé. Puedes revisar el detalle y el simulador en la sección de crowdgrowing.',
      },
      {
        q: '¿Cómo doy seguimiento a mis plantas?',
        a: 'A través de la plataforma de monitoreo en dashboard.gaveagro.com, con reportes de avance e imágenes satelitales. Los inversionistas también pueden visitar las parcelas.',
      },
    ],
  },
];

const groupsEN: Group[] = [
  {
    id: 'impacto',
    label: 'Impact investment',
    items: [
      {
        q: 'What exactly is being funded?',
        a: 'Agroforestry and silvopastoral systems on arid and degraded land: agave establishment, water harvesting works, regenerative livestock with planned grazing, and the satellite plus field monitoring layer. The asset is not a standalone plantation, it is a ranch with a management plan and a measurement system.',
      },
      {
        q: 'How is the return structured?',
        a: 'Three sources: agave biomass at the end of the cycle, annual livestock revenue during the maturing years, and environmental credits once the project is certified. That diversification is exactly what reduces exposure to the agave spot price.',
      },
      {
        q: 'What impact evidence do you deliver?',
        a: 'Soil and cover baseline, satellite monitoring on a fixed calendar, field carbon sampling and periodic reporting — kept as an auditable record built from day one for third-party validation and verification.',
      },
      {
        q: 'Do you work with funds, NGOs and governments outside Mexico?',
        a: 'Yes. The project sits in Mexico, but the funding and reporting structure is designed for international counterparties, and we can align reporting to the frameworks you already use.',
      },
    ],
  },
  {
    id: 'bonos',
    label: 'Carbon credits',
    items: [
      {
        q: 'I own a ranch in an arid zone. Does it qualify? Is there a minimum size?',
        a: 'There is no rigid hectare minimum — we assess each ranch case by case. The profile we look for is arid or semi-arid land with a history of overgrazing or degradation and clear tenure, in any state or country, because that is where additional capture potential is highest and where the baseline works in the project’s favour.',
      },
      {
        q: 'What does Gavé bring and what does the owner bring?',
        a: 'The owner brings land and operations. Gavé brings system design, grazing plan, water works, the MRV layer and the process with the certification body. Gavé works on commission over the credits generated.',
      },
      {
        q: 'Which credits can be issued?',
        a: 'Mainly removal and soil carbon, plus regenerative livestock schemes applicable to arid zones. The final methodology depends on the baseline diagnosis and the project’s target market.',
      },
      {
        q: 'How long does it take?',
        a: 'Baseline and design take the first months; validation and first verifications depend on the body and methodology. It is a multi-year process — which is why measurement has to start on day one.',
      },
    ],
  },
  {
    id: 'vivero',
    label: 'Nursery & plants',
    items: [
      {
        q: 'Which species do you grow?',
        a: 'Agave Angustifolia Haw (Espadín) for mezcal supply in Denomination of Origin regions, and Agave Salmiana, the reference species for reforesting and regenerating arid land.',
      },
      {
        q: 'How are plants priced?',
        a: 'Espadín pups are sold at $1 MXN per centimetre of plant height. In practice an order carries plants of 20 to 30 cm and the lot average sets the price per plant.',
      },
      {
        q: 'What soil does it need?',
        a: 'It adapts very well to poor and stony soils. Its main nutrient is calcium beyond the macronutrients, so limestone ground is an advantage. It is an excellent way to rest land exhausted by monoculture, for example after years of sugarcane.',
      },
      {
        q: 'Does it need irrigation?',
        a: 'No. It is a rainfed crop with high drought tolerance, which makes it a realistic alternative where irrigation is no longer viable or affordable.',
      },
    ],
  },
  {
    id: 'crowdgrowing',
    label: 'Crowdgrowing',
    items: [
      {
        q: 'I read news about low agave prices. Does this still make sense?',
        a: 'Fair question, honest answer: the price per kilo is cyclical and is currently in the low part of the cycle after a planting oversupply. That is why Gavé is no longer a bet on a single price: the model now combines biomass, livestock, nursery services and environmental credits. Anyone planting today harvests in 5 to 7 years, at a different point of the price cycle.',
      },
      {
        q: 'Is crowdgrowing still open?',
        a: 'Yes, it remains open for those who want to acquire plants under that scheme, but it is no longer the only or the main way to work with Gavé. Details and the simulator live in the crowdgrowing section.',
      },
      {
        q: 'How do I follow my plants?',
        a: 'Through the monitoring platform at dashboard.gaveagro.com, with progress reports and satellite imagery. Investors can also visit the parcels.',
      },
    ],
  },
];

const FaqSection = () => {
  const language = useLanguage();
  const groups = language === 'EN' ? groupsEN : groupsES;
  const [active, setActive] = useState(groups[0].id);
  const current = groups.find((g) => g.id === active) ?? groups[0];

  const c =
    language === 'EN'
      ? { eyebrow: 'FAQ', title: 'Answers by audience', cta: 'Ask us directly →' }
      : { eyebrow: 'Preguntas frecuentes', title: 'Respuestas por tipo de contraparte', cta: 'Pregúntanos directamente →' };

  return (
    <section id="faq" className="section-pad border-t border-border bg-paper-deep">
      <div className="container mx-auto">
        <Reveal>
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 className="display-lg mt-4 text-ink">{c.title}</h2>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          {groups.map((g) => (
            <button
              key={g.id}
              onClick={() => setActive(g.id)}
              className={`border px-4 py-2 text-sm transition-colors ${
                g.id === active
                  ? 'border-ink bg-ink text-paper'
                  : 'border-border bg-background text-muted-foreground hover:border-ink hover:text-ink'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        <div className="mt-8 max-w-3xl">
          <Accordion type="single" collapsible className="border-t border-border">
            {current.items.map((f, i) => (
              <AccordionItem key={i} value={`${current.id}-${i}`} className="border-b border-border">
                <AccordionTrigger className="text-left font-display text-lg text-ink hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <InvestmentModal>
            <button className="mt-8 text-sm font-medium text-ink underline underline-offset-4 hover:text-accent">
              {c.cta}
            </button>
          </InvestmentModal>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
