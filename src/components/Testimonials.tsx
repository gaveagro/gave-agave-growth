
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
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
        name: "Carlos Rodriguez",
        role: "Portfolio Manager",
        location: "Mexico City",
        quote: "The combination of environmental restoration and stable returns through agave cultivation represents exactly what we need in our ESG portfolio. Gavé's approach to regenerative agriculture creates measurable impact.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=center"
      },
      {
        name: "Ana Maria Santos",
        role: "Impact Investment Advisor",
        location: "San Francisco, CA",
        quote: "After years in sustainable finance, I've rarely seen such a compelling model that balances ecological restoration with solid financial returns. The transparency in their impact metrics is remarkable.",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&crop=center"
      },
      {
        name: "Roberto Silva",
        role: "Sustainable Development Investor",
        location: "São Paulo, BR",
        quote: "Investing in regenerative agave cultivation through Gavé allows us to support rural communities while restoring degraded ecosystems. It's a scalable solution that makes economic and environmental sense.",
        avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=60&h=60&fit=crop&crop=center"
      }
    ],
    ES: [
      {
        name: "Carlos Rodríguez", 
        role: "Gerente de Portafolio",
        location: "Ciudad de México",
        quote: "La combinación de restauración ambiental y retornos estables a través del cultivo de agave representa exactamente lo que necesitamos en nuestro portafolio ESG. El enfoque de Gavé hacia la agricultura regenerativa crea impacto medible.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=center"
      },
      {
        name: "Ana María Santos",
        role: "Asesora en Inversión de Impacto", 
        location: "San Francisco, CA",
        quote: "Después de años en finanzas sostenibles, rara vez he visto un modelo tan convincente que equilibre la restauración ecológica con retornos financieros sólidos. La transparencia en sus métricas de impacto es notable.",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&crop=center"
      },
      {
        name: "Roberto Silva",
        role: "Inversionista en Desarrollo Sostenible",
        location: "São Paulo, BR", 
        quote: "Invertir en cultivo regenerativo de agave a través de Gavé nos permite apoyar a comunidades rurales mientras restauramos ecosistemas degradados. Es una solución escalable que tiene sentido económico y ambiental.",
        avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=60&h=60&fit=crop&crop=center"
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
