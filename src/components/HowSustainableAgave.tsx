
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Clock, TrendingUp, DollarSign, Shield, Users, Sprout } from 'lucide-react';
import InvestmentModal from './InvestmentModal';

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
      title: 'How Gavé Investment Works',
      subtitle: 'A transparent investment model that delivers financial returns while creating regenerative impact',
      processTitle: 'Investment Process',
      investmentModel: 'Investment & Legal Model',
      regenerativeBenefits: 'Regenerative & Social Benefits',
      ctaButton: 'Start Your Impact Investment',
      steps: [
        {
          icon: <DollarSign className="w-8 h-8" />,
          title: 'Acquire Plants',
          description: 'You purchase agave plants from Gavé, established in our managed fields in San Luis Potosí. Legal ownership is transferred to you with full documentation.',
          timeline: 'Investment'
        },
        {
          icon: <Sprout className="w-8 h-8" />,
          title: 'We Manage Growth',
          description: 'Gavé handles all cultivation: land lease, labor, insurance, fertilization, pest control, and plant replacement guarantees. You own the plants, we manage everything.',
          timeline: '5-6 Years'
        },
        {
          icon: <TrendingUp className="w-8 h-8" />,
          title: 'Harvest & Sale',
          description: 'At maturity, Gavé harvests and sells to the highest bidder. You get your initial investment + 65% of the profits.',
          timeline: 'Harvest'
        },
        {
          icon: <Leaf className="w-8 h-8" />,
          title: 'Regenerative Impact',
          description: 'Your investment actively restores degraded land, sequesters carbon, and enhances biodiversity while generating returns.',
          timeline: 'Ongoing'
        }
      ],
      modelFeatures: [
        {
          icon: <Shield className="w-6 h-6" />,
          title: 'Plant Replacement Guarantee',
          description: 'Full protection against plant mortality with replacement guarantees'
        },
        {
          icon: <DollarSign className="w-6 h-6" />,
          title: '65% Profit Share',
          description: 'You receive 65% of profit margins after cost recovery'
        },
        {
          icon: <Clock className="w-6 h-6" />,
          title: 'Transparent Timeline',
          description: 'Clear maturation periods: Espadín 5-6 years, Salmiana 7-9 years'
        }
      ],
      impactFeatures: [
        {
          icon: <Leaf className="w-6 h-6" />,
          title: 'Soil Restoration',
          description: 'Regenerative practices rebuild soil organic matter and fertility'
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: 'Rural Employment',
          description: 'Creates sustainable jobs in rural Mexican communities'
        },
        {
          icon: <TrendingUp className="w-6 h-6" />,
          title: 'Carbon Sequestration',
          description: '30-60 tons CO₂ captured per hectare annually'
        }
      ]
    },
    ES: {
      title: 'Cómo Funciona la Inversión en Gavé',
      subtitle: 'Un modelo de inversión transparente que entrega retornos financieros mientras crea impacto regenerativo',
      processTitle: 'Proceso de Inversión',
      investmentModel: 'Modelo de Inversión y Legal',
      regenerativeBenefits: 'Beneficios Regenerativos y Sociales',
      ctaButton: 'Comienza tu Inversión de Impacto',
      steps: [
        {
          icon: <DollarSign className="w-8 h-8" />,
          title: 'Adquirir Plantas',
          description: 'Compras plantas de agave de Gavé, establecidas en nuestros campos administrados en San Luis Potosí. La propiedad legal se transfiere a ti con documentación completa.',
          timeline: 'Inversión'
        },
        {
          icon: <Sprout className="w-8 h-8" />,
          title: 'Manejamos el Crecimiento',
          description: 'Gavé maneja todo el cultivo: arrendamiento de tierra, mano de obra, seguro, fertilización, control de plagas y garantías de reemplazo. Tú eres dueño de las plantas, nosotros manejamos todo.',
          timeline: '5-6 Años'
        },
        {
          icon: <TrendingUp className="w-8 h-8" />,
          title: 'Cosecha y Venta',
          description: 'En la madurez, Gavé cosecha y vende al mejor postor. Obtienes tu inversión inicial + 65% de las ganancias.',
          timeline: 'Cosecha'
        },
        {
          icon: <Leaf className="w-8 h-8" />,
          title: 'Impacto Regenerativo',
          description: 'Tu inversión restaura activamente tierras degradadas, captura carbono y mejora la biodiversidad mientras genera retornos.',
          timeline: 'Continuo'
        }
      ],
      modelFeatures: [
        {
          icon: <Shield className="w-6 h-6" />,
          title: 'Garantía de Reemplazo de Plantas',
          description: 'Protección completa contra mortalidad de plantas con garantías de reemplazo'
        },
        {
          icon: <DollarSign className="w-6 h-6" />,
          title: '65% de Participación en Ganancias',
          description: 'Obtienes tu inversión inicial + 65% de las ganancias'
        },
        {
          icon: <Clock className="w-6 h-6" />,
          title: 'Cronograma Transparente',
          description: 'Períodos de maduración claros: Espadín 5-6 años, Salmiana 7-9 años'
        }
      ],
      impactFeatures: [
        {
          icon: <Leaf className="w-6 h-6" />,
          title: 'Restauración del Suelo',
          description: 'Las prácticas regenerativas reconstruyen la materia orgánica y fertilidad del suelo'
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: 'Empleo Rural',
          description: 'Crea empleos sostenibles en comunidades rurales mexicanas'
        },
        {
          icon: <TrendingUp className="w-6 h-6" />,
          title: 'Captura de Carbono',
          description: '30-60 toneladas CO₂ capturadas por hectárea anualmente'
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

        {/* Investment Process */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-12 text-gave-green">{currentContent.processTitle}</h3>
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
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Investment Model & Benefits */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Investment & Legal Model */}
          <Card className="border-gave-green/20">
            <CardHeader>
              <CardTitle className="text-2xl text-gave-green flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                {currentContent.investmentModel}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentContent.modelFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="text-gave-green mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gave-green mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Regenerative & Social Benefits */}
          <Card className="border-gave-green/20">
            <CardHeader>
              <CardTitle className="text-2xl text-gave-green flex items-center">
                <Leaf className="w-6 h-6 mr-2" />
                {currentContent.regenerativeBenefits}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentContent.impactFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="text-gave-green mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gave-green mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <InvestmentModal>
            <Button size="lg" className="bg-gave-green hover:bg-gave-green/90 px-8 py-3">
              {currentContent.ctaButton}
            </Button>
          </InvestmentModal>
        </div>
      </div>
    </section>
  );
};

export default HowSustainableAgave;
