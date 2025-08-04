
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import InvestmentModal from './InvestmentModal';

const HowItWorks = () => {
  const [language, setLanguage] = useState('ES');

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
  }, []);

  const content = {
    EN: {
      title: 'How Sustainable Agave Investment Works',
      subtitle: 'A simple, transparent process that delivers both environmental impact and financial returns through our proven methodology.',
      modelsTitle: 'Choose Your Agave Species',
      ctaButton: 'Start Your Investment Today',
      simulationNote: 'For investment simulation, register to access our calculation tools',
      steps: [
        {
          step: '01',
          title: 'Choose Your Investment',
          description: 'Select agave plants from our established fields in San Luis Potosí. Choose between Espadín or Salmiana species based on your investment timeline and impact goals.',
          details: ['Agave Angustifolia Haw (Espadín)', 'Agave Salmiana', 'Price includes all costs and guarantees'],
          image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop&crop=center'
        },
        {
          step: '02',
          title: 'We Manage Everything',
          description: 'Gavé handles all aspects of cultivation including labor, land lease, insurance, fertilization, pest control, and plant replacement guarantees.',
          details: ['Professional crop management', 'Insurance coverage', 'Plant replacement guarantee', 'Regular monitoring reports'],
          image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop&crop=center'
        },
        {
          step: '03',
          title: 'Monitor Your Investment',
          description: 'Track your plants\' growth and health through our technology platform with real-time data and regular updates.',
          details: ['Satellite imagery monitoring', 'Drone technology', 'Growth progress reports', 'Environmental impact metrics'],
          image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop&crop=center'
        },
        {
          step: '04',
          title: 'Harvest & Returns',
          description: 'After maturation, we harvest and sell to the highest bidder. You receive 65% of the profit margin above production costs.',
          details: ['Optimal harvest timing', 'Best market price', '65% profit share', 'Transparent reporting'],
          image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=300&fit=crop&crop=center'
        }
      ],
      models: [
        {
          name: 'Espadín',
          subtitle: 'Intensive Agriculture Model',
          maturation: '5-6 years',
          description: 'Traditional monocrop approach with higher plant density and faster harvest cycles.',
          features: [
            'Shorter investment period',
            'Higher plant density',
            'Predictable yields',
            'More inventory available'
          ],
          agaveImage: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop&crop=center'
        },
        {
          name: 'Salmiana',
          subtitle: 'Agrosilvopastoral Model',
          maturation: '7-9 years',
          description: 'Regenerative agriculture approach with maximum environmental benefits.',
          features: [
            'Maximum biodiversity impact',
            'Enhanced carbon sequestration',
            'Soil regeneration',
            'Superior environmental benefits'
          ],
          agaveImage: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=200&fit=crop&crop=center'
        }
      ]
    },
    ES: {
      title: 'Cómo Funciona la Inversión en Agave Sustentable',
      subtitle: 'Un proceso simple y transparente que entrega tanto impacto ambiental como retornos financieros a través de nuestra metodología comprobada.',
      modelsTitle: 'Elige tu Especie de Agave',
      ctaButton: 'Comienza tu Inversión Hoy',
      simulationNote: 'Para simulación de inversión, regístrate para acceder a nuestras herramientas de cálculo',
      steps: [
        {
          step: '01',
          title: 'Elige tu Inversión',
          description: 'Selecciona plantas de agave de nuestros campos establecidos en San Luis Potosí. Elige entre especies Espadín o Salmiana según tu cronograma de inversión y objetivos de impacto.',
          details: ['Agave Angustifolia Haw (Espadín)', 'Agave Salmiana', 'El precio incluye todos los costos y garantías'],
          image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop&crop=center'
        },
        {
          step: '02',
          title: 'Nosotros Manejamos Todo',
          description: 'Gavé maneja todos los aspectos del cultivo incluyendo mano de obra, arrendamiento de tierra, seguro, fertilización, control de plagas y garantías de reemplazo de plantas.',
          details: ['Manejo profesional de cultivos', 'Cobertura de seguro', 'Garantía de reemplazo de plantas', 'Reportes de monitoreo regulares'],
          image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop&crop=center'
        },
        {
          step: '03',
          title: 'Monitorea tu Inversión',
          description: 'Rastrea el crecimiento y salud de tus plantas a través de nuestra plataforma tecnológica con datos en tiempo real y actualizaciones regulares.',
          details: ['Monitoreo con imágenes satelitales', 'Tecnología de drones', 'Reportes de progreso de crecimiento', 'Métricas de impacto ambiental'],
          image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop&crop=center'
        },
        {
          step: '04',
          title: 'Cosecha y Retornos',
          description: 'Después de la maduración, cosechamos y vendemos al mejor postor. Recibes el 65% del margen de ganancia sobre los costos de producción.',
          details: ['Momento óptimo de cosecha', 'Mejor precio de mercado', '65% de participación en ganancias', 'Reportes transparentes'],
          image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=300&fit=crop&crop=center'
        }
      ],
      models: [
        {
          name: 'Espadín',
          subtitle: 'Modelo de Agricultura Intensiva',
          maturation: '5-6 años',
          description: 'Enfoque de monocultivo tradicional con mayor densidad de plantas y ciclos de cosecha más rápidos.',
          features: [
            'Período de inversión más corto',
            'Mayor densidad de plantas',
            'Rendimientos predecibles',
            'Más inventario disponible'
          ],
          agaveImage: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop&crop=center'
        },
        {
          name: 'Salmiana',
          subtitle: 'Modelo Agrosilvopastoril',
          maturation: '7-9 años',
          description: 'Enfoque de agricultura regenerativa con máximos beneficios ambientales.',
          features: [
            'Máximo impacto en biodiversidad',
            'Mayor captura de carbono',
            'Regeneración del suelo',
            'Beneficios ambientales superiores'
          ],
          agaveImage: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=200&fit=crop&crop=center'
        }
      ]
    }
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gave-blue">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Visual Process Flow with Images */}
        <div className="relative max-w-7xl mx-auto mb-20">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-32 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-gave-blue via-gave-blue to-gave-blue opacity-30"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number Circle */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gave-blue to-gave-blue/80 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg z-10 relative">
                    {step.step}
                  </div>
                </div>
                
                <Card className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-gave-blue/20">
                  {/* Image */}
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg mb-2 text-gave-blue">{step.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-xs">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center justify-center space-x-2">
                          <div className="w-1 h-1 bg-gave-yellow rounded-full"></div>
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Models Comparison with Images */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-4 text-gave-blue">{currentContent.modelsTitle}</h3>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {currentContent.simulationNote}
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {currentContent.models.map((model, index) => (
              <Card key={index} className="border-2 hover:border-gave-blue transition-all duration-300 hover:shadow-xl">
                <CardHeader className="text-center pb-4">
                  {/* Agave Species Image */}
                  <div className="mb-4">
                    <img 
                      src={model.agaveImage} 
                      alt={`Agave ${model.name}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  
                  <CardTitle className="text-2xl mb-1 text-gave-blue">{model.name}</CardTitle>
                  <CardDescription className="font-medium text-gave-blue/80">{model.subtitle}</CardDescription>
                  <div className="mt-3">
                    <div className="text-3xl font-bold text-gave-blue">{model.maturation}</div>
                    <div className="text-sm text-muted-foreground">{language === 'EN' ? 'Maturation Period' : 'Período de Maduración'}</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {model.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {model.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-gave-yellow rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <InvestmentModal>
            <Button size="lg" className="bg-gave-blue hover:bg-gave-blue/90 px-8 py-3">
              {currentContent.ctaButton}
            </Button>
          </InvestmentModal>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
