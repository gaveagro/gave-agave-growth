
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Monitor, Satellite, Thermometer, BarChart3, Camera, MapPin } from 'lucide-react';

const MonitoringPlatform = () => {
  const [language, setLanguage] = useState(() => {
    return (window as any).currentLanguage || 'ES';
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
          title: 'Digital Dashboard',
          description: 'Comprehensive platform for tracking all aspects of your investment'
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
          title: 'Dashboard Digital',
          description: 'Plataforma integral para rastrear todos los aspectos de tu inversión'
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

          {/* Right side - Dashboard Screenshots */}
          <div className="space-y-6">
            {/* Main Dashboard Overview */}
            <Card className="overflow-hidden">
              <div className="aspect-video">
                <img 
                  src="/lovable-uploads/cc3ee809-ce5a-4adc-9cd1-9916917ce870.png" 
                  alt={language === 'EN' ? 'Dashboard Overview' : 'Vista General del Dashboard'}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            {/* Investment Details and Plot Information */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="overflow-hidden">
                <div className="aspect-square">
                  <img 
                    src="/lovable-uploads/60acd259-0231-4725-a03f-71f79b79b881.png" 
                    alt={language === 'EN' ? 'Investment Details' : 'Detalles de Inversión'}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="aspect-square">
                  <img 
                    src="/lovable-uploads/d2be563c-1ae7-4cc7-b016-07e945f25ea9.png" 
                    alt={language === 'EN' ? 'Plot Information' : 'Información de Parcelas'}
                    className="w-full h-full object-cover"
                  />
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
