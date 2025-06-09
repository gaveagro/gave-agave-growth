
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowDown, Play } from 'lucide-react';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [language, setLanguage] = useState('EN');

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Lead captured:', email);
    setIsSubmitted(true);
    // Here you would integrate with your lead capture system
  };

  const content = {
    EN: {
      title: 'Invest in',
      titleHighlight: 'Sustainable Agave',
      subtitle: 'Technology-driven cultivation delivering profitable returns while regenerating land and supporting communities in México.',
      tags: ['🌱 Carbon Sequestration', '📈 Profitable Returns', '🤝 Community Impact'],
      formTitle: 'Start Your Sustainable Investment Journey',
      emailPlaceholder: 'Enter your email address',
      getStarted: 'Get Started',
      joinText: 'Join our investors already growing sustainable returns',
      thankYou: 'Thank you!',
      thankYouText: "We'll be in touch with investment opportunities soon.",
      trustedBy: 'Trusted by:',
      whyAgave: 'Why Agave?',
      agavePoints: [
        'Drought-resistant crop requiring minimal water',
        'Espadín: 5-6 years, other species: 7-9 years maturation',
        'Growing demand in spirits and biofuel industries'
      ]
    },
    ES: {
      title: 'Invierte en',
      titleHighlight: 'Agave Sustentable',
      subtitle: 'Cultivo impulsado por tecnología que ofrece retornos rentables mientras regenera la tierra y apoya a las comunidades en México.',
      tags: ['🌱 Captura de Carbono', '📈 Retornos Rentables', '🤝 Impacto Comunitario'],
      formTitle: 'Comienza tu Viaje de Inversión Sustentable',
      emailPlaceholder: 'Ingresa tu dirección de correo',
      getStarted: 'Comenzar',
      joinText: 'Únete a nuestros inversionistas que ya están generando retornos sustentables',
      thankYou: '¡Gracias!',
      thankYouText: 'Nos pondremos en contacto pronto con oportunidades de inversión.',
      trustedBy: 'Respaldados por:',
      whyAgave: '¿Por qué Agave?',
      agavePoints: [
        'Cultivo resistente a la sequía que requiere agua mínima',
        'Espadín: 5-6 años, otras especies: 7-9 años de maduración',
        'Demanda creciente en industrias de destilados y biocombustibles'
      ]
    }
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Background with gradient using new Gavé colors */}
      <div className="absolute inset-0 gradient-hero-gave opacity-90"></div>
      
      {/* Background image - Agave field with native trees (mezquite) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1920&h=1080&fit=crop&crop=center")'
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Column - Content */}
          <div className="text-white space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {currentContent.title}
                <span className="block text-gave-yellow">{currentContent.titleHighlight}</span>
              </h1>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
                {currentContent.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              {currentContent.tags.map((tag, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  {tag}
                </div>
              ))}
            </div>

            {/* Lead Capture Form */}
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-xl font-semibold mb-4 text-white">
                {currentContent.formTitle}
              </h3>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder={currentContent.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 bg-white/90 border-white/30 text-gray-900 placeholder:text-gray-600"
                    />
                    <Button 
                      type="submit" 
                      className="bg-gave-yellow hover:bg-gave-yellow/90 text-gray-900 font-semibold px-8"
                    >
                      {currentContent.getStarted}
                    </Button>
                  </div>
                  <p className="text-xs text-white/70">
                    {currentContent.joinText}
                  </p>
                </form>
              ) : (
                <div className="text-center py-4">
                  <h4 className="text-lg font-semibold text-white mb-2">{currentContent.thankYou}</h4>
                  <p className="text-white/80">{currentContent.thankYouText}</p>
                </div>
              )}
            </Card>

            {/* Trust Indicators */}
            <div className="space-y-3">
              <p className="text-white/80 text-sm">{currentContent.trustedBy}</p>
              <div className="flex flex-wrap items-center gap-6 opacity-80">
                <span className="text-white/70 text-sm">Startupbootcamp Australia</span>
                <span className="text-white/70 text-sm">FLII</span>
                <span className="text-white/70 text-sm">Alterna Accelerator</span>
                <span className="text-white/70 text-sm">Fermentasmania</span>
              </div>
            </div>
          </div>

          {/* Right Column - Video/Image Showcase */}
          <div className="space-y-6 animate-fade-in">
            {/* Main Video/Image Card - Agave with mezquite trees */}
            <Card className="overflow-hidden bg-white/10 backdrop-blur-sm border-white/20">
              <div className="relative aspect-video">
                <img 
                  src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop&crop=center"
                  alt="Agave field with mezquite trees and native vegetation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Button 
                    variant="ghost" 
                    size="lg"
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                  >
                    <Play className="w-8 h-8" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">
                    {language === 'EN' ? 'Agave Cultivation with Mezquite Trees & Native Species' : 'Cultivo de Agave con Mezquites y Especies Nativas'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Enhanced Why Agave Section */}
            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <h3 className="text-2xl font-bold mb-6 text-gave-yellow text-center">{currentContent.whyAgave}</h3>
              <ul className="space-y-4 text-lg">
                {currentContent.agavePoints.map((point, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-gave-yellow rounded-full mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <ArrowDown className="w-6 h-6" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
