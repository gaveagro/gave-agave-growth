
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
      title: 'Measurable Impact, Profitable Returns',
      subtitle: 'Every investment creates positive environmental and social impact while delivering profitable financial returns through our technology-driven approach.',
      techTitle: 'Technology-Driven Sustainability',
      returnsTitle: 'Profitable Returns',
      returnsNote: 'Returns are shared 65% to investors, 35% to Gavé for crop management and harvest sales.',
      impactAreas: [
        {
          title: 'Hectares Restored',
          description: 'We focus on land regeneration through agrosilvopastoral models that restore degraded soil and increase biodiversity.',
          metric: '64',
          icon: '🌱'
        },
        {
          title: 'Hectares Conserved',
          description: 'Our tech-focused approach to wild agave cultivation preserves natural ecosystems and protects endangered agave species.',
          metric: '385',
          icon: '🌿'
        },
        {
          title: 'CO₂ Sequestration',
          description: 'Agave plants and our regenerative practices sequester significant amounts of carbon, contributing to climate change mitigation.',
          metric: '21,984 Tons',
          icon: '🌍'
        },
        {
          title: 'Community Impact',
          description: 'We provide sustainable employment and training to local communities in San Luis Potosí, México, creating lasting social impact.',
          metric: '25,663 Workdays',
          icon: '🤝'
        }
      ],
      additionalMetrics: [
        { title: 'Indigenous Land Ownership', value: '100%' },
        { title: 'Agave Species Germination', value: '10' },
        { title: 'Communities Supported', value: '13' }
      ],
      techPoints: [
        {
          title: 'Data Analytics & Monitoring',
          description: 'Real-time monitoring of plant health, soil conditions, and growth patterns using satellite imagery and drone technology.'
        },
        {
          title: 'Predictive Modeling',
          description: 'AI-powered models predict optimal harvest times and market conditions to maximize returns.'
        },
        {
          title: 'Risk Management',
          description: 'Comprehensive insurance and plant replacement guarantees minimize investment risk.'
        }
      ]
    },
    ES: {
      title: 'Impacto Medible, Retornos Rentables',
      subtitle: 'Cada inversión crea un impacto ambiental y social positivo mientras entrega retornos financieros rentables a través de nuestro enfoque impulsado por tecnología.',
      techTitle: 'Sustentabilidad Impulsada por Tecnología',
      returnsTitle: 'Retornos Rentables',
      returnsNote: 'Los retornos se comparten 65% para inversionistas, 35% para Gavé por manejo de cultivos y venta de cosecha.',
      impactAreas: [
        {
          title: 'Hectáreas Restauradas',
          description: 'Nos enfocamos en la regeneración de tierras a través de modelos agrosilvopastorales que restauran suelos degradados y aumentan la biodiversidad.',
          metric: '64',
          icon: '🌱'
        },
        {
          title: 'Hectáreas Conservadas',
          description: 'Nuestro enfoque tecnológico en el cultivo de agave silvestre preserva ecosistemas naturales y protege especies de agave en peligro.',
          metric: '385',
          icon: '🌿'
        },
        {
          title: 'Captura de CO₂',
          description: 'Las plantas de agave y nuestras prácticas regenerativas capturan cantidades significativas de carbono, contribuyendo a la mitigación del cambio climático.',
          metric: '21,984 Toneladas',
          icon: '🌍'
        },
        {
          title: 'Impacto Comunitario',
          description: 'Proporcionamos empleo sustentable y capacitación a comunidades locales en San Luis Potosí, México, creando un impacto social duradero.',
          metric: '25,663 Jornadas',
          icon: '🤝'
        }
      ],
      additionalMetrics: [
        { title: 'Propiedad de Tierra Indígena', value: '100%' },
        { title: 'Germinación de Especies de Agave', value: '10' },
        { title: 'Comunidades Apoyadas', value: '13' }
      ],
      techPoints: [
        {
          title: 'Análisis de Datos y Monitoreo',
          description: 'Monitoreo en tiempo real de la salud de las plantas, condiciones del suelo y patrones de crecimiento usando imágenes satelitales y tecnología de drones.'
        },
        {
          title: 'Modelado Predictivo',
          description: 'Modelos potenciados por IA predicen tiempos óptimos de cosecha y condiciones de mercado para maximizar retornos.'
        },
        {
          title: 'Gestión de Riesgos',
          description: 'Seguros integrales y garantías de reemplazo de plantas minimizan el riesgo de inversión.'
        }
      ]
    }
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <section id="impact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentContent.impactAreas.map((area, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="text-4xl mb-3">{area.icon}</div>
                <CardTitle className="text-lg">{area.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary mb-2">{area.metric}</div>
                <CardDescription className="text-sm">
                  {area.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {currentContent.additionalMetrics.map((metric, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology & Returns Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">{currentContent.techTitle}</h3>
            <div className="space-y-4">
              {currentContent.techPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">{point.title}</h4>
                    <p className="text-muted-foreground">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-impact rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">{currentContent.returnsTitle}</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>{language === 'EN' ? 'Expected Annual Return' : 'Retorno Anual Esperado'}</span>
                  <span className="text-2xl font-bold">18-25%</span>
                </div>
                <div className="bg-white/20 rounded-full h-2">
                  <div className="bg-yellow-300 h-2 rounded-full w-4/5"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>{language === 'EN' ? 'Investment Period' : 'Período de Inversión'}</span>
                  <span className="text-2xl font-bold">5-9 {language === 'EN' ? 'Years' : 'Años'}</span>
                </div>
                <div className="bg-white/20 rounded-full h-2">
                  <div className="bg-yellow-300 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
              <div className="pt-4 border-t border-white/20">
                <p className="text-sm opacity-90">
                  {currentContent.returnsNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
