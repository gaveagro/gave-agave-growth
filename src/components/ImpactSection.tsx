import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Sprout, Droplets, Users, Quote } from 'lucide-react';

const ImpactSection = () => {
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

  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch('/content/impact.json')
      .then(response => response.json())
      .then(data => setContent(data))
      .catch(error => console.error('Error loading impact content:', error));
  }, []);

  if (!content) return null;

  const currentContent = content[language.toLowerCase() as keyof typeof content];
  if (!currentContent) return null;

  return (
    <section className="py-24 bg-gave-sand/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gave-green">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Impact Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {currentContent.impactAreas.map((area, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-gave-green/20">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gave-green/10 rounded-full flex items-center justify-center">
                  {area.icon === 'Leaf' && <Leaf className="w-8 h-8 text-gave-green" />}
                  {area.icon === 'Sprout' && <Sprout className="w-8 h-8 text-gave-green" />}
                  {area.icon === 'Droplets' && <Droplets className="w-8 h-8 text-gave-green" />}
                  {area.icon === 'Users' && <Users className="w-8 h-8 text-gave-green" />}
                </div>
                <CardTitle className="text-xl text-gave-green">{area.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gave-yellow">{area.metric}</span>
                  {area.unit && <p className="text-sm text-muted-foreground mt-1">{area.unit}</p>}
                </div>
                <p className="text-muted-foreground text-sm">{area.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Climate Resilience Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold mb-6 text-gave-green">
              {currentContent.resilienceTitle}
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              {currentContent.resilienceSubtitle}
            </p>
            
            <div className="space-y-4">
              {currentContent.resiliencePoints.map((point, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gave-yellow rounded-full flex-shrink-0"></div>
                  <span className="text-muted-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="/lovable-uploads/97c0e0e2-e0c1-4f24-bdc0-bc91513df0d4.png" 
              alt="Climate Resilience - Agave Farm"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>

        {/* Quote Section */}
        <Card className="max-w-4xl mx-auto bg-gave-green/5 border-gave-green/20">
          <CardContent className="p-8 text-center">
            <Quote className="w-12 h-12 text-gave-green/30 mx-auto mb-6" />
            <blockquote className="text-xl italic text-muted-foreground mb-6">
              "{currentContent.carbonQuote}"
            </blockquote>
            <cite className="text-gave-green font-semibold">
              — {currentContent.carbonAuthor}
            </cite>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ImpactSection;
