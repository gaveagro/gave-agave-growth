
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
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
      title: 'Investing in Land Regeneration',
      subtitle: 'Join investors who are creating environmental impact while earning sustainable returns through regenerative agriculture.'
    },
    ES: {
      title: 'Invirtiendo en Regeneración de Tierras',
      subtitle: 'Únete a inversionistas que están creando impacto ambiental mientras obtienen retornos sustentables a través de la agricultura regenerativa.'
    }
  };

  const testimonials = {
    EN: [
      {
        name: "Sarah Mitchell",
        role: "Impact Investor",
        location: "San Francisco, CA",
        quote: "Regenerative agriculture represents the future of sustainable investing. The ability to restore ecosystems while generating meaningful returns is exactly what our portfolio needs to create lasting impact.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b169?w=60&h=60&fit=crop&crop=face"
      },
      {
        name: "Michael Thompson",
        role: "ESG Portfolio Manager",
        location: "London, UK", 
        quote: "What sets Gavé apart is their quantifiable approach to soil health and carbon sequestration. We can track real environmental metrics alongside financial returns - that's the kind of transparency ESG investing demands.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
      },
      {
        name: "Elena Vasquez",
        role: "Regenerative Investment Advisor",
        location: "Mexico City, MX",
        quote: "Investing in land restoration through agave cultivation addresses multiple sustainability challenges simultaneously. It's a scalable model that proves profitable agriculture and environmental healing can coexist.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
      }
    ],
    ES: [
      {
        name: "Sarah Mitchell", 
        role: "Inversionista de Impacto",
        location: "San Francisco, CA",
        quote: "La agricultura regenerativa representa el futuro de la inversión sostenible. La capacidad de restaurar ecosistemas mientras se generan retornos significativos es exactamente lo que nuestro portafolio necesita para crear impacto duradero.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b169?w=60&h=60&fit=crop&crop=face"
      },
      {
        name: "Michael Thompson",
        role: "Gerente de Portafolio ESG", 
        location: "Londres, Reino Unido",
        quote: "Lo que distingue a Gavé es su enfoque cuantificable hacia la salud del suelo y la captura de carbono. Podemos rastrear métricas ambientales reales junto con retornos financieros - esa es la transparencia que la inversión ESG demanda.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
      },
      {
        name: "Elena Vásquez",
        role: "Asesora en Inversión Regenerativa",
        location: "Ciudad de México, MX", 
        quote: "Invertir en restauración de tierras a través del cultivo de agave aborda múltiples desafíos de sostenibilidad simultáneamente. Es un modelo escalable que demuestra que la agricultura rentable y la sanación ambiental pueden coexistir.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
      }
    ]
  };

  const currentContent = content[language as keyof typeof content];
  const currentTestimonials = testimonials[language as keyof typeof testimonials];

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

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {currentTestimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow border-gave-green/20 hover:border-gave-green/40">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mr-4" 
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gave-green font-medium">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <blockquote className="text-muted-foreground italic leading-relaxed text-lg">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex text-gave-yellow mt-6">
                  {'★'.repeat(5)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
