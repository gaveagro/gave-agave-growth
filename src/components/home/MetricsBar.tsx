import { Counter } from '@/components/motion/Reveal';
import { useLanguage } from '@/hooks/useLanguage';

const MetricsBar = () => {
  const language = useLanguage();

  const metrics =
    language === 'EN'
      ? [
          { value: 500, suffix: '+', label: 'hectares under restoration' },
          { value: 30, suffix: '–60', label: 'tCO₂e captured per ha / year' },
          { value: 1.2, decimals: 1, suffix: 'M', label: 'nursery plants capacity' },
          { value: 80, suffix: '%', label: 'less water than conventional crops' },
        ]
      : [
          { value: 500, suffix: '+', label: 'hectáreas en restauración' },
          { value: 30, suffix: '–60', label: 'tCO₂e capturadas por ha / año' },
          { value: 1.2, decimals: 1, suffix: 'M', label: 'capacidad de planta en vivero' },
          { value: 80, suffix: '%', label: 'menos agua que cultivos convencionales' },
        ];

  return (
    <section className="border-y border-border bg-paper-deep">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x">
          {metrics.map((m, i) => (
            <div key={i} className="border-b border-border px-2 py-8 md:border-b-0 md:px-8">
              <p className="stat-num text-ink">
                <Counter value={m.value} decimals={(m as any).decimals ?? 0} suffix={m.suffix} />
              </p>
              <p className="mt-2 text-xs uppercase leading-relaxed tracking-wide text-muted-foreground md:text-sm md:normal-case md:tracking-normal">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsBar;
