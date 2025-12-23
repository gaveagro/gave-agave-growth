import { useState, useEffect } from 'react';
import { Dna, Fuel, TreeDeciduous, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const InnovationSection = () => {
  const [language, setLanguage] = useState('ES');

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    if (typeof window !== 'undefined' && (window as any).currentLanguage) {
      setLanguage((window as any).currentLanguage);
    }

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
  }, []);

  const content = {
    EN: {
      sectionTitle: 'Innovation & Development',
      headline: 'Building the Future of Regenerative Agroindustry',
      intro: "While operating our crowdgrowing model, we are developing structural capabilities that will expand Gavé's impact and scale in the long term.",
      disclaimer: 'These lines are in active exploration and validation with strategic partners.',
      lines: [
        {
          icon: Dna,
          title: 'Agave Genetics & Micropropagation',
          description: 'We research in-vitro propagation techniques and genetic selection to preserve native varieties, improve climate resilience, and establish traceability from seed to harvest.',
          focus: ['biodiversity', 'climate adaptation', 'molecular traceability']
        },
        {
          icon: Fuel,
          title: 'Sustainable Aviation Fuel (SAF)',
          description: "We explore agave's potential as a feedstock for SAF. Its ability to grow in arid zones without competing with food crops positions it as a promising alternative for aviation decarbonization.",
          focus: ['arid lands', 'non-food competing', 'integrated value chain']
        },
        {
          icon: TreeDeciduous,
          title: 'Carbon Credits & Environmental Metrics',
          description: 'We develop measurement, reporting, and verification (MRV) methodologies to quantify the environmental impact of our regenerative systems. This includes carbon sequestration, soil restoration, and biodiversity.',
          focus: ['integrated MRV', 'silvopastoral systems', 'impact certification']
        }
      ],
      closingMessage: "Our crowdgrowing model is Gavé's operational present. These capabilities represent the future we are building.",
      cta: 'Interested in collaborating?',
      ctaButton: 'Contact us'
    },
    ES: {
      sectionTitle: 'Innovación & Desarrollo',
      headline: 'Construyendo el Futuro de la Agroindustria Regenerativa',
      intro: 'Mientras operamos nuestro modelo de crowdgrowing, desarrollamos capacidades estructurales que ampliarán el impacto y la escala de Gavé en el largo plazo.',
      disclaimer: 'Estas líneas están en exploración y validación activa con socios estratégicos.',
      lines: [
        {
          icon: Dna,
          title: 'Genética y Micropropagación de Agave',
          description: 'Investigamos técnicas de propagación in-vitro y selección genética para preservar variedades nativas, mejorar resiliencia climática y establecer trazabilidad desde la semilla hasta la cosecha.',
          focus: ['biodiversidad', 'adaptación climática', 'trazabilidad molecular']
        },
        {
          icon: Fuel,
          title: 'Combustible Sostenible de Aviación (SAF)',
          description: 'Exploramos el potencial del agave como materia prima para SAF. Su capacidad de crecer en zonas áridas sin competir con cultivos alimentarios lo posiciona como una alternativa prometedora para la descarbonización del transporte aéreo.',
          focus: ['zonas áridas', 'no compite con alimentos', 'cadena de valor integrada']
        },
        {
          icon: TreeDeciduous,
          title: 'Créditos de Carbono y Métricas Ambientales',
          description: 'Desarrollamos metodologías de medición, reporte y verificación (MRV) para cuantificar el impacto ambiental de nuestros sistemas regenerativos. Esto incluye captura de carbono, restauración de suelo y biodiversidad.',
          focus: ['MRV integrado', 'sistemas agrosilvopastoriles', 'certificación de impacto']
        }
      ],
      closingMessage: 'Nuestro modelo de crowdgrowing es el presente operativo de Gavé. Estas capacidades representan el futuro que estamos construyendo.',
      cta: '¿Interesado en colaborar?',
      ctaButton: 'Contáctanos'
    }
  };

  const currentContent = content[language as keyof typeof content];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="innovation" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase mb-4 block">
            {currentContent.sectionTitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {currentContent.headline}
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            {currentContent.intro}
          </p>
          <p className="text-sm text-muted-foreground italic">
            {currentContent.disclaimer}
          </p>
        </div>

        {/* Innovation Lines Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {currentContent.lines.map((line, index) => {
            const IconComponent = line.icon;
            return (
              <Card key={index} className="border border-border/50 bg-background shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 inline-block">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {line.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {line.description}
                  </p>

                  {/* Focus Tags */}
                  <div className="flex flex-wrap gap-2">
                    {line.focus.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Closing Message */}
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-muted-foreground italic mb-6">
            {currentContent.closingMessage}
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className="text-foreground font-medium">
              {currentContent.cta}
            </span>
            <Button
              onClick={scrollToContact}
              variant="outline"
              className="group"
            >
              {currentContent.ctaButton}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
