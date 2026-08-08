import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AgaveMarket = () => {
  const [language, setLanguage] = useState(() => {
    return (typeof window !== 'undefined' && (window as any).currentLanguage) || 'ES';
  });
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    
    const currentLang = (window as any).currentLanguage;
    if (currentLang && currentLang !== language) {
      setLanguage(currentLang);
    }
    
    // Load content
    fetch('/content/agave-market.json')
      .then(response => response.json())
      .then(data => setContent(data))
      .catch(error => console.error('Error loading agave market content:', error));

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, [language]);

  if (!content) return null;

  const currentContent = content[language.toLowerCase()] || content?.es;

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

        {/* Market grid layout without central overlap */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {currentContent.markets.map((market: any, index: number) => (
            <Card key={index} className="bg-card hover:shadow-lg transition-shadow duration-300 relative">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{market.icon}</div>
                <h3 className="font-semibold text-card-foreground mb-3 text-lg">
                  {market.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {market.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Central agave plant - positioned separately */}
        <div className="flex justify-center mt-8">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <div className="text-3xl">🌱</div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            {language.toLowerCase() === 'es' 
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