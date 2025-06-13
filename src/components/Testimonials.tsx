
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
        name: "María González",
        role: "Regenerative Investor",
        location: "Mexico City, MX",
        quote: "Seeing degraded land transform into thriving ecosystems while generating returns has been incredible. The soil health improvements are visible and measurable.",
        avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=60&h=60&fit=crop&crop=face"
      },
      {
        name: "David Chen",
        role: "ESG Portfolio Manager",
        location: "Sydney, AU", 
        quote: "Gavé's regenerative approach delivers both carbon sequestration and biodiversity benefits. It's rare to find investments that truly restore ecosystems.",
        avatar: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=60&h=60&fit=crop&crop=face"
      },
      {
        name: "Ana Rodriguez",
        role: "Impact Investor",
        location: "Barcelona, ES",
        quote: "The combination of soil restoration and profitable agave cultivation creates lasting value. You can see the land healing over time.",
        avatar: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=60&h=60&fit=crop&crop=face"
      }
    ],
    ES: [
      {
        name: "María González", 
        role: "Inversionista Regenerativa",
        location: "Ciudad de México, MX",
        quote: "Ver tierras degradadas transformarse en ecosistemas prósperos mientras generan retornos ha sido increíble. Las mejoras en la salud del suelo son visibles y medibles.",
        avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=60&h=60&fit=crop&crop=face"
      },
      {
        name: "David Chen",
        role: "Gerente de Portafolio ESG", 
        location: "Sídney, AU",
        quote: "El enfoque regenerativo de Gavé entrega tanto captura de carbono como beneficios de biodiversidad. Es raro encontrar inversiones que realmente restauren ecosistemas.",
        avatar: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=60&h=60&fit=crop&crop=face"
      },
      {
        name: "Ana Rodríguez",
        role: "Inversionista de Impacto",
        location: "Barcelona, ES", 
        quote: "La combinación de restauración del suelo y cultivo rentable de agave crea valor duradero. Puedes ver la tierra sanando con el tiempo.",
        avatar: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=60&h=60&fit=crop&crop=face"
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
