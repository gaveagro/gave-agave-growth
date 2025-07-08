import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, BarChart3 } from 'lucide-react';
import InvestmentModal from './InvestmentModal';

const OurFarms = () => {
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
      title: 'Our Agave Plots',
      subtitle: 'Explore our sustainable agave cultivation sites across San Luis Potosí, México',
      location: 'Location',
      farmStats: 'Farm Statistics',
      monitoring: 'Access Monitoring',
      visitFarm: 'Visit Farm',
      registerToView: 'Register to access real-time monitoring'
    },
    ES: {
      title: 'Nuestras Parcelas de Agave',
      subtitle: 'Explora nuestros sitios de cultivo sustentable de agave en San Luis Potosí, México',
      location: 'Ubicación',
      farmStats: 'Estadísticas de la Granja',
      monitoring: 'Acceder a Monitoreo',
      visitFarm: 'Visitar Granja',
      registerToView: 'Regístrate para acceder al monitoreo en tiempo real'
    }
  };

  const farms = [
    {
      id: 1,
      name: 'Tanchachin - Espadín',
      nameEN: 'Tanchachin - Espadín',
      location: 'Aquismon, San Luis Potosí, México',
      species: ['Agave angustifolia Haw (Espadín)'],
      image: '/lovable-uploads/6de61ebc-0cfe-453b-91d7-b052959dcdf0.png',
      established: '2021'
    },
    {
      id: 2,
      name: 'Ébano - Espadín',
      nameEN: 'Ébano - Espadín',
      location: 'Ébano, San Luis Potosí, México',
      species: ['Agave Angustifolia Haw (Espadín)'],
      image: '/lovable-uploads/fd85781d-f73a-46c5-a5cd-2b189f1f44f4.png',
      established: '2023'
    },
    {
      id: 3,
      name: 'Moctezuma - Salmiana (modelo agrosilvopastoril)',
      nameEN: 'Moctezuma - Salmiana (agrosilvopastoral model)',
      location: 'Moctezuma, San Luis Potosí, México',
      species: ['Agave Salmiana ssp. crassispina (mixed with native grasses and mezquite trees)'],
      image: '/lovable-uploads/3fb33fbb-048e-4438-adf3-0b9eb5f68ee1.png',
      established: '2022'
    }
  ];

  const currentContent = content[language as keyof typeof content];

  return (
    <section id="farms" className="py-20 bg-gave-sand/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gave-green">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {farms.map((farm) => (
            <Card key={farm.id} className="hover:shadow-xl transition-all duration-300 overflow-hidden border-gave-green/20">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={farm.image} 
                  alt={language === 'EN' ? farm.nameEN : farm.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-gave-green/10 text-gave-green px-3 py-1 rounded-full text-sm">
                    {language === 'EN' ? 'Est.' : 'Est.'} {farm.established}
                  </span>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{farm.location}</span>
                  </div>
                </div>
                <CardTitle className="text-lg text-gave-green">
                  {language === 'EN' ? farm.nameEN : farm.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">{language === 'EN' ? 'Species:' : 'Especies:'}</h4>
                  <div className="flex flex-wrap gap-1">
                    {farm.species.map((species, index) => (
                      <span key={index} className="bg-gave-natural/10 text-gave-natural text-xs px-2 py-1 rounded">
                        {species}
                      </span>
                    ))}
                  </div>
                </div>


                <div className="space-y-2">
                  <InvestmentModal>
                    <Button size="sm" className="w-full bg-gave-green hover:bg-gave-green/90">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      {currentContent.monitoring}
                    </Button>
                  </InvestmentModal>
                  <p className="text-xs text-muted-foreground text-center">
                    {currentContent.registerToView}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurFarms;
