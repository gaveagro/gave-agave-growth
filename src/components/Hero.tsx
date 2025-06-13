
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowDown } from 'lucide-react';

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

  const currentContent = content[language as keyof typeof content];

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 gradient-hero-gave opacity-90"></div>
      
      {/* Background image - Regenerative landscape */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" 
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&h=1080&fit=crop&crop=center")'
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="min-h-screen flex flex-col justify-center">
          {/* Main Content - Centered */}
          <div className="text-center text-white space-y-16 mb-16">
            <div className="space-y-8 max-w-5xl mx-auto">
              <h1 className="text-6xl md:text-8xl font-bold leading-tight">
                {currentContent.mainTitle}
                <span className="block text-gave-yellow text-5xl md:text-7xl mt-4">
                  {currentContent.subtitle}
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl opacity-90 leading-relaxed max-w-4xl mx-auto">
                {currentContent.description}
              </p>

              <div className="text-xl md:text-2xl font-medium text-gave-yellow">
                {currentContent.mission}
              </div>
            </div>

            {/* Lead Capture Form */}
            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 max-w-xl mx-auto">
              <h3 className="text-2xl font-semibold mb-6 text-white">
                {currentContent.formTitle}
              </h3>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col gap-4">
                    <Input
                      type="email"
                      placeholder={currentContent.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/90 border-white/30 text-gray-900 placeholder:text-gray-600 text-lg py-3"
                    />
                    <Button 
                      type="submit" 
                      size="lg"
                      className="bg-gave-yellow hover:bg-gave-yellow/90 text-gray-900 font-semibold py-3 text-lg"
                    >
                      {currentContent.getStarted}
                    </Button>
                  </div>
                  <p className="text-sm text-white/70">
                    {currentContent.joinText}
                  </p>
                </form>
              ) : (
                <div className="text-center py-4">
                  <h4 className="text-xl font-semibold text-white mb-2">{currentContent.thankYou}</h4>
                  <p className="text-white/80">{currentContent.thankYouText}</p>
                </div>
              )}
            </Card>
          </div>

          {/* Scroll Indicator */}
          <div className="text-center mt-12">
            <div className="text-white animate-bounce">
              <ArrowDown className="w-6 h-6 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
