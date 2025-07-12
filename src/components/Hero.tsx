
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useContent } from '@/hooks/useContent';
import InvestmentModal from './InvestmentModal';

const Hero = () => {
  const [language, setLanguage] = useState('EN');
  const { content: heroContent, loading } = useContent('hero');

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
  }, []);

  // Fallback content while loading
  const defaultContent = {
    EN: {
      mainTitle: 'Regenerate land.',
      subtitle: 'Generate returns.',
      description: 'Invest in regenerative agave cultivation that restores degraded ecosystems while delivering profitable returns.',
      mission: 'Growing healthy soil and restoring degraded ecosystems.',
      formTitle: 'Start Your Regenerative Investment',
      emailPlaceholder: 'Enter your email address',
      getStarted: 'Get Started',
      joinText: 'Join investors creating environmental impact while earning returns',
      thankYou: 'Thank you!',
      thankYouText: "We'll be in touch with investment opportunities soon."
    },
    ES: {
      mainTitle: 'Regenera la tierra.',
      subtitle: 'Genera retornos.',
      description: 'Invierte en cultivo regenerativo de agave que restaura ecosistemas degradados mientras entrega retornos rentables.',
      mission: 'Cultivando suelos saludables y restaurando ecosistemas degradados.',
      formTitle: 'Comienza tu Inversión Regenerativa',
      emailPlaceholder: 'Ingresa tu dirección de correo',
      getStarted: 'Comenzar',
      joinText: 'Únete a inversionistas creando impacto ambiental mientras obtienen retornos',
      thankYou: '¡Gracias!',
      thankYouText: 'Nos pondremos en contacto pronto con oportunidades de inversión.'
    }
  };

  const currentContent = loading || !heroContent ? 
    defaultContent[language as keyof typeof defaultContent] : 
    heroContent[language.toLowerCase()] || defaultContent[language as keyof typeof defaultContent];

  const backgroundImage = heroContent?.backgroundImage || "/lovable-uploads/d70723cf-3b9d-404d-9b70-864768a8de4f.png";


  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Background image - Agave landscape */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: `url("${backgroundImage}")`
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="min-h-screen flex flex-col justify-center">
          {/* Main Content - Centered with enhanced contrast */}
          <div className="text-center text-white space-y-16 mb-16">
            <div className="space-y-8 max-w-5xl mx-auto">
              <h1 className="text-6xl md:text-8xl font-bold leading-tight text-white drop-shadow-2xl">
                {currentContent.mainTitle}
                <span className="block text-gave-yellow text-5xl md:text-7xl mt-4 drop-shadow-2xl">
                  {currentContent.subtitle}
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl leading-relaxed max-w-4xl mx-auto text-white drop-shadow-lg">
                {currentContent.description}
              </p>

              <div className="text-xl md:text-2xl font-medium text-gave-yellow drop-shadow-lg">
                {currentContent.mission}
              </div>
            </div>

            {/* Get Started Button */}
            <div className="flex justify-center">
              <InvestmentModal>
                <Button 
                  size="lg"
                  className="bg-gave-yellow hover:bg-gave-yellow/90 text-gray-900 font-semibold py-4 px-12 text-xl shadow-2xl"
                >
                  {currentContent.getStarted}
                </Button>
              </InvestmentModal>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="text-center mt-12">
            <div className="text-white animate-bounce drop-shadow-lg">
              <ArrowDown className="w-6 h-6 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
