import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AgaveMarket = () => {
  const [language, setLanguage] = useState('es');
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const handleLanguageChange = (event: any) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    
    // Load content
    fetch('/content/agave-market.json')
      .then(response => response.json())
      .then(data => setContent(data))
      .catch(error => console.error('Error loading agave market content:', error));

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  if (!content) return null;

  const currentContent = content[language] || content.es;

  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
          <p className="text-muted-foreground max-w-4xl mx-auto">
            {currentContent.description}
          </p>
        </div>

        {/* Central Agave with surrounding markets */}
        <div className="relative flex items-center justify-center min-h-[500px]">
          {/* Central agave plant */}
          <div className="absolute z-10 w-32 h-32 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <div className="text-4xl">🌱</div>
          </div>

          {/* Surrounding market cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {currentContent.markets.map((market: any, index: number) => (
              <Card key={index} className="relative bg-card hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{market.icon}</div>
                  <h3 className="font-semibold text-card-foreground mb-2">
                    {market.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {market.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            {language === 'es' 
              ? 'Diversificación que reduce riesgos y maximiza oportunidades'
              : 'Diversification that reduces risks and maximizes opportunities'
            }
          </p>
        </div>
      </div>
    </section>
  );
};

export default AgaveMarket;