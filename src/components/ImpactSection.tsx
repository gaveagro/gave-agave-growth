
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ImpactSection = () => {
  const [language, setLanguage] = useState('EN');

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
  }, []);

  const content = {
    EN: {
      title: 'Regenerative Agriculture Impact',
      subtitle: 'Every investment restores degraded land, sequesters carbon, and creates resilient ecosystems while delivering profitable returns.',
      impactAreas: [
        {
          title: 'Soil Health Restoration',
          description: 'Our regenerative practices rebuild soil organic matter, increase water retention, and restore natural fertility cycles.',
          metric: '2-4%',
          unit: 'Organic Matter Increase',
          icon: '🌱'
        },
        {
          title: 'Carbon Sequestration',
          description: 'Agave plants and soil restoration sequester significant carbon, directly combating climate change.',
          metric: '12-15',
          unit: 'Tons CO₂/hectare/year',
          icon: '🌍'
        },
        {
          title: 'Biodiversity Enhancement',
          description: 'Agrosilvopastoral systems support native species and create wildlife corridors in degraded landscapes.',
          metric: '300%',
          unit: 'Species Diversity Increase',
          icon: '🦋'
        },
        {
          title: 'Water Cycle Restoration',
          description: 'Healthy soils and diverse plantings improve water infiltration and reduce erosion by up to 80%.',
          metric: '60%',
          unit: 'Water Retention Improvement',
          icon: '💧'
        }
      ],
      resilienceTitle: 'Building Climate Resilience',
      resilienceSubtitle: 'Regenerative farming increases production and profitability while creating drought, flood and fire resilience.',
      resiliencePoints: [
        'Improved soil structure reduces flood and erosion risk',
        'Enhanced water retention creates drought resilience',
        'Diverse ecosystems provide natural pest and disease control',
        'Carbon-rich soils store more nutrients and support healthy plant growth'
      ]
    },
    ES: {
      title: 'Impacto de la Agricultura Regenerativa',
      subtitle: 'Cada inversión restaura tierras degradadas, captura carbono y crea ecosistemas resilientes mientras entrega retornos rentables.',
      impactAreas: [
        {
          title: 'Restauración de Salud del Suelo',
          description: 'Nuestras prácticas regenerativas reconstruyen la materia orgánica del suelo, aumentan la retención de agua y restauran los ciclos naturales de fertilidad.',
          metric: '2-4%',
          unit: 'Aumento de Materia Orgánica',
          icon: '🌱'
        },
        {
          title: 'Captura de Carbono',
          description: 'Las plantas de agave y la restauración del suelo capturan carbono significativo, combatiendo directamente el cambio climático.',
          metric: '12-15',
          unit: 'Toneladas CO₂/hectárea/año',
          icon: '🌍'
        },
        {
          title: 'Mejora de Biodiversidad',
          description: 'Los sistemas agrosilvopastorales apoyan especies nativas y crean corredores de vida silvestre en paisajes degradados.',
          metric: '300%',
          unit: 'Aumento de Diversidad de Especies',
          icon: '🦋'
        },
        {
          title: 'Restauración del Ciclo del Agua',
          description: 'Suelos saludables y plantaciones diversas mejoran la infiltración de agua y reducen la erosión hasta en un 80%.',
          metric: '60%',
          unit: 'Mejora en Retención de Agua',
          icon: '💧'
        }
      ],
      resilienceTitle: 'Construyendo Resiliencia Climática',
      resilienceSubtitle: 'La agricultura regenerativa aumenta la producción y rentabilidad mientras crea resiliencia a sequías, inundaciones e incendios.',
      resiliencePoints: [
        'Estructura mejorada del suelo reduce el riesgo de inundaciones y erosión',
        'Mayor retención de agua crea resiliencia a la sequía',
        'Ecosistemas diversos proporcionan control natural de plagas y enfermedades',
        'Suelos ricos en carbono almacenan más nutrientes y apoyan el crecimiento saludable de plantas'
      ]
    }
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <section id="impact" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gave-green">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Impact Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {currentContent.impactAreas.map((area, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-gave-green/20 hover:border-gave-green/40">
              <CardHeader className="pb-4">
                <div className="text-5xl mb-4">{area.icon}</div>
                <CardTitle className="text-xl mb-2 text-gave-green">{area.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-gave-green">{area.metric}</div>
                  <div className="text-sm font-medium text-gave-green/80">{area.unit}</div>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {area.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Climate Resilience Section */}
        <div className="max-w-6xl mx-auto">
          <Card className="p-12 bg-gradient-to-br from-gave-green/5 to-gave-green/10 border-gave-green/20">
            <div className="text-center mb-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gave-green">
                {currentContent.resilienceTitle}
              </h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {currentContent.resilienceSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                {currentContent.resiliencePoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-gave-green rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-lg leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop&crop=center" 
                  alt="Regenerative landscape showing restored ecosystem"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
