
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowDown } from 'lucide-react';
import { useContent } from '@/hooks/useContent';
import NetlifyForm from './NetlifyForm';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleFormSubmit = () => {
    setIsSubmitted(true);
  };

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

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
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

            {/* Lead Capture Form - Enhanced visibility */}
            <Card className="p-8 bg-white/95 backdrop-blur-sm border-white/30 max-w-xl mx-auto shadow-2xl">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                {currentContent.formTitle}
              </h3>
              {!isSubmitted ? (
                <NetlifyForm formName="hero-lead-capture" className="space-y-4" onSubmit={handleFormSubmit}>
                  <div className="flex flex-col gap-4">
                    <Input
                      type="email"
                      name="email"
                      placeholder={currentContent.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-600 text-lg py-3"
                    />
                    <Button 
                      type="submit" 
                      size="lg"
                      className="bg-gave-yellow hover:bg-gave-yellow/90 text-gray-900 font-semibold py-3 text-lg shadow-lg"
                    >
                      {currentContent.getStarted}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-700">
                    {currentContent.joinText}
                  </p>
                </NetlifyForm>
              ) : (
                <div className="text-center py-4">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{currentContent.thankYou}</h4>
                  <p className="text-gray-700">{currentContent.thankYouText}</p>
                </div>
              )}
            </Card>
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
