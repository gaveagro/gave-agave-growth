import { useLanguage } from '@/hooks/useLanguage';

// Static figures on purpose: no animated counters, so they read right in link previews and screenshots.
const FactsBar = () => {
  const en = useLanguage() === 'EN';
  const facts = en
    ? [
        { value: '~500 ha', label: 'of agave under management in San Luis Potosí' },
        { value: '50', label: 'partner families' },
        { value: '2', label: 'regions: Huasteca and Altiplano potosino' },
        { value: '6+', label: 'agave species grown' },
      ]
    : [
        { value: '~500 ha', label: 'de agave bajo manejo en San Luis Potosí' },
        { value: '50', label: 'familias socias' },
        { value: '2', label: 'regiones: Huasteca y Altiplano potosino' },
        { value: '6+', label: 'especies de agave cultivadas' },
      ];

  return (
    <section className="border-b border-border bg-paper-deep">
      <div className="container mx-auto">
        <dl className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-border">
          {facts.map((f) => (
            <div key={f.label} className="border-b border-border px-2 py-8 md:border-b-0 md:px-8">
              <dt className="sr-only">{f.label}</dt>
              <dd className="stat-num text-ink">{f.value}</dd>
              <dd className="mt-2 text-sm text-muted-foreground">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default FactsBar;
