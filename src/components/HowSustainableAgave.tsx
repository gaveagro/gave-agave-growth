
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Clock, TrendingUp, DollarSign } from 'lucide-react';

const HowSustainableAgave = () => {
  const [language, setLanguage] = useState(() => {
    return (window as any).currentLanguage || 'EN';
  });

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    
    const currentLang = (window as any).currentLanguage;
    if (currentLang && currentLang !== language) {
      setLanguage(currentLang);
    }

    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
  }, [language]);

  const content = {
    EN: {
      title: 'How Sustainable Agave Investment Works',
      subtitle: 'Regenerative agriculture that restores land while generating returns',
      steps: [
        {
          icon: <Leaf className="w-8 h-8" />,
          title: 'Plant & Restore',
          description: 'We plant agave in degraded lands using regenerative practices that rebuild soil health and biodiversity.',
          timeline: 'Year 1'
        },
        {
          icon: <Clock className="w-8 h-8" />,
          title: 'Grow & Regenerate',
          description: 'Agave grows while restoring the ecosystem - sequestering carbon, improving water cycles, and enhancing biodiversity.',
          timeline: '5-9 Years'
        },
        {
          icon: <TrendingUp className="w-8 h-8" />,
          title: 'Harvest & Scale',
          description: 'At maturity, agave is harvested for multiple markets while the restored land continues producing environmental benefits.',
          timeline: 'Harvest'
        },
        {
          icon: <DollarSign className="w-8 h-8" />,
          title: 'Returns & Impact',
          description: 'Investors receive profitable returns while having created lasting environmental impact and ecosystem restoration.',
          timeline: 'Long-term'
        }
      ]
    },
    ES: {
      title: 'Cómo Funciona la Inversión en Agave Sustentable',
      subtitle: 'Agricultura regenerativa que restaura la tierra mientras genera retornos',
      steps: [
        {
          icon: <Leaf className="w-8 h-8" />,
          title: 'Plantar y Restaurar',
          description: 'Plantamos agave en tierras degradadas usando prácticas regenerativas que reconstruyen la salud del suelo y la biodiversidad.',
          timeline: 'Año 1'
        },
        {
          icon: <Clock className="w-8 h-8" />,
          title: 'Crecer y Regenerar',
          description: 'El agave crece mientras restaura el ecosistema - capturando carbono, mejorando ciclos de agua, y aumentando biodiversidad.',
          timeline: '5-9 Años'
        },
        {
          icon: <TrendingUp className="w-8 h-8" />,
          title: 'Cosechar y Escalar',
          description: 'En la madurez, el agave se cosecha para múltiples mercados mientras la tierra restaurada continúa produciendo beneficios ambientales.',
          timeline: 'Cosecha'
        },
        {
          icon: <DollarSign className="w-8 h-8" />,
          title: 'Retornos e Impacto',
          description: 'Los inversionistas reciben retornos rentables mientras han creado impacto ambiental duradero y restauración de ecosistemas.',
          timeline: 'Largo plazo'
        }
      ]
    }
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gave-green">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.steps.map((step, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-gave-green/20 hover:border-gave-green/40">
                <CardHeader className="pb-4">
                  <div className="text-gave-green mb-4 flex justify-center">
                    {step.icon}
                  </div>
                  <div className="text-sm font-semibold text-gave-yellow mb-2">
                    {step.timeline}
                  </div>
                  <CardTitle className="text-xl text-gave-green">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowSustainableAgave;
