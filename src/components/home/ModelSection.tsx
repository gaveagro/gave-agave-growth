import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Leaf, Beef, Droplets, Satellite } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/hooks/useLanguage';
import impacto from '@/assets/homepage/impacto-parcela.jpg.asset.json';
import moctezuma from '@/assets/homepage/moctezuma-silvopastoril.jpg.asset.json';
import tanchachin from '@/assets/homepage/tanchachin-parcela.jpg.asset.json';
import ebano from '@/assets/homepage/ebano-parcela.jpg.asset.json';

const ModelSection = () => {
  const language = useLanguage();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const layers =
    language === 'EN'
      ? [
          {
            icon: Leaf,
            key: 'agave',
            name: 'Agave and dryland species',
            claim: 'A multi-species cover that holds the soil while everything else recovers.',
            body:
              'Agave is the backbone — it grows where other crops fail, on poor, stony, drought-stressed soils, and its rows act as living terraces that stop erosion. Around it we establish mezquite (Prosopis spp.), nopal rastrero (Opuntia spp.), costilla de vaca (Atriplex canescens) and leucaena (Leucaena leucocephala), each doing a different job: nitrogen, shade, ground cover and browse.',
            stats: [
              ['0', 'irrigation required'],
              ['5+', 'species per hectare'],
              ['5–9 yr', 'agave cycle by species'],
            ],
            image: impacto.url,
          },
          {
            icon: Beef,
            key: 'livestock',
            name: 'Regenerative & rational livestock',
            claim: 'Animals as a soil tool, not as pressure on the land.',
            body:
              'Rational grazing (Voisin) between the rows: short, high-density rotations with long rest periods. Manure and hoof action rebuild organic matter and infiltration, Agave Salmiana leaves go back to the herd as fodder and silage, and the animals produce revenue during the years the agave is still maturing.',
            stats: [
              ['+OM', 'organic matter in topsoil'],
              ['Yearly', 'cash flow before harvest'],
              ['Silvopastoral', 'integrated system'],
            ],
            image: moctezuma.url,
          },
          {
            icon: Droplets,
            key: 'water',
            name: 'Water harvesting',
            claim: 'Every millimetre of rain stays on the ranch.',
            body:
              'Keylines, infiltration ditches, gabions and ponds designed on terrain models. Runoff is slowed, spread and sunk, recharging the profile instead of cutting gullies — the difference between a drought year that kills and one that is merely dry.',
            stats: [
              ['80%', 'less water vs conventional'],
              ['Runoff', 'converted to infiltration'],
              ['Ponds', 'for herd and nursery'],
            ],
            image: tanchachin.url,
          },
          {
            icon: Satellite,
            key: 'tech',
            name: 'Monitoring & MRV',
            claim: 'What is not measured cannot be certified.',
            body:
              'Satellite indices, field sampling and herd tracking feed a monitoring layer that documents biomass, cover and soil carbon over time. This is the evidence base that turns a good ranch into an issuable carbon project.',
            stats: [
              ['Satellite', 'biomass & cover'],
              ['Field', 'soil carbon sampling'],
              ['MRV', 'certification-ready'],
            ],
            image: ebano.url,
          },
        ]
      : [
          {
            icon: Leaf,
            key: 'agave',
            name: 'Agave y especies de zona árida',
            claim: 'Una cobertura multiespecie que sostiene el suelo mientras todo lo demás se recupera.',
            body:
              'El agave es la columna vertebral: crece donde otros cultivos fracasan, en suelos pobres, pedregosos y con estrés hídrico, y sus hileras funcionan como terrazas vivas que frenan la erosión. Alrededor establecemos mezquite (Prosopis spp.), nopal rastrero (Opuntia spp.), costilla de vaca (Atriplex canescens) y leucaena (Leucaena leucocephala), cada una con una función distinta: nitrógeno, sombra, cobertura de suelo y ramoneo.',
            stats: [
              ['0', 'riego requerido'],
              ['5+', 'especies por hectárea'],
              ['5–9 años', 'ciclo del agave según especie'],
            ],
            image: impacto.url,
          },
          {
            icon: Beef,
            key: 'livestock',
            name: 'Ganadería regenerativa y racional',
            claim: 'El ganado como herramienta de suelo, no como presión sobre la tierra.',
            body:
              'Ganadería racional (pastoreo racional Voisin) entre las hileras: rotaciones cortas de alta densidad con descansos largos. El estiércol y el pisoteo reconstruyen materia orgánica e infiltración, las hojas de agave Salmiana regresan al hato como forraje y ensilado, y los animales generan ingresos durante los años en que el agave todavía madura.',
            stats: [
              ['+MO', 'materia orgánica en la capa fértil'],
              ['Anual', 'flujo antes de la cosecha'],
              ['Agrosilvopastoril', 'sistema integrado'],
            ],
            image: moctezuma.url,
          },
          {
            icon: Droplets,
            key: 'water',
            name: 'Cosecha de agua',
            claim: 'Cada milímetro de lluvia se queda en el rancho.',
            body:
              'Keylines, zanjas de infiltración, gaviones y bordos diseñados sobre modelos de terreno. El escurrimiento se frena, se reparte y se infiltra, recargando el perfil en lugar de abrir cárcavas — la diferencia entre un año de sequía que mata y uno que solamente es seco.',
            stats: [
              ['80%', 'menos agua vs convencional'],
              ['Escurrimiento', 'convertido en infiltración'],
              ['Bordos', 'para hato y vivero'],
            ],
            image: tanchachin.url,
          },
          {
            icon: Satellite,
            key: 'tech',
            name: 'Monitoreo y MRV',
            claim: 'Lo que no se mide no se puede certificar.',
            body:
              'Índices satelitales, muestreo en campo y trazabilidad del hato alimentan una capa de monitoreo que documenta biomasa, cobertura y carbono en suelo a lo largo del tiempo. Ésa es la evidencia que convierte un buen rancho en un proyecto de carbono emisible.',
            stats: [
              ['Satelital', 'biomasa y cobertura'],
              ['Campo', 'muestreo de carbono en suelo'],
              ['MRV', 'listo para certificar'],
            ],
            image: ebano.url,
          },
        ];

  const heading =
    language === 'EN'
      ? { eyebrow: 'The Gavé model', title: 'Four layers on the same hectare' }
      : { eyebrow: 'El modelo Gavé', title: 'Cuatro capas sobre la misma hectárea' };

  const current = layers[active];

  return (
    <section id="modelo" className="section-pad bg-background">
      <div className="container mx-auto">
        <Reveal>
          <p className="eyebrow">{heading.eyebrow}</p>
          <h2 className="display-lg mt-4 max-w-3xl text-ink">{heading.title}</h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="border-t border-border">
            {layers.map((l, i) => {
              const isActive = i === active;
              return (
                <button
                  key={l.key}
                  onClick={() => setActive(i)}
                  className="relative w-full border-b border-border py-5 text-left"
                  aria-expanded={isActive}
                >
                  {isActive && !reduce && (
                    <motion.span
                      layoutId="model-active"
                      className="absolute inset-y-0 left-0 w-[3px] bg-accent"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  <div className="flex items-center gap-4 pl-5">
                    <l.icon
                      className={`h-5 w-5 shrink-0 ${isActive ? 'text-ink' : 'text-muted-foreground'}`}
                      strokeWidth={1.5}
                    />
                    <span
                      className={`font-display text-lg transition-colors md:text-xl ${
                        isActive ? 'text-ink' : 'text-muted-foreground'
                      }`}
                    >
                      {l.name}
                    </span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden pl-14 pr-2"
                      >
                        <p className="pt-3 font-display text-base text-ink/80">{l.claim}</p>
                        <p className="pt-3 text-sm leading-relaxed text-muted-foreground">{l.body}</p>
                        <div className="flex flex-wrap gap-x-8 gap-y-3 pt-5">
                          {l.stats.map(([v, k]) => (
                            <div key={k}>
                              <p className="font-display text-xl text-ink">{v}</p>
                              <p className="text-xs text-muted-foreground">{k}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[320px] overflow-hidden bg-paper-deep lg:min-h-[520px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.key}
                src={current.image}
                alt={current.name}
                loading="lazy"
                decoding="async"
                initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-deep/90 to-transparent p-6">
              <p className="font-display text-lg text-paper">{current.name}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelSection;
