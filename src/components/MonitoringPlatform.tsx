
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Monitor, Satellite, Thermometer, BarChart3, Camera, MapPin } from 'lucide-react';

const MonitoringPlatform = () => {
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
      title: 'Advanced Monitoring Platform',
      subtitle: 'Track your investment in real-time with cutting-edge technology and transparent reporting.',
      accessPlatform: 'Access Platform',
      features: [
        {
          icon: Thermometer,
          title: 'Climate Monitoring',
          description: 'Real-time weather conditions and climate data for each plot'
        },
        {
          icon: BarChart3,
          title: 'Investment Tracking',
          description: 'Monitor your investment performance and growth metrics'
        },
        {
          icon: Camera,
          title: 'Drone Surveys',
          description: 'Regular drone footage showing plant development and health'
        },
        {
          icon: Satellite,
          title: 'Satellite Imagery',
          description: 'High-resolution satellite images for comprehensive monitoring'
        },
        {
          icon: MapPin,
          title: 'Plot Mapping',
          description: 'Detailed mapping of your specific plots and plant locations'
        },
        {
          icon: Monitor,
          title: 'IoT Sensors',
          description: 'Connected sensors providing soil and environmental data'
        }
      ]
    },
    ES: {
      title: 'Plataforma de Monitoreo Avanzada',
      subtitle: 'Rastrea tu inversión en tiempo real con tecnología de vanguardia y reportes transparentes.',
      accessPlatform: 'Acceder a la Plataforma',
      features: [
        {
          icon: Thermometer,
          title: 'Monitoreo Climático',
          description: 'Condiciones climáticas en tiempo real y datos del clima para cada parcela'
        },
        {
          icon: BarChart3,
          title: 'Seguimiento de Inversión',
          description: 'Monitorea el rendimiento de tu inversión y métricas de crecimiento'
        },
        {
          icon: Camera,
          title: 'Levantamientos con Dron',
          description: 'Filmaciones regulares con drones mostrando el desarrollo y salud de las plantas'
        },
        {
          icon: Satellite,
          title: 'Imágenes Satelitales',
          description: 'Imágenes satelitales de alta resolución para monitoreo integral'
        },
        {
          icon: MapPin,
          title: 'Mapeo de Parcelas',
          description: 'Mapeo detallado de tus parcelas específicas y ubicaciones de plantas'
        },
        {
          icon: Monitor,
          title: 'Sensores IoT',
          description: 'Sensores conectados proporcionando datos del suelo y ambientales'
        }
      ]
    }
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Features */}
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {currentContent.features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center pt-6">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90"
                onClick={() => window.open('https://dashboard.gaveagro.com', '_blank')}
              >
                {currentContent.accessPlatform}
              </Button>
            </div>
          </div>

          {/* Right side - Screenshot mockups */}
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-green-50 to-blue-50 p-6 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Monitor className="w-16 h-16 text-primary mx-auto" />
                  <div className="space-y-2">
                    <div className="h-2 bg-primary/20 rounded w-32 mx-auto"></div>
                    <div className="h-2 bg-primary/30 rounded w-24 mx-auto"></div>
                    <div className="h-2 bg-primary/20 rounded w-28 mx-auto"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'EN' ? 'Dashboard Overview' : 'Vista General del Dashboard'}
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-yellow-50 to-orange-50 p-4 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Satellite className="w-8 h-8 text-primary mx-auto" />
                    <div className="space-y-1">
                      <div className="h-1 bg-primary/20 rounded w-16 mx-auto"></div>
                      <div className="h-1 bg-primary/30 rounded w-12 mx-auto"></div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-blue-50 to-cyan-50 p-4 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <BarChart3 className="w-8 h-8 text-primary mx-auto" />
                    <div className="space-y-1">
                      <div className="h-1 bg-primary/20 rounded w-16 mx-auto"></div>
                      <div className="h-1 bg-primary/30 rounded w-14 mx-auto"></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonitoringPlatform;
