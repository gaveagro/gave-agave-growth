
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Camera, BarChart3 } from 'lucide-react';

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
      title: 'Our Agave Farms',
      subtitle: 'Explore our sustainable agave cultivation sites across San Luis Potosí, México',
      viewAll: 'View All Farms',
      location: 'Location',
      farmStats: 'Farm Statistics',
      tours: 'Virtual Tours Available',
      monitoring: 'Real-time Monitoring',
      visitFarm: 'Visit Farm'
    },
    ES: {
      title: 'Nuestras Granjas de Agave',
      subtitle: 'Explora nuestros sitios de cultivo sustentable de agave en San Luis Potosí, México',
      viewAll: 'Ver Todas las Granjas',
      location: 'Ubicación',
      farmStats: 'Estadísticas de la Granja',
      tours: 'Tours Virtuales Disponibles',
      monitoring: 'Monitoreo en Tiempo Real',
      visitFarm: 'Visitar Granja'
    }
  };

  const farms = [
    {
      id: 1,
      name: 'Granja Principal - Espadín',
      nameEN: 'Main Farm - Espadín',
      location: 'San Luis Potosí, México',
      species: ['Agave Angustifolia (Espadín)'],
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&fit=crop&crop=center',
      established: '2019',
      features: ['Irrigation System', 'Soil Analysis', 'Drone Monitoring']
    },
    {
      id: 2,
      name: 'Granja Salmiana - Modelo Agrosilvopastoril',
      nameEN: 'Salmiana Farm - Agrosilvopastoral Model',
      location: 'San Luis Potosí, México',
      species: ['Agave Salmiana', 'Mezquite Trees', 'Native Grasses'],
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop&crop=center',
      established: '2020',
      features: ['Biodiversity Conservation', 'Carbon Sequestration', 'Native Species']
    },
    {
      id: 3,
      name: 'Granja Experimental',
      nameEN: 'Experimental Farm',
      location: 'San Luis Potosí, México',
      species: ['Mixed Agave Species', 'Research Plots'],
      image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop&crop=center',
      established: '2021',
      features: ['Research & Development', 'New Species Testing', 'Climate Studies']
    }
  ];

  const currentContent = content[language as keyof typeof content];

  return (
    <section id="farms" className="py-20 bg-gave-sand/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gave-blue">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {farms.map((farm) => (
            <Card key={farm.id} className="hover:shadow-xl transition-all duration-300 overflow-hidden border-gave-blue/20">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={farm.image} 
                  alt={language === 'EN' ? farm.nameEN : farm.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-gave-blue/10 text-gave-blue px-3 py-1 rounded-full text-sm">
                    {language === 'EN' ? 'Est.' : 'Est.'} {farm.established}
                  </span>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{farm.location}</span>
                  </div>
                </div>
                <CardTitle className="text-lg text-gave-blue">
                  {language === 'EN' ? farm.nameEN : farm.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">{language === 'EN' ? 'Species:' : 'Especies:'}</h4>
                  <div className="flex flex-wrap gap-1">
                    {farm.species.map((species, index) => (
                      <span key={index} className="bg-gave-green/10 text-gave-green text-xs px-2 py-1 rounded">
                        {species}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {farm.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-gave-yellow rounded-full mr-2"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 border-gave-blue text-gave-blue hover:bg-gave-blue hover:text-white">
                    <Camera className="w-4 h-4 mr-1" />
                    {currentContent.tours}
                  </Button>
                  <Button size="sm" className="flex-1 bg-gave-blue hover:bg-gave-blue/90">
                    <BarChart3 className="w-4 h-4 mr-1" />
                    {currentContent.monitoring}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gave-blue hover:bg-gave-blue/90 px-8">
            {currentContent.viewAll}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OurFarms;
