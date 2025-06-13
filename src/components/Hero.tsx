
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
      mainTitle: 'Invest in Gavé and watch your money grow.',
      subtitle: 'Literally.',
      description: 'Regenerative agriculture that works with nature to restore soil and ecosystem health while delivering profitable returns through sustainable agave cultivation.',
      quote: '"A mere 2% increase in the carbon content of the planet\'s soils could offset 100% of all greenhouse gas emissions going into the atmosphere"',
      quoteAuthor: 'Rattan Lal, Soil Scientist',
      mission: 'Growing healthy soil and restoring degraded ecosystems.',
      formTitle: 'Start Your Regenerative Investment',
      emailPlaceholder: 'Enter your email address',
      getStarted: 'Get Started',
      joinText: 'Join investors creating environmental impact while earning returns',
      thankYou: 'Thank you!',
      thankYouText: "We'll be in touch with investment opportunities soon.",
      whyAgave: 'Why Regenerative Agave?',
      agavePoints: [
        'Drought-resistant crop requiring minimal water - perfect for degraded lands',
        'Restores soil health and increases biodiversity through agrosilvopastoral systems',
        'Sequester carbon while generating profitable returns in 5-9 years',
        'Creates resilient ecosystems that reduce drought, flood and fire risk'
      ]
    },
    ES: {
      mainTitle: 'Invierte en Gavé y ve crecer tu dinero.',
      subtitle: 'Literalmente.',
      description: 'Agricultura regenerativa que trabaja con la naturaleza para restaurar la salud del suelo y los ecosistemas mientras entrega retornos rentables a través del cultivo sustentable de agave.',
      quote: '"Un mero aumento del 2% en el contenido de carbono de los suelos del planeta podría compensar el 100% de todas las emisiones de gases de efecto invernadero que van a la atmósfera"',
      quoteAuthor: 'Rattan Lal, Científico del Suelo',
      mission: 'Cultivando suelos saludables y restaurando ecosistemas degradados.',
      formTitle: 'Comienza tu Inversión Regenerativa',
      emailPlaceholder: 'Ingresa tu dirección de correo',
      getStarted: 'Comenzar',
      joinText: 'Únete a inversionistas creando impacto ambiental mientras obtienen retornos',
      thankYou: '¡Gracias!',
      thankYouText: 'Nos pondremos en contacto pronto con oportunidades de inversión.',
      whyAgave: '¿Por qué Agave Regenerativo?',
      agavePoints: [
        'Cultivo resistente a la sequía que requiere agua mínima - perfecto para tierras degradadas',
        'Restaura la salud del suelo y aumenta la biodiversidad a través de sistemas agrosilvopastorales',
        'Captura carbono mientras genera retornos rentables en 5-9 años',
        'Crea ecosistemas resilientes que reducen el riesgo de sequía, inundaciones e incendios'
      ]
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
          <div className="text-center text-white space-y-12 mb-16">
            <div className="space-y-6 max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                {currentContent.mainTitle}
                <span className="block text-gave-yellow text-4xl md:text-6xl mt-2">
                  {currentContent.subtitle}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
                {currentContent.description}
              </p>

              <div className="text-lg md:text-xl font-medium text-gave-yellow">
                {currentContent.mission}
              </div>
            </div>

            {/* Powerful Quote */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-white/20">
              <blockquote className="text-lg md:text-xl italic text-white/95 leading-relaxed">
                {currentContent.quote}
              </blockquote>
              <div className="text-gave-yellow font-semibold mt-4">
                — {currentContent.quoteAuthor}
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

          {/* Why Regenerative Agave - Prominent Section */}
          <div className="max-w-6xl mx-auto">
            <Card className="p-12 bg-white/15 backdrop-blur-sm border-white/20 text-white">
              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-bold text-gave-yellow mb-4">
                  {currentContent.whyAgave}
                </h2>
                <div className="w-24 h-1 bg-gave-yellow mx-auto"></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {currentContent.agavePoints.slice(0, 2).map((point, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-4 h-4 bg-gave-yellow rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-lg leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-6">
                  {currentContent.agavePoints.slice(2).map((point, index) => (
                    <div key={index + 2} className="flex items-start space-x-4">
                      <div className="w-4 h-4 bg-gave-yellow rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-lg leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-10">
                <img 
                  src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=400&fit=crop&crop=center" 
                  alt="Regenerative agave landscape with native trees"
                  className="w-full max-w-2xl mx-auto rounded-lg opacity-80"
                />
              </div>
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
